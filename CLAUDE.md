# Wyrd Life Drawing website: briefing for Claude


You are helping Esmee Steck maintain **wyrdlifedrawing.com**, the website for Wyrd Life Drawing, themed life-drawing nights in Montréal. Esmee is not a developer: do the git and code work for her, explain in plain language, and show her a preview before publishing anything.

## How the site works
- Plain static HTML/CSS/JS. No build step, no framework, no PHP, no database.
- Hosted free on **GitHub Pages** from the repo `SamuelAB/WyrdLifeDrawing`, branch `main`. Anything pushed to `main` goes live automatically.
- The `CNAME` file holds the custom domain `wyrdlifedrawing.com`. Never delete or edit it.
- After a push, the live site takes **about 10 minutes** to update (CDN cache). Don't panic if it doesn't change right away.

## Publishing workflow
1. Make the edits in the cloned repo folder.
2. Preview locally: `python -m http.server 8091` in the repo folder, then open http://localhost:8091. Show Esmee before publishing.
3. `git add -A`, `git commit -m "short description"`, `git pull`, `git push origin main`.
4. Check the live site about 10 minutes later.

## Files
- `index.html`: the homepage, one long page with sections `#upcoming` (next event card + newsletter signup), `#past` (Past Nights cards), team, contact. It has its own inline CSS.
- `event-<name>.html`: one page per event. These use `css/style.css`.
- `NNN<name>.html` (e.g. `009cabaret.html`): pose-timer pages used during an event. Not linked in menus, marked `noindex`.
- `images/`: all photos. `js/main.js`: shared script (language toggle, homepage shuffle, scroll effects, lightbox).
- `sitemap.xml`: add new event pages to it.

## Rules that matter
1. **Bilingual.** Every visible text element carries `data-en="..."` and `data-fr="..."`; the EN/FR button swaps them. Any new text needs both. Check that the FR toggle works.
2. **Never reuse an image filename for a different picture.** Browsers and the CDN keep serving the old cached image. New or changed photo = new filename (e.g. `cabaret-night-1.jpg`).
3. **Resize photos before adding them**: max 1600 px on the long side for galleries, 2000 px for hero images, JPEG quality ~84. Full-size camera files make the site slow.
4. **If you change `js/main.js`**, bump the `?v=...` number in the `<script src="js/main.js?v=...">` tag on EVERY HTML page, or visitors keep the old cached script.
5. **Upcoming events** link their "Buy Tickets" buttons to Ticket Tailor (`https://buytickets.at/wyrdlifedrawing/<event-id>`). **Past events** have no ticket button; their hero shows a "Past night · <Month Year>" tag instead.
6. The newsletter is an EmailOctopus embed (form `19cd1ec0-5eca-11f1-a780-379cb4709c22`) inside `#newsletter` on the homepage. Keep exactly one embed on the page; two break each other.
7. Analytics is Cloudflare Web Analytics (cookieless, the small beacon script before `</body>`). Its token is public and safe. Don't add Google Analytics (Québec Law 25 privacy).
8. The repo is **public**: never put passwords, API keys or private addresses in it. The venue address is shared with ticket holders only, never on the site.
9. Don't commit `desktop.ini`, `.DS_Store` or `node_modules` (already in `.gitignore`).

## Common tasks
- **New event**: copy the most recent event page as a template, update texts (EN + FR), poster, date, ticket link; add a card in the homepage `#upcoming` section; add the page to `sitemap.xml`.
- **Event is over**: remove its Buy Tickets buttons, add the "Past night" tag, move its homepage card to `#past`.
- **Gallery after an event** (section order): Poster, The Night (8 to 12 distinct event photos, including a few of the room), The Drawings (~4 attendee drawings), The Photoshoot. Copy the gallery markup and CSS from `event-lost-angels.html`.

## Style
- Brand: lime `#BFFF00` on near-black `#0a0a0a`; fonts Cinzel Decorative (titles) + Inter (text).
- Write prices with a space before the dollar sign: `20 $`.
