import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"
import style from "./styles/gardenListing.scss"
// @ts-ignore
import script from "./scripts/gardenListing.inline"

const GROWTH_EMOJI: Record<string, string> = {
  seedling: "\u{1F331}",
  budding: "\u{1FAB4}",
  evergreen: "\u{1F333}",
}

interface GardenListingOptions {
  slug: string
  includeCategories?: string[]
  excludeCategories?: string[]
  emptyMessage?: string
}

export default ((opts: GardenListingOptions) => {
  const GardenListing: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    if (fileData.slug !== opts.slug) return null

    const staticPages = ["index", "about", "library"]

    const publishedNotes = allFiles
      .filter((f) => {
        const fm = f.frontmatter
        if (!fm) return false
        if (fm.publish !== true && fm.publish !== "true") return false
        if (staticPages.includes(f.slug!)) return false

        const category = (fm.category as string) ?? ""
        if (opts.includeCategories && opts.includeCategories.length > 0) {
          if (!opts.includeCategories.includes(category)) return false
        }
        if (opts.excludeCategories && opts.excludeCategories.length > 0) {
          if (opts.excludeCategories.includes(category)) return false
        }

        return true
      })
      .sort(byDateAndAlphabetical(cfg))

    // Collect unique tags, statuses, and categories
    const allTags = new Set<string>()
    const allStatuses = new Set<string>()
    const allCategories = new Set<string>()

    for (const file of publishedNotes) {
      const tags = file.frontmatter?.tags ?? []
      for (const tag of tags) {
        allTags.add(tag as string)
      }
      const status = file.frontmatter?.status as string | undefined
      if (status && ["seedling", "budding", "evergreen"].includes(status)) {
        allStatuses.add(status)
      }
      const category = file.frontmatter?.category as string | undefined
      if (category) {
        allCategories.add(category)
      }
    }

    const sortedTags = [...allTags].sort()
    const sortedCategories = [...allCategories].sort()
    const statusOrder = ["seedling", "budding", "evergreen"]
    const sortedStatuses = statusOrder.filter((s) => allStatuses.has(s))

    const showCategoryFilter = !opts.includeCategories && sortedCategories.length > 0

    return (
      <div class="garden-listing">
        <div class="garden-filters">
          {showCategoryFilter && (
            <div class="filter-group">
              <span class="filter-label">Category:</span>
              <div class="filter-buttons" data-filter-type="category">
                {sortedCategories.map((category) => (
                  <button class="filter-btn" data-filter-value={category}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          {sortedStatuses.length > 0 && (
            <div class="filter-group">
              <span class="filter-label">Growth:</span>
              <div class="filter-buttons" data-filter-type="status">
                {sortedStatuses.map((status) => (
                  <button class="filter-btn" data-filter-value={status}>
                    {GROWTH_EMOJI[status]} {status}
                  </button>
                ))}
              </div>
            </div>
          )}
          {sortedTags.length > 0 && (
            <div class="filter-group">
              <span class="filter-label">Topics:</span>
              <div class="filter-buttons" data-filter-type="tag">
                {sortedTags.map((tag) => (
                  <button class="filter-btn" data-filter-value={tag}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div class="garden-notes">
          {publishedNotes.map((file) => {
            const title = file.frontmatter?.title ?? file.slug
            const tags = (file.frontmatter?.tags ?? []) as string[]
            const status = (file.frontmatter?.status as string) ?? ""
            const category = (file.frontmatter?.category as string) ?? ""
            const href = resolveRelative(fileData.slug!, file.slug!)
            const description = file.description

            return (
              <div
                class="garden-note-card"
                data-tags={tags.join(",")}
                data-status={status}
                data-category={category}
              >
                <div class="note-card-header">
                  {status && GROWTH_EMOJI[status] && (
                    <span class="note-status-icon" aria-hidden="true">
                      {GROWTH_EMOJI[status]}
                    </span>
                  )}
                  <a href={href} class="internal">
                    {title}
                  </a>
                </div>
                {description && <p class="note-card-desc">{description}</p>}
                <div class="note-card-meta">
                  {file.dates && (
                    <span class="note-card-date">
                      <Date date={getDate(cfg, file)!} locale={cfg.locale} />
                    </span>
                  )}
                  {tags.length > 0 && (
                    <ul class="note-card-tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                            class="internal tag-link"
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {publishedNotes.length === 0 && (
          <p class="garden-empty">
            {opts.emptyMessage ?? "No notes published yet. Check back soon!"}
          </p>
        )}
      </div>
    )
  }

  GardenListing.css = style
  GardenListing.afterDOMLoaded = script

  return GardenListing
}) satisfies QuartzComponentConstructor
