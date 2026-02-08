import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

const icons: Record<string, { svg: string; label: string }> = {
  rss: {
    label: "RSS Feed",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>`,
  },
  bluesky: {
    label: "Bluesky",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.6 3.476 6.178 3.126-4.598.698-7.713 2.606-4.178 7.085C6.369 24.553 10.147 21.18 12 17.87c1.853 3.31 5.63 6.683 9.376 2.588 3.535-4.478.42-6.387-4.178-7.085 2.578.35 5.393-.499 6.178-3.126C23.622 9.418 24 4.458 24 3.768c0-.69-.139-1.861-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>`,
  },
  linkedin: {
    label: "LinkedIn",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  github: {
    label: "GitHub",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  },
  storygraph: {
    label: "StoryGraph",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.1722.6246a.6788.6788 0 0 0-.1314.0252L14.095 1.818c-.3504.1039-.545.4673-.4413.8178l5.1137 17.3544c.104.3505.4673.5452.8178.4414l3.9455-1.1553c.3504-.1038.5451-.4673.4413-.8178L18.8584 1.0911a.6522.6522 0 0 0-.6862-.4665zM.662 1.0522c-.3634 0-.6619.2986-.6619.662v18.0944c0 .3634.2985.6619.662.6619h4.1143c.3634 0 .6619-.2985.6619-.662V1.7143c0-.3634-.2985-.662-.6619-.662zm6.9438 0c-.3634 0-.662.2986-.662.662v18.0944c0 .3634.2986.6619.662.6619H11.72c.3634 0 .649-.2985.662-.662V1.7143c0-.3634-.2986-.662-.662-.662zM.3634 21.431c-.1947 0-.3634.1558-.3634.3634v1.2202c0 .1948.1558.3635.3634.3635h23.2712c.1947 0 .3635-.1558.3635-.3635v-1.2202c0-.1947-.1557-.3634-.3635-.3634z"/></svg>`,
  },
  letterboxd: {
    label: "Letterboxd",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8.224 14.352a4.447 4.447 0 0 1-3.775 2.092C1.992 16.444 0 14.454 0 12s1.992-4.444 4.45-4.444c1.592 0 2.988.836 3.774 2.092-.427.682-.673 1.488-.673 2.352s.246 1.67.673 2.352zM15.101 12c0-.864.247-1.67.674-2.352-.786-1.256-2.183-2.092-3.775-2.092s-2.989.836-3.775 2.092c.427.682.674 1.488.674 2.352s-.247 1.67-.674 2.352c.786 1.256 2.183 2.092 3.775 2.092s2.989-.836 3.775-2.092A4.42 4.42 0 0 1 15.1 12zm4.45-4.444a4.447 4.447 0 0 0-3.775 2.092c.427.682.673 1.488.673 2.352s-.246 1.67-.673 2.352a4.447 4.447 0 0 0 3.775 2.092C22.008 16.444 24 14.454 24 12s-1.992-4.444-4.45-4.444z"/></svg>`,
  },
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>© {year} Brooke Sargent</p>
        {Object.keys(links).length > 0 && (
          <div class="footer-icons">
            {Object.entries(links).map(([key, url]) => {
              const icon = icons[key]
              if (!icon) return null
              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                  class="footer-icon"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />
              )
            })}
          </div>
        )}
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
