# Cross-agent working agreement

`CLAUDE.md` is instructions for a single agent in a single session.
This file is for when there's more than one — separate sessions per
component, different models playing different roles, or both. Every
agent involved should be able to read this and understand where it sits
relative to the others.

If you only ever run one agent in one session, you don't need this file
— delete it. It starts to earn its keep once a second concurrent agent
shows up.

## Why split sessions/roles at all

A single long-running session accumulates context that isn't relevant
to every task in it, and a single model isn't equally well-suited to
every kind of work. Splitting by component (e.g. a separate session for
a vendored sub-library vs. the main app) keeps each session's context
relevant to what it's actually doing. Splitting by role lets you match
cost/capability to the task instead of paying frontier-model cost for
every mechanical change.

## A role split that works

- **Router** — the human. Decides what's core/plugin/deferred
  (`docs/SCOPE.md`), triages the backlog (`docs/BACKLOG.md`), and is
  the sole owner of taste, product commitments, privilege boundaries,
  and risk acceptance. Nothing below delegates this away.
- **Implementer** — handles the mechanical majority of changes: clear
  bugs, well-specified features, refactors. Can be a cheaper/faster
  model than the auditor if the task doesn't need deep reasoning.
- **Auditor** — reviews the implementer's output, runs audit passes to
  a fixed point (keep going until a pass finds nothing new, not just
  once), and is deliberately a *different* model or session than the
  implementer when possible. A model switch is itself a design review —
  an independent model is less likely to share the implementer's blind
  spots than the same model re-checking its own work.

Scale this down for a two-person (one human, one agent) setup: the same
agent can play implementer and auditor in sequence, as long as the audit
pass is explicitly a distinct step, not skipped because the code "looks
fine" right after writing it.

## Cross-examination

For anything non-trivial or where you don't fully trust the first
answer, get a second, independent implementation or opinion from a
different model/session before committing to one. Disagreement between
two independent attempts is a much stronger signal than either attempt's
own confidence.

## Model routing

Keep an explicit mapping of "this kind of task → this model," and a
fallback ladder for when your first choice is unavailable/rate-limited.
Revisit the mapping when new models ship — don't leave it pinned to
whatever was current when the project started.

## Shared state between agents/sessions

- Hand off work between sessions as self-contained written specs (issue
  text, a markdown file), not as "go read the other session's
  history" — a spec that stands on its own is portable across model
  changes and session restarts; shared history isn't.
- `docs/SESSION-STATE.template.md` is the per-session checkpoint format;
  use it for any session whose work might need to be picked up by a
  different session.
- Public-facing actions (issue comments, PR replies) taken autonomously
  should self-identify as acting on the human owner's behalf, not as an
  independent actor — this is an honesty norm, not a legal disclaimer.
