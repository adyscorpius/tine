# Architecture Decision Records

One file per **load-bearing** decision — a choice that would be expensive
to reverse, or that someone (human or AI) might otherwise quietly undo
because the reasoning behind it isn't visible in the code itself.

Not every decision needs one. A decision needs an ADR when the *why*
isn't obvious from reading the diff — when someone six months from now
(or an agent picking up the task cold) could plausibly "fix" it back to
the wrong thing because the tradeoff isn't written down anywhere.

## Rules

- **Append-only.** Don't edit a merged ADR's Decision or Consequences
  after the fact. If circumstances change, write a new ADR that
  explicitly supersedes the old one and says why.
- **Numbered sequentially**, oldest first: `0001-`, `0002-`, ...
- **Short.** If it's longer than a page, you're probably documenting the
  implementation, not the decision.
- Use `template.md` as the starting shape.

## Why this exists

The point isn't documentation for its own sake. It's specifically so
that fast iteration doesn't erode past decisions — so an agent (or a new
contributor) making rapid changes has something to check *before*
re-deciding something that was already decided, and so a reviewer can
tell "this was deliberate" from "this was overlooked" at a glance.
