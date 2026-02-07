import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/growthStage.scss"

const GROWTH_STAGES: Record<string, { emoji: string; label: string; description: string }> = {
  seedling: {
    emoji: "\u{1F331}",
    label: "Seedling",
    description: "A young idea, just planted",
  },
  budding: {
    emoji: "\u{1FAB4}",
    label: "Budding",
    description: "Growing and taking shape",
  },
  evergreen: {
    emoji: "\u{1F333}",
    label: "Evergreen",
    description: "A well-developed, stable note",
  },
}

const GrowthStage: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const status = fileData.frontmatter?.status as string | undefined
  if (!status || !GROWTH_STAGES[status]) {
    return null
  }

  const stage = GROWTH_STAGES[status]
  return (
    <div class={classNames(displayClass, "growth-stage")} data-stage={status}>
      <span class="growth-icon" aria-hidden="true">
        {stage.emoji}
      </span>
      <span class="growth-label">{stage.label}</span>
      <span class="growth-description">{stage.description}</span>
    </div>
  )
}

GrowthStage.css = style

export default (() => GrowthStage) satisfies QuartzComponentConstructor
