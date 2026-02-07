import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  text: string
}

export default ((opts?: Options) => {
  const Bio: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const text = opts?.text ?? ""
    if (!text) return null

    return <p class={`sidebar-bio ${displayClass ?? ""}`}>{text}</p>
  }

  Bio.css = `
.sidebar-bio {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--darkgray);
  margin: 0;
}
`

  return Bio
}) satisfies QuartzComponentConstructor
