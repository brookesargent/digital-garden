Prioritized from most impactful to least. Items marked with a star are quick wins.

## High Impact

- **Publish more notes.** The single biggest thing that will make the site feel alive. Even 3-5 seedlings across your categories (essay, note, share) would demonstrate the filtering system, populate the graph, and show visitors the range of your thinking. The infrastructure is excellent — it needs plants.
- **Add outward links to the About page.** The About copy is good now — it has personality and specificity ("chronic overthinker," "a few too many varieties of tomato"). But it's a dead end. Someone who resonates with your writing has no thread to pull. End with a casual line linking to Bluesky or an email, something like: "say hi on [bluesky](url) or send me an email." The footer icons exist but people don't always scroll down.

## Medium Impact

- **Comment system (Cusdis).** Adding a lightweight comment section to notes so visitors can engage with your ideas. [Cusdis](https://cusdis.com) is a privacy-friendly, open-source alternative to Disqus (~5kb). No account required for commenters, comments require your approval before appearing, and it's free to use hosted or self-host. Implementation: sign up for an app ID, build a small Quartz component that embeds the widget on note pages, wire it into the layout. Fits the garden ethos — tending to conversations, not just content.
- **Custom 404 page.** When someone hits a dead link (especially wikilinks to unpublished notes), a garden-themed 404 ("this seed hasn't sprouted yet — try browsing the garden instead") reinforces the vibe and gives visitors a way back.

## Lower Impact / Future Ideas

- **Now page.** What you're reading, working on, thinking about right now. Low-effort, high-engagement. Rewards repeat visitors and shows the garden is alive. See Maggie Appleton's [/now page](https://maggieappleton.com/now/) and [nownownow.com](https://nownownow.com/) for inspiration.
- **Colophon / "how this garden works" page.** The digital garden community loves transparency about tools and process. "Built with Quartz, written in Obsidian, synced with a custom script" — could spark conversations and help other aspiring gardeners. Could also be a section on the About page instead of its own page.
- **The sidebar bio and About page say similar things.** Not a problem yet, but as the About page grows, make sure they're doing distinct work. The bio is a glanceable summary; the About page should go deeper — what specifically about technology interests you? What kind of engineering management questions do you think about?
- **Consider half-star rendering for ratings.** You have a 4.5 rating on Bat Eater but the stars component only renders whole stars (it shows 4 out of 5). A half-star or fractional display would be more precise.
- **Pagination / "show more" for garden listing.** Currently all published notes render at once on the index page. This is fine for now — filters help narrow things down and most gardens with 50+ notes still show everything. But once the page starts feeling long, a "show more" button that reveals notes beyond the first ~12 would keep the initial view tidy without hiding content behind traditional pagination.
- **Botanical illustration on index may need revisiting.** It looks nice now, but once you have 10+ note cards below it, the page might feel top-heavy. Revisit whether it still earns its space once the garden is fuller. Could also consider making it smaller or moving it to a more subtle position.

## Completed

- ~~Rewrite the index page intro~~ — now one clean sentence
- ~~Remove "browse by topic" UI instructions~~ — cut
- ~~Rewrite the About page~~ — has personality, hobbies, specificity
- ~~Tighten the Library intro text~~ — removed entirely, tabs speak for themselves
- ~~Fix index/About overlap~~ — each page does distinct work now
- ~~Add RSS link to footer~~ — RSS icon with all social icons
- ~~Add footer links~~ — RSS, Bluesky, LinkedIn, GitHub, StoryGraph, Letterboxd
- ~~Note count / garden stats~~ — "X notes growing" below filter bar on index
- ~~"What is a digital garden?" explainer~~ — index links to "Why a Digital Garden?" essay
- ~~Check Open Graph / social preview cards~~ — verified palette, added category & status badges to generated OG images
- ~~Add analytics (Umami)~~ — Umami Cloud free tier, enabled via built-in Quartz support
- ~~Tag pages need love~~ — added bio sidebar to list page layout
- ~~Mobile audit~~ — converted filter bar from pill buttons to compact dropdown menus
