import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const base = "http://127.0.0.1:3000";
const results = {};

async function audit(viewport, label, reducedMotion = "no-preference") {
  const context = await browser.newContext({ viewport, reducedMotion });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(reducedMotion === "reduce" ? 1200 : 3500);

  const data = await page.evaluate(() => {
    const out = {};
    out.sections = Array.from(document.querySelectorAll("section[id]")).map((s) => ({
      id: s.id,
      height: Math.round(s.getBoundingClientRect().height),
    }));
    out.images = Array.from(document.images).map((img) => ({
      src: img.getAttribute("src") || "",
      loaded: img.complete && img.naturalWidth > 0,
      w: img.naturalWidth,
      h: img.naturalHeight,
    }));
    out.fonts = {
      display: document.fonts.check('16px "Space Grotesk"'),
      mono: document.fonts.check('16px "JetBrains Mono"'),
    };
    out.clipped = Array.from(document.querySelectorAll("h1,h2,h3,p,span,a,button"))
      .filter((el) => {
        const cs = getComputedStyle(el);
        if (cs.overflow !== "hidden" && cs.overflowX !== "hidden") return false;
        if (cs.textOverflow === "ellipsis") return false;
        return el.scrollWidth > el.clientWidth + 3 && el.clientWidth > 0;
      })
      .slice(0, 20)
      .map((el) => ({
        tag: el.tagName,
        text: (el.textContent || "").trim().slice(0, 60),
        scrollW: el.scrollWidth,
        clientW: el.clientWidth,
      }));
    const rect = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
    out.hero = {
      heading: rect("h1"),
      subtitle: rect("#hero-heading + div, #home p.display"),
      buttons: rect("#home a[href='#projects']"),
      stats: rect("#home .border-t"),
      canvas: rect("canvas"),
    };
    out.introPresent = Boolean(document.querySelector("div.fixed.z-\\[100\\]"));
    return out;
  });

  // reveal visibility check
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  data.projectHeadingOpacity = await page
    .locator("#projects h2")
    .evaluate((el) => getComputedStyle(el.parentElement?.parentElement || el).opacity);

  results[label] = data;
  await context.close();
}

await audit({ width: 1440, height: 900 }, "desktop");
await audit({ width: 390, height: 844 }, "mobile");
await audit({ width: 1440, height: 900 }, "reduced", "reduce");

console.log(JSON.stringify(results, null, 2));
await browser.close();
