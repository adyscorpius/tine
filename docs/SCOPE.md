# Scope

A running record of what's deliberately *in*, deliberately *out*, and
*deferred* — so scope decisions get made once, not re-litigated every
time a feature request that sounds reasonable in isolation shows up.
Without this, a small project accretes scope indefinitely because each
individual addition looks justified on its own merits.

## Categories

- **Core** — built into the product itself. Reserve this for the
  narrowest version of a capability that's actually load-bearing to the
  product's identity. When a feature request has a deterministic,
  narrow interpretation and a richer, more general one, default to
  shipping the narrow one in core and pushing the richer version to
  Plugin or Deferred — you can always widen core later; walking back an
  overgrown core is much harder.
- **Plugin / extension** — valuable, but not something every user needs,
  or something that would pull in a dependency/complexity the core
  shouldn't carry. Lives outside the core boundary (a plugin API,
  a separate package, a community fork).
- **Deferred** — legitimate and probably worth doing, but not now.
  Different from *rejected*: it stays on this list with a reason, so
  the next time someone proposes it you're not starting from zero.
- **Rejected** — considered and explicitly decided against, with the
  reason recorded. Prevents the same debate from recurring every few
  months with nobody remembering how it was resolved last time.

## Resolving borderline cases

Most scope questions aren't borderline. For the ones that are — where
reasonable people would land in different places — scope decisions
resolve by owner call, not by committee or by whoever argues longest.
Record the call and the one-line reason here; that's what makes the
call durable instead of something that gets quietly re-argued.

## Template entry

```
### <Feature/capability name>
Category: Core | Plugin | Deferred | Rejected
Reasoning: <one or two sentences — why this category, not the others>
Revisit if: <optional — a concrete condition that would change the call>
```

## Example (delete once you have real entries)

### Real-time multi-user collaboration
Category: Deferred
Reasoning: Real demand, but requires a sync/conflict-resolution
architecture the current single-writer model doesn't support. Doing it
half-way (e.g. last-write-wins) would violate the data-safety invariant.
Revisit if: the core storage model changes to support merge/CRDT
semantics for an unrelated reason.

### Plugin marketplace / arbitrary third-party code execution
Category: Rejected
Reasoning: The product has real filesystem/credential access; a single
maintainer cannot review arbitrary third-party plugin code at the trust
level this requires. See CONTRIBUTING.md's "propose, don't patch" model
for the same reasoning applied to contributions in general.
