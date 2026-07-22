#!/usr/bin/env node
// Calibrated benchmark. Raw wall-clock timings are useless as a
// regression gate across different machines (CI runner today vs. your
// laptop tomorrow vs. a loaded CI runner). Instead:
//
//   1. Run a fixed, deterministic, allocation-free calibration probe
//      that measures "cost of a known unit of work" on THIS machine,
//      right now.
//   2. Report every real metric both raw and normalized (raw / calib).
//   3. Store only normalized values in the baseline file, so the
//      baseline is roughly portable across machines.
//   4. If calib is far above the baseline's calib, the machine is
//      probably throttled/loaded — warn "UNRELIABLE" instead of failing.
//   5. Otherwise, fail if any normalized metric regresses beyond a
//      threshold set above the metric's natural noise floor.
//
// Replace `measureAppMetric` with your project's actual perf-sensitive
// operation (a page load, a large-input parse, whatever your product's
// core value proposition depends on staying fast).

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const BASELINE_FILE = new URL("./bench-baseline.json", import.meta.url).pathname;
const REGRESSION_THRESHOLD = 0.3; // 30% — set above your metric's noise floor
const CALIB_UNRELIABLE_RATIO = 1.5;
const SAMPLES = 8;
const DISCARD_WARMUP = 1;

function calibrate() {
  const start = performance.now();
  let x = 0;
  for (let i = 0; i < 50_000_000; i++) x = (x + i) % 97;
  return performance.now() - start;
}

function measureAppMetric() {
  // Stand-in for the real thing you care about. Swap this out.
  const start = performance.now();
  const arr = Array.from({ length: 200_000 }, (_, i) => i);
  arr.sort((a, b) => b - a);
  return performance.now() - start;
}

function median(samples) {
  const sorted = [...samples].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function sampleMin(fn) {
  const samples = Array.from({ length: SAMPLES }, fn).slice(DISCARD_WARMUP);
  return Math.min(...samples);
}

const calib = sampleMin(calibrate);
const raw = sampleMin(measureAppMetric);
const normalized = raw / calib;

console.log(`calib: ${calib.toFixed(2)}ms`);
console.log(`appMetric: raw=${raw.toFixed(2)}ms normalized=${normalized.toFixed(4)}`);

if (!existsSync(BASELINE_FILE)) {
  writeFileSync(BASELINE_FILE, JSON.stringify({ calib, appMetric: normalized }, null, 2) + "\n");
  console.log("bench: no baseline found, wrote one. Run again to check for regressions.");
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));

if (calib > baseline.calib * CALIB_UNRELIABLE_RATIO) {
  console.warn("bench: UNRELIABLE — this machine looks throttled/loaded vs. baseline; not failing.");
  process.exit(0);
}

const regression = (normalized - baseline.appMetric) / baseline.appMetric;
console.log(`appMetric vs baseline: ${(regression * 100).toFixed(1)}%`);

if (regression > REGRESSION_THRESHOLD) {
  console.error(`bench: FAIL — appMetric regressed ${(regression * 100).toFixed(1)}% (threshold ${REGRESSION_THRESHOLD * 100}%)`);
  process.exit(1);
}

console.log("bench: OK");
