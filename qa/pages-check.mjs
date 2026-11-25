import { chromium } from "@playwright/test";

const base = "http://127.0.0.1:3001/oussama-portfolio/";
const browser = await chromium.launch({
  headless: true,
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
  ],
});

const report = {};

async function check(label, reducedMotion) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(base, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(reducedMotion === "reduce" ? 1000 : 3000);

  const data = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const gl = canvas?.getContext("webgl2") || canvas?.getContext("webgl");
    const intro = document.querySelector(".z-\\[100\\]");
    return {
      title: document.title,
      heading: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
      canvas: Boolean(canvas),
      webgl: Boolean(gl),
      introVisible: Boolean(intro) && getComputedStyle(intro).display !== "none",
      overflow:
        document.documentElement.scrollWidth > window.innerWidth + 1,
      resumeHref: document.querySelector('a[download][href*="Resume"]')?.getAttribute("href"),
      ogImage: document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content"),
    };
  });

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  data.imagesLoaded = await page.evaluate(() =>
    Array.from(document.images).every(
      (img) => img.complete && img.naturalWidth > 0,
    ),
  );

  const assetResponses = [];
  for (const path of [
    "/oussama-portfolio/opengraph-image.png",
    "/oussama-portfolio/Oussama-Hassania-Resume.pdf",
    "/oussama-portfolio/icon.svg",
    "/oussama-portfolio/projects/forma/arc-charger.jpg",
  ]) {
    const asset = await page.request.get(`http://127.0.0.1:3001${path}`);
    assetResponses.push({ path, status: asset.status() });
  }

  report[label] = {
    status: response?.status(),
    ...data,
    assetResponses,
    errors,
  };
  await context.close();
}

await check("normal", "no-preference");
await check("reduced", "reduce");
await browser.close();
console.log(JSON.stringify(report, null, 2));
