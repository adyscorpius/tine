# scripts/

Verification tooling — the automated substitute for a team's worth of
review. Each script is a *pattern*, adapted to this stack (Node/TS +
Rust) as a working example; port the pattern, not necessarily the code,
to yours.

| Script | Pattern | Wire it to |
|---|---|---|
| `check-pin.mjs` | Drift guard: fail fast if two sources of truth that must agree have diverged | Any pair like a dependency pin + vendored build, a schema + generated code |
| `diff-oracle.mjs` | Differential oracle: run two implementations of "the same logic" over a shared corpus and diff the outputs | Any place you have (deliberately or accidentally) two implementations of one behavior |
| `bench.mjs` + `bench-baseline.json` | Calibrated benchmark: normalize a timing metric by a fixed-cost calibration probe so the baseline is portable across machines, then fail on regression past a threshold | Whatever your project's actual perf-sensitive path is |
| `smoke.mjs` | End-to-end smoke test against the mock backend, no native build required | Your app's critical golden path |
| `shot-example.mjs` | Visual-regression capture: screenshot a feature so a diff is visible even without a pixel-diff assertion | Any UI surface without good unit-test coverage |
| `env.sh` | Toolchain path setup that survives environment/container rebuilds | Adjust to your actual toolchain |

## Why these specifically

Each one exists to make a *class* of regression visible automatically,
instead of relying on someone remembering to check by hand — which is
exactly the check that gets skipped when moving fast. Wire each into
`npm run build`, CI, or your pre-commit step for the ones cheap enough to
run every time; keep the expensive ones (real benchmarks, E2E) as
explicit `node scripts/x.mjs` invocations run before a release or a
perf-sensitive change.
