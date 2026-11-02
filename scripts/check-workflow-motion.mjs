/** Browser check against a built preview. Provide an existing Playwright installation
 * with PLAYWRIGHT_PACKAGE if it is not available in this checkout. */
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const { chromium, expect } = require(process.env.PLAYWRIGHT_PACKAGE ?? "@playwright/test");
const base = process.env.PREVIEW_URL ?? "http://127.0.0.1:3100/vstormos-landing/";
const output = process.env.CHECK_OUTPUT ?? mkdtempSync(join(tmpdir(), "workflow-motion-"));
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? "chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, reducedMotion: "no-preference" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1050 });
    await page.goto(base);
    const scene = page.locator("#workflow-motion");
    await scene.scrollIntoViewIfNeeded();
    await expect(scene).toHaveAttribute("data-running", "true");
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow at ${width}px`);
    await expect(scene.getByText("Your agent", { exact: true })).toBeVisible();
    const pulse = scene.locator(width < 768 ? ".workflow-lines--mobile .workflow-pulse" : ".workflow-lines--desktop .workflow-pulse").first();
    const before = await pulse.evaluate((element) => getComputedStyle(element).strokeDashoffset);
    await page.waitForTimeout(350);
    assert.notEqual(await pulse.evaluate((element) => getComputedStyle(element).strokeDashoffset), before);
    await scene.getByRole("button", { name: "Pause motion" }).click();
    await expect(scene).toHaveAttribute("data-running", "false");
    await expect(pulse).toHaveCSS("animation-play-state", "paused");
    // Read the held position after the browser has committed the paused frame.
    await page.waitForTimeout(100);
    const paused = await pulse.evaluate((element) => getComputedStyle(element).strokeDashoffset);
    await page.waitForTimeout(250);
    assert.equal(await pulse.evaluate((element) => getComputedStyle(element).strokeDashoffset), paused);
    await scene.getByRole("button", { name: "Resume motion" }).focus();
    await page.keyboard.press("Enter");
    await expect(scene).toHaveAttribute("data-running", "true");
    await expect(page.locator("a.fixed").filter({ hasText: "Book a demo" })).toBeHidden();
    await page.mouse.move(0, 0);
    await scene.screenshot({ path: join(output, `flow-${width}.png`) });
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator("#workflow-motion")).toHaveAttribute("data-running", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#workflow-motion").scrollIntoViewIfNeeded();
  await expect(page.locator(".workflow-pulse").first()).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("button", { name: "Pause motion" })).toBeHidden();
  assert.deepEqual(errors, []);
  writeFileSync(join(output, "results.json"), JSON.stringify({ widths: [1440, 1024, 768, 390, 320], pauseResume: "click and keyboard", offscreen: "paused", reducedMotion: "static", errors }, null, 2));
  console.log(`Workflow motion checks passed. Captures: ${output}`);
} finally {
  await browser.close();
}
