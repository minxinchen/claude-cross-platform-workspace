# Representative Log: Isolated First-Screen Performance Test

## Problem

Mobile visitors waited roughly 13 seconds for the main first-screen content to become the Largest Contentful Paint.

## Candidate explanations

- hosting / server response
- image weight
- WordPress overhead
- first-screen slider plugin
- JavaScript / CSS
- cache behavior

## High-information experiment

A separate test page changed one major variable only: the first-screen **Smart Slider 3** block was replaced with a static lightweight hero. The rest of the page stayed as comparable as practical.

### Result

| State | Mobile LCP |
|---|---:|
| Original homepage | 13.10s |
| Isolated static-hero test | 3.16s |
| Redesigned production release | 2.72s |

The isolated change reduced LCP by roughly 9.94 seconds before the production redesign was even complete.

## Interpretation

The evidence did not support treating hosting as the primary bottleneck. The first-screen interaction architecture was a much stronger explanatory variable.

## Human decision

- Do not start with a hosting migration as the main fix.
- Remove the heavy slider runtime from the first screen.
- Rebuild the hero with lightweight HTML/CSS.
- Preserve the owner's visual intent through background, logo, copy, CTA and responsive spacing rather than restoring the slider.
- Test richer interactions separately so they cannot silently become production dependencies.

## Why this log is representative

Dozens of Lighthouse runs are useful raw evidence, but this isolated test changed the causal explanation and therefore changed the implementation path. That makes it more valuable for future Agent context than a chronological dump of every performance file.
