import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(5000);
const introCount = await page.locator("div.fixed.z-\\[100\\]").count();
const heading = await page.locator("h1").boundingBox();
const canvas = await page.locator("canvas").boundingBox();
await page.screenshot({ path: "qa/screenshots/desktop-hero-final.png" });
console.log(JSON.stringify({ introCount, heading, canvas }, null, 2));
await browser.close();
