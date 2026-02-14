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

  function updateTrigger(dropdown: Element) {
    const filterType = dropdown.getAttribute("data-filter-type") as
      | "status"
      | "tag"
      | "category"
      | null
    if (!filterType) return

    const count = activeFilters[filterType].size
    const countEl = dropdown.querySelector(".filter-count")
    if (countEl) {
      countEl.textContent = count > 0 ? String(count) : ""
    }
    dropdown.classList.toggle("has-active", count > 0)
  }

  // Dropdown trigger: open/close menu
  const triggers = document.querySelectorAll(".garden-listing .filter-dropdown-trigger")
  triggers.forEach((trigger) => {
    const handler = (e: Event) => {
      e.stopPropagation()
      const dropdown = trigger.closest(".filter-dropdown")!
      const wasOpen = dropdown.classList.contains("open")

      // Close all dropdowns
      document.querySelectorAll(".filter-dropdown.open").forEach((d) => d.classList.remove("open"))

      // Toggle this one
      if (!wasOpen) {
        dropdown.classList.add("open")
      }
    }

    trigger.addEventListener("click", handler)
    window.addCleanup(() => trigger.removeEventListener("click", handler))
  })

  // Option click: toggle filter
  const options = document.querySelectorAll(".garden-listing .filter-option")
  options.forEach((option) => {
    const handler = (e: Event) => {
      e.stopPropagation()
      const dropdown = option.closest(".filter-dropdown")!
      const filterType = dropdown.getAttribute("data-filter-type") as
        | "status"
        | "tag"
        | "category"
        | null
      if (!filterType) return

      const value = option.getAttribute("data-filter-value") || ""

      if (activeFilters[filterType].has(value)) {
        activeFilters[filterType].delete(value)
        option.classList.remove("active")
      } else {
        activeFilters[filterType].add(value)
        option.classList.add("active")
      }

      updateTrigger(dropdown)
      applyFilters()
    }

    option.addEventListener("click", handler)
    window.addCleanup(() => option.removeEventListener("click", handler))
  })

  // Click outside: close all dropdowns
  const outsideHandler = () => {
    document.querySelectorAll(".filter-dropdown.open").forEach((d) => d.classList.remove("open"))
  }
  document.addEventListener("click", outsideHandler)
  window.addCleanup(() => document.removeEventListener("click", outsideHandler))
})
