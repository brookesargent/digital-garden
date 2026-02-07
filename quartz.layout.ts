import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.HeaderLinks({ links: [{ label: "Garden", slug: "index" }, { label: "Library", slug: "library" }, { label: "About", slug: "about" }] }), Component.Darkmode()],
  afterBody: [
    Component.GardenListing({
      slug: "index",
      excludeCategories: ["library"],
    }),
    Component.LibraryListing(),
  ],
  footer: Component.Footer({
    links: {},
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.GrowthStage(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !["index", "library", "about"].includes(page.fileData.slug ?? ""),
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.DesktopOnly(Component.Bio({
      text: "Writing about gender, media criticism, engineering management, and whatever else catches my attention.",
    })),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Graph()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
  ],
  right: [],
}
