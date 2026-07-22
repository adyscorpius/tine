#!/usr/bin/env node
// Drift guard: fails the build if two (or more) sources of truth that
// are supposed to name the same version/value have diverged — e.g. a
// dependency's git-tag pin and a vendored build generated from that
// dependency. Run this on every `npm run build` so a partial bump
// (someone updated the pin but forgot to regenerate the derived
// artifact) fails loudly instead of shipping silently.
//
// Adapt PINS below to your real pairs. Each entry needs a `file` and a
// `pattern` (a regex with one capture group for the value to compare).

import { readFileSync } from "node:fs";

const PINS = [
  // Example — two Cargo.toml files pinning the same git dependency tag:
  // {
  //   name: "core -> vendored-lib",
  //   file: "crates/core/Cargo.toml",
  //   pattern: /some-lib\s*=.*tag\s*=\s*"([^"]+)"/,
  // },
  // {
  //   name: "vendor -> vendored-lib",
  //   file: "crates/vendor/Cargo.toml",
  //   pattern: /some-lib\s*=.*tag\s*=\s*"([^"]+)"/,
  // },
];

if (PINS.length === 0) {
  console.log("check-pin: no pins configured (edit scripts/check-pin.mjs) — skipping");
  process.exit(0);
}

const values = PINS.map(({ name, file, pattern }) => {
  const text = readFileSync(file, "utf8");
  const match = text.match(pattern);
  if (!match) {
    console.error(`check-pin: couldn't find pattern for "${name}" in ${file}`);
    process.exit(1);
  }
  return { name, file, value: match[1] };
});

const distinct = new Set(values.map((v) => v.value));
if (distinct.size > 1) {
  console.error("check-pin: pins have drifted out of sync:");
  for (const v of values) console.error(`  ${v.name} (${v.file}): ${v.value}`);
  console.error("Regenerate the derived side rather than hand-editing it.");
  process.exit(1);
}

console.log(`check-pin: all pins agree (${values[0].value})`);
