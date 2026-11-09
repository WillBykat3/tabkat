// Refresh the preview images from the live sites.
//   npm install playwright && npx playwright install chromium
//   node scripts/screenshot.js
// Saves a 1280x800 PNG per site to previews/<name>.png. Convert to .webp
// (or point `preview` in links.js at the .png) after checking them.
const path = require("path");
const fs = require("fs");
const vm = require("vm");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "links.js"), "utf8"), ctx);
const { sites } = ctx.window.TABKAT;

(async () => {
  const browser = await chromium.launch();
  for (const site of sites) {
    const out = path.join(root, site.preview.replace(/\.\w+$/, ".png"));
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    try {
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 30000 });
    } catch (e) {
      console.warn(site.name + ": page didn't settle, taking the shot anyway");
    }
    await page.waitForTimeout(1500);
    // Close first-visit popups (sign-in prompts, how-to-play) so they don't cover the preview.
    for (const sel of ["text=Not now", 'button:has-text("Play")']) {
      const el = page.locator(sel).first();
      if (await el.isVisible().catch(() => false)) {
        await el.click().catch(() => {});
        await page.waitForTimeout(800);
      }
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    await page.screenshot({ path: out });
    console.log("saved", path.relative(root, out));
    await page.close();
  }
  await browser.close();
})();
