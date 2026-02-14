import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Brooke's Digital Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "umami",
      websiteId: "246f4f4a-dc7f-4e7c-a3f2-2eed00a372d7",
      host: "https://cloud.umami.is",
    },
    locale: "en-US",
    baseUrl: "brookesargent.github.io/digital-garden",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Lora",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#F5F3EF",
          lightgray: "#DDD9D1",
          gray: "#A9A396",
          darkgray: "#4A4F48",
          dark: "#232822",
          secondary: "#5E7A62",
          tertiary: "#8A7B5E",
          highlight: "rgba(94, 122, 98, 0.1)",
          textHighlight: "#C9B88A88",
        },
        darkMode: {
          light: "#1A1E1A",
          lightgray: "#2E342E",
          gray: "#6B7568",
          darkgray: "#C8C4BC",
          dark: "#E8E5DF",
          secondary: "#89A88D",
          tertiary: "#B5A580",
          highlight: "rgba(137, 168, 141, 0.1)",
          textHighlight: "#B5A58044",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "rose-pine-dawn",
          dark: "rose-pine-moon",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents({ maxDepth: 2 }),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
