import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const results = {};

for (const [label, viewport, reduced] of [
  ["mobile", { width: 390, height: 844 }, "no-preference"],
  ["reduced", { width: 1440, height: 900 }, "reduce"],
]) {
  const context = await browser.newContext({ viewport, reducedMotion: reduced });
  const page = await context.newPage();
  const imageStatuses = [];
  page.on("response", (response) => {
    if (response.url().includes("/_next/image")) {
      imageStatuses.push({ status: response.status(), url: response.url().slice(0, 90) });
    }
  });
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(6000);
  const initial = await page.evaluate(() => ({
    intro: Boolean(document.querySelector("div.fixed.z-\\[100\\]")),
    canvas: Boolean(document.querySelector("canvas")),
  }));
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  const images = await page.evaluate(() =>
    Array.from(document.images).map((img) => ({
      loaded: img.complete && img.naturalWidth > 0,
      w: img.naturalWidth,
      src: (img.getAttribute("src") || "").slice(0, 60),
    })),
  );
  await page.screenshot({ path: `qa/screenshots/${label}-projects-media.png` });
  results[label] = { initial, imageStatuses, images };
  await context.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
