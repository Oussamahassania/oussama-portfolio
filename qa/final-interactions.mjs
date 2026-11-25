import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const results = {};

const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);

await page.locator("#projects").scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
results.activeNav = await page.evaluate(() =>
  Array.from(document.querySelectorAll("header nav a"))
    .filter((a) => getComputedStyle(a).color === "rgb(94, 234, 212)")
    .map((a) => a.getAttribute("href")),
);

results.projectLayout = await page.evaluate(() =>
  Array.from(document.querySelectorAll("#projects article")).slice(0, 2).map((article) => {
    const children = Array.from(article.children);
    return children.map((child) => Math.round(child.getBoundingClientRect().x));
  }),
);

results.certOverlap = await page.evaluate(() => {
  const section = document.querySelector("#certifications");
  const cards = section.querySelectorAll("article");
  const sectionBottom = section.getBoundingClientRect().bottom;
  const maxCardBottom = Math.max(...Array.from(cards).map((c) => c.getBoundingClientRect().bottom));
  return { sectionBottom: Math.round(sectionBottom), maxCardBottom: Math.round(maxCardBottom), ok: maxCardBottom <= sectionBottom + 90 };
});
await context.close();

const small = await browser.newContext({ viewport: { width: 320, height: 700 } });
const p2 = await small.newPage();
await p2.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 60000 });
await p2.waitForTimeout(3000);
results.small320 = await p2.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth,
  overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
}));
await p2.screenshot({ path: "qa/screenshots/mobile-320-hero.png" });
await small.close();

console.log(JSON.stringify(results, null, 2));
await browser.close();
