# Contributing to {{PROJECT_NAME}}

> Delete this notice once you've adjusted the file: this is a template.
> The model below ("propose, don't patch") fits a specific situation —
> a small number of maintainers (often one), a codebase that touches
> something sensitive (user data, filesystem access, credentials,
> production infra), and not enough review bandwidth to safely accept
> arbitrary third-party code. If that's not your situation — you have a
> real review team, or the codebase has no sensitive surface area —
> a normal "fork, branch, PR" model is simpler and you should use that
> instead of this file.

## The most valuable contribution: real usage and reports

Filing a good bug report, or testing a release candidate against your
own real-world setup, is worth more than a patch we then have to fully
re-verify ourselves. Please include:

- What you expected vs. what happened
- Steps to reproduce, ideally minimal
- Environment (OS, version, relevant config)

## Proposing a change: spec, not patch

Instead of opening a PR with code, open an issue written as a short
specification:

1. **Problem** — what's broken or missing, concretely.
2. **Proposed behavior** — what should happen instead. Be specific about
   edge cases, not just the happy path.
3. **Key decisions** — anything that would need an ADR if implemented:
   data format changes, new dependencies, concurrency implications,
   backwards-compatibility.
4. **How a reference implementation (if one exists) handles this**, if
   relevant — prior art removes a design debate.

A maintainer will implement it (commonly with AI assistance — see
`CLAUDE.md`) and credit you as the proposer. This isn't a formality: it
means a human-readable spec is the thing that gets security- and
correctness-reviewed, rather than an arbitrary diff, which is the whole
reason this model exists.

**Exception:** trivial, purely non-functional changes (typos, doc fixes,
broken links) can be ordinary pull requests using the standard PR
template — no spec needed.

## Licensing

State your project's license and inbound=outbound policy here. If you
want a DCO sign-off requirement or a CLA, say so explicitly — don't leave
contributors to guess.
