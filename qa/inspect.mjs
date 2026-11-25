import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "qa/screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
  ],
});

const report = { errors: [], checks: [], links: [], screenshots: [] };
const base = "http://127.0.0.1:3000";

async function openPage(viewport, label) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") report.errors.push(`[${label}] ${message.text()}`);
  });
  page.on("pageerror", (error) => report.errors.push(`[${label}] ${error.message}`));
  await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2200);
  return { context, page };
}

async function shot(page, name) {
  const path = `${OUT}/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  report.screenshots.push(path);
}

// DESKTOP
{
  const { context, page } = await openPage({ width: 1440, height: 900 }, "desktop");
  await shot(page, "desktop-01-hero");

  const sections = ["about", "skills", "projects", "security", "certifications", "experience", "contact"];
  for (const id of sections) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await shot(page, `desktop-${id}`);
  }

  // WebGL canvas
  const canvasInfo = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return { present: false };
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return {
      present: true,
      width: canvas.width,
      height: canvas.height,
      context: Boolean(gl),
    };
  });
  report.checks.push({ name: "webgl-canvas", ...canvasInfo });

  // Overflow
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  report.checks.push({ name: "desktop-overflow", ...overflow, ok: overflow.scrollWidth <= overflow.innerWidth + 1 });

  // Navigation links
  await page.locator('#home').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  for (const id of ["about", "skills", "projects", "experience", "certifications", "contact"]) {
    await page.locator(`header nav a[href="#${id}"]`).first().click();
    await page.waitForTimeout(900);
    const hash = await page.evaluate(() => window.location.hash);
    report.checks.push({ name: `nav-${id}`, hash, ok: hash === `#${id}` });
  }

  // Skills interaction
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await page.locator('[role="tab"]').nth(3).click();
  await page.waitForTimeout(500);
  const skillText = await page.locator('#skills').innerText();
  report.checks.push({ name: "skills-tab-cybersecurity", ok: skillText.includes("Burp Suite") });
  await shot(page, "desktop-skills-security-tab");

  // Project details toggle
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Engineering details" }).first().click();
  await page.waitForTimeout(600);
  const projectText = await page.locator("#projects").innerText();
  report.checks.push({ name: "project-details-expand", ok: projectText.includes("JPA Specifications") });
  await shot(page, "desktop-projects-expanded");

  // Certifications + links audit
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]")).map((a) => ({
      text: (a.textContent || "").trim().slice(0, 40),
      href: a.getAttribute("href"),
    })),
  );
  report.links = links;
  report.checks.push({
    name: "links-no-empty",
    ok: links.every((l) => Boolean(l.href)),
    count: links.length,
  });

  await context.close();
}

// TABLET
{
  const { context, page } = await openPage({ width: 834, height: 1112 }, "tablet");
  await shot(page, "tablet-01-hero");
  for (const id of ["about", "skills", "projects", "certifications", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await shot(page, `tablet-${id}`);
  }
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  report.checks.push({ name: "tablet-overflow", ...overflow, ok: overflow.scrollWidth <= overflow.innerWidth + 1 });
  await context.close();
}

// MOBILE
{
  const { context, page } = await openPage({ width: 390, height: 844 }, "mobile");
  await shot(page, "mobile-01-hero");
  for (const id of ["about", "skills", "projects", "security", "certifications", "experience", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await shot(page, `mobile-${id}`);
  }
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  report.checks.push({ name: "mobile-overflow", ...overflow, ok: overflow.scrollWidth <= overflow.innerWidth + 1 });

  // Mobile menu
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(500);
  await shot(page, "mobile-menu-open");
  const menuVisible = await page.getByRole("navigation", { name: "Mobile navigation" }).isVisible();
  report.checks.push({ name: "mobile-menu-open", ok: menuVisible });
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Projects/ }).click();
  await page.waitForTimeout(1000);
  const hash = await page.evaluate(() => window.location.hash);
  const menuGone = await page.getByRole("navigation", { name: "Mobile navigation" }).count();
  report.checks.push({ name: "mobile-menu-navigate", hash, menuNodes: menuGone, ok: hash === "#projects" });
  await context.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
