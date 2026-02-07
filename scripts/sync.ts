import fs from "fs"
import path from "path"
import matter from "gray-matter"

const VAULT_PATH =
  process.env.VAULT_PATH ||
  "/Users/brookesargent/Library/Mobile Documents/iCloud~md~obsidian/Documents/digital garden"

const CONTENT_PATH = path.join(import.meta.dirname, "..", "content")

const EXCLUDED_DIRS = ["5 - Templates", "4 - Indexes", "Excalidraw", ".obsidian", ".trash"]
const TAG_LINE_REGEX = /^\*\*Tags:\*\*\s*(.+)$/m
const WIKILINK_REGEX = /\[\[([^\]]+)\]\]/g

function getAllMarkdownFiles(dir: string): string[] {
  const results: string[] = []

  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      const relativeToCurrent = path.relative(dir, fullPath)

      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.some((excluded) => relativeToCurrent.startsWith(excluded))) {
          continue
        }
        walk(fullPath)
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        results.push(fullPath)
      }
    }
  }

  walk(dir)
  return results
}

function extractWikilinkTags(content: string): { tags: string[]; cleanedContent: string } {
  const match = content.match(TAG_LINE_REGEX)
  if (!match) {
    return { tags: [], cleanedContent: content }
  }

  const tagLine = match[1]
  const tags: string[] = []
  let wikilinkMatch: RegExpExecArray | null

  const regex = new RegExp(WIKILINK_REGEX.source, "g")
  while ((wikilinkMatch = regex.exec(tagLine)) !== null) {
    tags.push(wikilinkMatch[1].trim())
  }

  const cleanedContent = content.replace(TAG_LINE_REGEX, "").replace(/\n{3,}/g, "\n\n")
  return { tags, cleanedContent }
}

function normalizeFrontmatter(
  frontmatter: Record<string, unknown>,
  filename: string,
): Record<string, unknown> {
  const normalized: Record<string, unknown> = { ...frontmatter }

  if (!normalized.title) {
    normalized.title = filename.replace(/\.md$/, "")
  }

  if (normalized["last-tended"]) {
    normalized.modified = normalized["last-tended"]
    delete normalized["last-tended"]
  }

  return normalized
}

function sync() {
  console.log(`Syncing from vault: ${VAULT_PATH}`)
  console.log(`Output to: ${CONTENT_PATH}`)

  if (!fs.existsSync(VAULT_PATH)) {
    console.error(`Vault path does not exist: ${VAULT_PATH}`)
    process.exit(1)
  }

  // Clear content directory except static pages
  const PRESERVED_FILES = ["index.md", "about.md", "library.md"]
  if (fs.existsSync(CONTENT_PATH)) {
    const existing = fs.readdirSync(CONTENT_PATH)
    for (const file of existing) {
      if (PRESERVED_FILES.includes(file)) continue
      const fullPath = path.join(CONTENT_PATH, file)
      fs.rmSync(fullPath, { recursive: true })
    }
  } else {
    fs.mkdirSync(CONTENT_PATH, { recursive: true })
  }

  const allFiles = getAllMarkdownFiles(VAULT_PATH)
  console.log(`Found ${allFiles.length} markdown files in vault`)

  const publishedFiles: { source: string; destName: string }[] = []
  const seenFilenames = new Set<string>()

  for (const filePath of allFiles) {
    const raw = fs.readFileSync(filePath, "utf-8")
    const { data: frontmatter, content } = matter(raw)

    if (frontmatter.publish !== true && frontmatter.publish !== "true") {
      continue
    }

    const filename = path.basename(filePath)

    if (seenFilenames.has(filename.toLowerCase())) {
      console.warn(`WARNING: Duplicate filename detected: ${filename} (from ${filePath})`)
      continue
    }
    seenFilenames.add(filename.toLowerCase())

    // Extract wikilink tags from body and move to frontmatter
    const { tags: bodyTags, cleanedContent } = extractWikilinkTags(content)

    // Merge body tags with any existing frontmatter tags
    const existingTags: string[] = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    const allTags = [...new Set([...existingTags, ...bodyTags])]

    // Normalize frontmatter
    const normalized = normalizeFrontmatter(frontmatter, filename)
    if (allTags.length > 0) {
      normalized.tags = allTags
    }

    // Reconstruct the file
    const output = matter.stringify(cleanedContent, normalized)
    const destPath = path.join(CONTENT_PATH, filename)
    fs.writeFileSync(destPath, output)

    publishedFiles.push({ source: filePath, destName: filename })
    console.log(`  Published: ${filename}`)
  }

  console.log(`\nSynced ${publishedFiles.length} files to content/`)
}

sync()
