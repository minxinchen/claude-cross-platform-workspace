# Representative Log: Experiment State Is Not Production State

## Problem

The project contained a lightweight scroll-reveal experiment. A future Agent reading the repository could easily misremember "this experiment exists" as "this feature shipped to production."

## High-information evidence

At the recorded checkpoint:

- the experimental page was publicly reachable but marked `noindex`;
- the heavy slider runtime was absent from the test page;
- the test marker existed on the experiment;
- the production homepage did **not** contain the test marker or test-page references.

## Overlooked variable

**Repository presence is not release status.**

A file, screenshot, test page or prototype can be real project history without ever becoming part of production.

## Human / workflow decision

- Record experiment state separately from production state.
- Require explicit release evidence before describing a prototype as shipped.
- Keep experiment URLs isolated and prevent them from silently entering navigation or search indexing.

## Why this log is representative

This evidence is useful because it proves a negative: the experiment was not production at that checkpoint. That protects later summaries from turning project history into a false achievement claim.
