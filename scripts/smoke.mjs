#!/usr/bin/env node
// End-to-end smoke test against the mock backend — no native build, no
// real server required. Requires Playwright: `npm i -D playwright`.
//
// This checks the golden path only: the thing that, if it silently
// broke, would mean the product doesn't work at all. Keep it short and
// fast; this is not where thorough coverage lives.

import { chromium } from "playwright";

const url = process.env.SMOKE_URL ?? "http://localhost:4173";

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: "networkidle" });

  // Replace with a real assertion about your app's golden path, e.g.:
  //   await page.waitForSelector("[data-testid=app-ready]");
  const title = await page.title();
  console.log(`smoke: loaded ${url}, title="${title}"`);

  console.log("smoke: PASS");
} catch (err) {
  console.error("smoke: FAIL", err);
  process.exitCode = 1;
} finally {
  await browser.close();
}
