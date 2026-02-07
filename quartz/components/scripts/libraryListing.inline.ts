document.addEventListener("nav", () => {
  const tabs = document.querySelectorAll(".library-tab") as NodeListOf<HTMLButtonElement>
  const panels = document.querySelectorAll(".library-shelf[data-shelf]") as NodeListOf<HTMLElement>

  tabs.forEach((tab) => {
    const handler = () => {
      const shelf = tab.dataset.shelf
      if (!shelf) return

      tabs.forEach((t) => {
        t.classList.remove("active")
        t.setAttribute("aria-selected", "false")
      })
      tab.classList.add("active")
      tab.setAttribute("aria-selected", "true")

      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.shelf === shelf)
      })
    }

    tab.addEventListener("click", handler)
    window.addCleanup(() => tab.removeEventListener("click", handler))
  })
})
