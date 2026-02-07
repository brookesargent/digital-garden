document.addEventListener("nav", () => {
  const activeFilters: { status: Set<string>; tag: Set<string>; category: Set<string> } = {
    status: new Set(),
    tag: new Set(),
    category: new Set(),
  }

  function applyFilters() {
    const cards = document.querySelectorAll(".garden-note-card") as NodeListOf<HTMLElement>
    cards.forEach((card) => {
      const cardTags = (card.dataset.tags || "").split(",").filter(Boolean)
      const cardStatus = card.dataset.status || ""
      const cardCategory = card.dataset.category || ""

      const matchesStatus =
        activeFilters.status.size === 0 || activeFilters.status.has(cardStatus)
      const matchesTags =
        activeFilters.tag.size === 0 || cardTags.some((t) => activeFilters.tag.has(t))
      const matchesCategory =
        activeFilters.category.size === 0 || activeFilters.category.has(cardCategory)

      card.style.display = matchesStatus && matchesTags && matchesCategory ? "" : "none"
    })
  }

  const filterBtns = document.querySelectorAll(".garden-listing .filter-btn")
  filterBtns.forEach((btn) => {
    const handler = () => {
      const filterType = btn
        .closest("[data-filter-type]")
        ?.getAttribute("data-filter-type") as "status" | "tag" | "category" | null

      if (!filterType) return

      const value = btn.getAttribute("data-filter-value") || ""

      if (activeFilters[filterType].has(value)) {
        activeFilters[filterType].delete(value)
        btn.classList.remove("active")
      } else {
        activeFilters[filterType].add(value)
        btn.classList.add("active")
      }

      applyFilters()
    }

    btn.addEventListener("click", handler)
    window.addCleanup(() => btn.removeEventListener("click", handler))
  })
})
