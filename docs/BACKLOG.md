# Backlog triage

A queue big enough to have dozens of open items can't be triaged at
full sentence-length per item — that's not a detail problem, it's a
bandwidth problem. The fix is a short, agreed label set that lets a
whole backlog get routed in one pass, and a batch protocol that bounds
what an agent does with the items it's handed without you in the loop.

## Labels

Pick short (1-3 character) codes for your project's actual triage
categories and write them down here — the point is that both you and
the agent use the same short vocabulary, so "N5 is done / B1 check / B5
LATER" is unambiguous. A starting set:

| Label | Meaning |
|---|---|
| `B<n>` | Bug, numbered |
| `F<n>` | Feature/proposal, numbered |
| `P<n>` | Perf item, numbered |
| `DONE` | Verified complete, no further action |
| `LATER` | Real, not now — move to docs/SCOPE.md's Deferred list with a reason |
| `?` | Needs a decision only the owner can make — surface it, don't guess |

A triage pass is then a single line per item: `N5 is done`, `B1 check`,
`B5 LATER` — not a paragraph. If you find yourself writing paragraphs to
triage, the label set is missing a category.

## Batch autonomy protocol

When handing an agent a batch of backlog items to work through without
per-item check-ins, the instruction needs three parts or it isn't
actually bounded:

1. **Decision routing** — what happens to each outcome without asking:
   clear bugs get fixed and committed; open questions get answered from
   existing docs (ADRs, this file, SCOPE.md) where possible; genuinely
   uncertain items get surfaced, not guessed at.
2. **A termination condition**, stated concretely — not "do stuff," but
   "keep going until the audit script reports no new findings" or "work
   through items B1–B12, stop after all twelve have a status." An agent
   given open-ended autonomy will either stop too early or keep finding
   marginal things to do; a concrete condition prevents both.
3. **A checkpoint mechanism** for anything that might outlive one
   session/context window — see `docs/SESSION-STATE.template.md`.

## What this optimizes for

The scarce resource in a fast solo-plus-agent workflow is your own
round-trips, not tokens or wall-clock time. A label scheme and a bounded
batch protocol both exist to spend fewer of your round-trips per item
resolved — that's the actual metric to optimize this against, not
throughput per se.
