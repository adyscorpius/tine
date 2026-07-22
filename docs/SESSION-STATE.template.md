# Session state

Copy this to `SESSION-STATE.md` at the repo root (gitignored — it's a
per-session scratch file, not shared history) when starting work that
might outlive one context window: a long batch pass, an overnight
autonomous run, or anything you might need to resume after a restart or
a context compaction. Update it as you go, not just at the end — the
whole point is that it's useful even if the session ends unexpectedly.

Delete it when the work is done and merged; don't let it become a second,
stale source of truth alongside the actual backlog/ADRs.

---

## Goal

What this session is trying to accomplish, in one or two sentences.
Concrete enough that a fresh agent reading only this file could tell
whether a given change is in scope.

## Termination condition

The concrete stop condition for this batch of work (see
`docs/BACKLOG.md`) — not "when it feels done."

## Done

- Item — one line, with the commit hash if applicable.

## In progress

- Item — current state, what's blocking it from being "done."

## Blocked / needs a decision

- Item — what decision, and why it can't be guessed at safely.

## Next

- Item — queued but not started.

## Notes for whoever resumes this

Anything a fresh read of the repo + this file wouldn't tell you:
a red herring you ruled out, a flaky test you're aware of, a
half-finished refactor's intended shape.
