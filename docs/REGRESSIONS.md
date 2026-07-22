# Regression catalog

An old failure should require less human rediscovery the next time it
almost happens again. That only holds if fixing a bug leaves something
behind besides the fix itself — this file, plus a test, is that
something.

## The rule

When you fix a real bug (not a typo, not a one-off), before considering
it done:

1. Add a test that would have caught it — a unit test if the logic
   layer can catch it, an entry in the differential-oracle corpus
   (`scripts/diff-oracle.mjs`) if it's a behavioral-parity bug, a smoke
   assertion if it's an end-to-end interaction bug.
2. Add a one-line entry below. Not a full incident report — just enough
   that a future audit pass (human or agent) recognizes "we've seen this
   class of thing before" instead of re-deriving it from scratch.
3. If this is the *second or third* time a similar-shaped bug has shown
   up in the same area, that's not three unrelated bugs — treat it as a
   signal that the architecture in that area is wrong, not that it
   needs more patches. Write an ADR about the fix, not just a commit.

## Entry format

```
- YYYY-MM-DD  <one-line description>  (test: <where the regression test lives>)
```

## Log

<!-- Add entries above this line, newest first. -->
