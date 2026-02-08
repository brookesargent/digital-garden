import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/headerImage.scss"

const STATIC_PAGES = ["index", "about", "library"]

const HeaderImage: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  if (STATIC_PAGES.includes(fileData.slug ?? "")) return null

  const image = fileData.frontmatter?.image as string | undefined
  if (!image) return null

  const title = (fileData.frontmatter?.title as string) ?? ""

  return (
    <div class={classNames(displayClass, "header-image")}>
      <img src={image} alt={title} loading="lazy" />
    </div>
  )
}

HeaderImage.css = style

export default (() => HeaderImage) satisfies QuartzComponentConstructor
