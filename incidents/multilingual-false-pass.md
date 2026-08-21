# Representative Log: Multilingual False PASS

## Problem

A multilingual release had been described as complete, but equivalent pillar content actually existed in only one language.

## What had passed

The earlier release gate already checked useful signals such as:

- translated URLs
- H1
- articles
- hreflang
- schema
- visual scenarios

Those checks were real, but the denominator was incomplete.

## High-information evidence

The translated category pages existed, yet equivalent rendered pillar DOM was missing in two language versions.

A second modifier complicated diagnosis: logged-in WordPress output could show newer content while anonymous visitors still received older cached output.

## Overlooked variable

**Surface coverage is not content equivalence.**

The old reasoning implicitly treated:

`translated URL exists` → `translated experience is complete`

That inference was false.

## Human / workflow decision

Multilingual completion now requires per-language anonymous validation of the rendered result, including the expected content structure and desktop/mobile behavior.

## New gate

Future checks must verify, per language:

- unique H1
- complete pillar DOM
- expected in-page navigation
- same-language product links
- FAQ block
- same-language CTA
- no duplicate required IDs
- no horizontal mobile overflow
- anonymous public output after cache purge

## Why this log is representative

The key lesson is not that "a translation was missing." The important evidence exposed a flaw in the release model itself: the denominator measured language surfaces, not equivalent language experiences.
