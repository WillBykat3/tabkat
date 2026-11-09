# Tabkat

One page with all my websites, each shown with a screenshot preview. Tap a card to open the site, or use **Live preview** to load the real site in a window without leaving the page.

## Edit the links

Everything is in `links.js`: name, tagline, GitHub link, and the list of sites. Each site has a `name`, `url`, `description` and `preview` (an image in `previews/`). Reorder the list to reorder the cards.

## Refresh the previews

```bash
npm install playwright
npx playwright install chromium
node scripts/screenshot.js
```

This saves a PNG per site to `previews/`. Either convert them to `.webp` or change the `preview` paths in `links.js` to `.png`.

## Put it online (GitHub Pages)

In the repo on GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**, pick the branch and `/ (root)`, then save. The page will be at `https://willbykat3.github.io/tabkat/`.

No build step. To try it locally, open `index.html` in a browser, or run `python3 -m http.server` in this folder.
