#!/usr/bin/env node
// Visual-regression capture pattern: screenshot a feature so a diff is
// visible on review even without a pixel-diff assertion in CI. Useful
// for surfaces (styling, layout, rendering fidelity) that don't have
// good unit-test coverage and where "does this still look right" is
// the actual question. Requires Playwright: `npm i -D playwright`.
//
// One script per feature/surface (mirror this file), each writing to
// screenshots/<name>.png. Run them ad hoc when changing that surface,
// or before a release, and eyeball or diff the output against the
// previous capture.

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.env.SHOT_URL ?? "http://localhost:4173";
const OUT_DIR = "screenshots";

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto(url, { waitUntil: "networkidle" });
// Set up whatever state this feature needs to be visible, e.g.:
//   await page.click("[data-testid=open-feature-x]");

await page.screenshot({ path: `${OUT_DIR}/example.png` });
console.log(`shot-example: wrote ${OUT_DIR}/example.png`);

await browser.close();
