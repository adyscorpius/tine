# 0001 — Example: keep core logic behind a thin shell

> This is a worked example so the pattern is visible before your project
> has its own ADRs. Delete it once you've written a real 0001.

Status: accepted

## Context

Business logic (parsing, validation, the actual domain rules) tends to
leak into whatever layer happens to be most convenient at the moment
it's written — a CLI command handler, an HTTP route, an IPC command.
Each time that happens, the logic becomes harder to unit test (it now
needs the framework running), harder to reuse (it's tied to one entry
point), and harder for an agent to safely modify (a change now risks
breaking the glue code around it, not just the logic).

## Decision

All substantive logic lives in `crates/core` (or your stack's
equivalent), which has no dependency on any UI, CLI, or IPC framework
and is fully testable with a plain unit-test run. `crates/shell` (the
CLI/IPC/HTTP layer) is only allowed to marshal — parse input, call core,
serialize output. If a shell-layer function needs an `if` that encodes a
business rule, that rule moves into core.

## Consequences

- Core logic gets fast, framework-free tests; most bugs are catchable
  without booting the whole app.
- The shell layer stays small enough to review at a glance, and small
  enough that an agent can regenerate or restructure it without risking
  the actual logic underneath.
- Cost: an extra interface boundary to maintain, and occasional
  friction when a rule is legitimately about *how* the shell presents
  something (e.g., which errors are user-facing) rather than domain
  logic — those calls need judgment, not a wall.
