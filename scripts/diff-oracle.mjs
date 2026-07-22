#!/usr/bin/env node
// Differential oracle: when you have two implementations of "the same
// logic" (e.g. a native build and a WASM build of the same parser, or a
// fast-path and a fallback), run both over a shared corpus and diff the
// outputs. Pin/version agreement (check-pin.mjs) doesn't guarantee
// behavioral agreement — this does.
//
// This example diffs two trivial in-process JS functions as a stand-in.
// For a real cross-language case, shell out to each implementation
// (e.g. `cargo run --example run-corpus` for the native side) and parse
// its stdout instead.

const CORPUS = ["", "a", "hello world", "  leading/trailing  ", "line1\nline2"];

function implA(input) {
  return input.trim().toUpperCase();
}

function implB(input) {
  // Stand-in for a second implementation that's supposed to behave
  // identically — swap for your real second implementation.
  return input.trim().toUpperCase();
}

let mismatches = 0;
for (const input of CORPUS) {
  const a = implA(input);
  const b = implB(input);
  if (a !== b) {
    mismatches++;
    console.error(`diff-oracle: mismatch on input ${JSON.stringify(input)}`);
    console.error(`  implA: ${JSON.stringify(a)}`);
    console.error(`  implB: ${JSON.stringify(b)}`);
  }
}

if (mismatches > 0) {
  console.error(`diff-oracle: ${mismatches}/${CORPUS.length} corpus items disagree`);
  process.exit(1);
}

console.log(`diff-oracle: implementations agree on all ${CORPUS.length} corpus items`);
