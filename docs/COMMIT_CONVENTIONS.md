# Commit conventions

## Prefixes

Conventional-Commits style, `type(scope): summary`, scope optional:

- `feat:` — new capability
- `fix:` — bug fix. `fix(audit):` / `fix(audit2):` if you're working
  through a numbered audit/review pass (see below)
- `perf:` — performance change; if it touches a hot path, name the
  benchmark result in the body
- `refactor:` — no behavior change
- `chore(<dep>):` — dependency/tooling bump, e.g. `chore(lockfile):`
- `test:`, `docs:`, `release:` — as they sound

## Body, for anything non-trivial

Write it as: **what was wrong → why → what changed → how you verified
it.** Name the actual check ("vitest: 42 passed", "bench.mjs: bigLoad
+2% within noise floor"), not "tests pass." A future reader — human or
agent — should be able to tell from the body alone whether this is safe
to build on without re-deriving your reasoning.

## Numbered work-item schemes

When working through a backlog, audit, or milestone list, tag each
commit with the item's ID rather than inventing new prose each time —
e.g. `fix(audit2): #7 stale cache on rename`, `M3: journal date parser`,
`P2: dedupe scanners`. Pick *one* scheme per body of work and stick with
it; don't mix numbering styles mid-stream. This makes it possible to
grep the log for "did we handle item #7" and get a real answer.

## One concern per commit

Small and atomic, even when it feels slower. A commit that fixes four
unrelated bugs should usually be four commits — if it must be one (e.g.
they're genuinely entangled), say so explicitly in the body and call out
each bug separately within it.

## AI-paired sessions

If a change was produced with AI assistance you want attributed, add a
trailer:

```
Co-Authored-By: <agent name> <noreply@example.com>
```

This is attribution, not a substitute for the human author reviewing
and being accountable for the change.
