# Standing instructions for AI agents working in this repo

These apply to any agent (Claude or otherwise) making changes here, on
top of whatever the task at hand asks for.

## Before making a load-bearing decision

A decision is "load-bearing" if reversing it later would mean redoing
real work — a storage format, a public interface, a dependency you're
building substantial logic on top of, a concurrency model. Before making
one:

1. Check `docs/adr/` — has this already been decided? Don't re-litigate
   a settled decision without writing a new ADR that explicitly
   supersedes the old one.
2. If it's new, write the ADR *as part of the same change*, not
   after — `docs/adr/template.md` has the shape. Keep it short: context,
   decision, consequences (including the ones you're accepting, not just
   the ones you're getting).

## Keep logic out of the glue layer

If this project has a `core`/`shell` (or `lib`/`cli`, `server`/`api`,
etc.) split, business logic belongs in the logic layer, full stop. The
glue layer (CLI parsing, IPC handlers, HTTP routes) should be thin enough
that a reviewer can tell at a glance it's "marshalling, not deciding."
If you're about to add an `if` with real business meaning to a route
handler, stop and move it down.

## Before finishing a change

Run whatever of these apply to what you touched:

- `scripts/check-pin.mjs` — did you change one of two things that are
  supposed to match (a version pin and a vendored build, a schema and
  generated code)? Regenerate the derived side, don't hand-edit it.
- `scripts/bench.mjs` — did you touch a hot path? Compare against
  `scripts/bench-baseline.json`; a normalized regression >30% needs a
  reason in the commit message, not just a shrug.
- `scripts/smoke.mjs` — did you touch UI or an end-to-end flow that
  doesn't have unit test coverage?
- Whatever unit tests cover the code you changed. Don't leave a change
  green-by-omission (untested) when a test could have caught the class
  of bug you were fixing.

## Commit discipline

- One concern per commit. If you fixed four unrelated bugs, that's four
  commits (or four clearly-delimited paragraphs in one commit body if
  they're genuinely inseparable — but default to four commits).
- Follow `docs/COMMIT_CONVENTIONS.md`. For anything non-trivial, the
  commit body should read as: what was wrong, why, what changed, how you
  verified it (name the actual check — "cargo test: 42 passed", not
  "tests pass").
- Don't invent a new milestone/audit-numbering scheme mid-stream — if one
  exists in the current thread of work, keep using it.

## When you're not sure

Prefer a small, reversible step over a large speculative one. If you're
choosing between "ask" and "guess and proceed," and the guess is hard to
undo, ask.
