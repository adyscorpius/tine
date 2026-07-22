# Agent-Ready Project Scaffold

A starting-point repo structure distilled from watching a real fast-moving
sprint: one developer pairing with an AI coding agent for an extended,
continuous session — dozens of small, verified commits, no regressions,
no drift. That velocity didn't come from typing speed. It came from the
*repo* being built so an agent could move quickly without breaking things
quietly. This scaffold is that repo structure, genericized.

## The core idea

An AI agent (or a human moving fast) breaks things in predictable ways:
it forgets why a decision was made, it duplicates logic that already
exists elsewhere, it "fixes" a regression it can't actually see, and it
makes a change too large to review in one pass. This scaffold addresses
each of those directly:

| Failure mode | Countermeasure | Where |
|---|---|---|
| Re-litigating settled decisions | Append-only decision log | `docs/adr/` |
| Two copies of "the same logic" silently drifting | Drift guard + differential oracle | `scripts/check-pin.mjs`, `scripts/diff-oracle.mjs` |
| Perf regressions nobody notices until users complain | Calibrated benchmark with a machine-independent, deliberately-updated baseline | `scripts/bench.mjs` |
| Visual/behavioral regressions in things that don't have unit tests | Smoke test + screenshot capture | `scripts/smoke.mjs`, `scripts/shot-example.mjs` |
| Changes too large or unreviewable | Commit conventions + small-atomic-commit norm | `docs/COMMIT_CONVENTIONS.md` |
| Logic leaking into the UI/IPC/glue layer, becoming untestable | Core-behind-thin-shell architecture | `crates/core` vs `crates/shell` |
| Scope creeping in one justified-sounding feature at a time | An explicit core/plugin/deferred/rejected ledger | `docs/SCOPE.md` |
| A backlog too big to triage at full sentence-length | Short label scheme + bounded batch-autonomy protocol | `docs/BACKLOG.md` |
| The same class of bug rediscovered from scratch each time | Regression catalog: every real fix leaves a test + a one-liner | `docs/REGRESSIONS.md` |
| Long-running work lost to a context reset or restart | A checkpoint format for in-flight state | `docs/SESSION-STATE.template.md` |
| More than one agent/session stepping on the same decisions | A cross-agent working agreement (roles, model routing, hand-off format) | `AGENTS.md` |
| The agent not knowing any of the above exists | Standing instructions | `CLAUDE.md` |

None of this requires a large team. It's designed for exactly the
opposite case: one person, moving fast, who needs the repo itself to
catch what a team's review process normally would — the first table
rows are load-bearing *artifacts* (ADRs, oracles, benchmarks); the
later rows are the *management layer* around them (scope discipline,
triage, autonomy boundaries) that keeps the artifacts from decaying
once the pace picks up.

## Directory map

```
CLAUDE.md                   Standing instructions for a single AI agent working in this repo
AGENTS.md                   Cross-agent working agreement — only needed once you run more than one
CONTRIBUTING.md             "Propose, don't patch" contribution model (adjust or delete per project)
docs/
  adr/                      Architecture Decision Records — one file per load-bearing decision
  COMMIT_CONVENTIONS.md     Commit message prefixes + the audit/milestone numbering scheme
  SCOPE.md                  Core / plugin / deferred / rejected ledger
  BACKLOG.md                Triage label scheme + the batch-autonomy protocol
  REGRESSIONS.md            Catalog of fixed bugs and the tests that now guard them
  SESSION-STATE.template.md Checkpoint format for work that might outlive one session
crates/
  core/                     Pure logic, no UI/IO framework deps — must be testable with `cargo test` alone
  shell/                    Thin wrapper (stand-in for a CLI/IPC/HTTP layer) — marshals only, no logic
src/                        Frontend stub with a Backend interface + a mock implementation
scripts/                    Verification tooling — see scripts/README.md
.github/
  workflows/ci.yml          Fast, cheap checks on every push/PR
  workflows/release.yml     Heavier build/release, gated on a version tag
  PULL_REQUEST_TEMPLATE.md, ISSUE_TEMPLATE/
```

## Adopting this in a new project

1. Rename `crates/core` / `crates/shell` (or replace with your stack's
   equivalent — a `lib/` + `cli/` split, a `server/` + `api/` split,
   whatever separates *logic* from *glue*). The only rule: the shell
   layer contains no business logic, only marshalling.
2. Delete the pieces that don't apply. Rust/Node is the example stack
   here because it's a common one, not a requirement — the *patterns*
   (drift guard, differential oracle, calibrated bench, thin shell, ADRs)
   port to any language.
3. Write ADR 0001 for your project's first real load-bearing decision.
   Delete the example one.
4. Read and edit `CLAUDE.md` and `CONTRIBUTING.md` to fit your project
   before you start relying on either.
5. Wire `scripts/check-pin.mjs` to whatever two sources of truth in
   *your* project need to stay in sync (a schema and its codegen output,
   a proto file and its bindings, a dependency pin and a vendored build
   — anything with two copies of "the same thing").
6. Replace `docs/SCOPE.md`'s example entries with your project's actual
   scope calls, even if it's just one line: "everything is in scope for
   now."
7. If you're running a single agent in a single session, delete
   `AGENTS.md` — it's only useful once a second concurrent agent or
   session shows up. Don't carry it as unused ceremony.
