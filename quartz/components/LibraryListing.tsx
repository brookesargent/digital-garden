import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/libraryListing.scss"
// @ts-ignore
import script from "./scripts/libraryListing.inline"

interface Book {
  title: string
  author: string
  cover: string
  url: string
  shelf: string
  rating?: number
}

interface ShelfConfig {
  key: string
  label: string
  description: string
}

const SHELVES: ShelfConfig[] = [
  {
    key: "favorites",
    label: "Influential Favorites",
    description: "Books that have shaped my thinking",
  },
  {
    key: "recent",
    label: "Recently Read",
    description: "What I've been reading lately",
  },
]

export default (() => {
  const LibraryListing: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    if (fileData.slug !== "library") return null

    const books = (fileData.frontmatter?.books as unknown as Book[]) ?? []

    const shelved: Record<string, Book[]> = {}
    for (const book of books) {
      const shelf = book.shelf ?? ""
      if (!shelved[shelf]) shelved[shelf] = []
      shelved[shelf].push(book)
    }

    const activeShelves = SHELVES.filter((s) => (shelved[s.key] ?? []).length > 0)

    const renderStars = (rating: number) => {
      const stars = []
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <span class={`star ${i <= rating ? "filled" : ""}`} aria-hidden="true">
            {"\u2605"}
          </span>,
        )
      }
      return (
        <span class="book-rating" aria-label={`${rating} out of 5 stars`}>
          {stars}
        </span>
      )
    }

    const renderBook = (book: Book) => (
      <a href={book.url} class="book-card" target="_blank" rel="noopener noreferrer">
        <img src={book.cover} alt={`Cover of ${book.title} by ${book.author}`} class="book-cover" loading="lazy" />
        <span class="book-info">
          <span class="book-title">{book.title}</span>
          <span class="book-author">{book.author}</span>
          {book.rating != null && renderStars(book.rating)}
        </span>
      </a>
    )

    if (books.length === 0) {
      return (
        <div class="library-listing">
          <p class="library-empty">Nothing in the library yet. Check back soon!</p>
        </div>
      )
    }

    return (
      <div class="library-listing">
        {activeShelves.length > 1 && (
          <div class="library-tabs" role="tablist">
            {activeShelves.map((shelf, i) => (
              <button
                class={`library-tab ${i === 0 ? "active" : ""}`}
                role="tab"
                aria-selected={i === 0 ? "true" : "false"}
                data-shelf={shelf.key}
              >
                {shelf.label}
              </button>
            ))}
          </div>
        )}

        {activeShelves.map((shelf, i) => (
          <div
            class={`library-shelf ${i === 0 ? "active" : ""}`}
            role="tabpanel"
            data-shelf={shelf.key}
          >
            <p class="shelf-description">{shelf.description}</p>
            <div class="book-grid">{(shelved[shelf.key] ?? []).map(renderBook)}</div>
          </div>
        ))}
      </div>
    )
  }

  LibraryListing.css = style
  LibraryListing.afterDOMLoaded = script

  return LibraryListing
}) satisfies QuartzComponentConstructor
