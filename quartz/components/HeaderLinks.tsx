import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, FullSlug } from "../util/path"

interface Options {
  links: { label: string; slug: string }[]
}

export default ((opts?: Options) => {
  const HeaderLinks: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? []
    return (
      <nav class={`header-links ${displayClass ?? ""}`}>
        {links.map(({ label, slug }) => {
          const isCurrent = fileData.slug === slug || fileData.slug === slug + "/index"
          return (
            <a
              href={resolveRelative(fileData.slug!, slug as FullSlug)}
              {...(isCurrent ? { "aria-current": "page" } : {})}
            >
              {label}
            </a>
          )
        })}
      </nav>
    )
  }

  HeaderLinks.css = `
.header-links {
  display: flex;
  gap: 1rem;
  margin-left: auto;

  a {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--darkgray);

    &:hover {
      color: var(--secondary);
    }
  }
}
`

  return HeaderLinks
}) satisfies QuartzComponentConstructor
