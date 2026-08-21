# Representative Log: Search Console as an External Reality Check

## Problem

Local and anonymous public checks looked healthy, but first-party Search Console indexing data still showed a set of redirected legacy URLs.

## High-information evidence

A review of 32 redirected URLs found that most represented valid historical behavior, normalization, or already-correct redirects. Fourteen legacy paths, however, had clear modern equivalents but were falling back to a language homepage instead of the relevant destination.

## Overlooked variable

**A local PASS does not guarantee that the search engine sees the same historical URL graph.**

The website can be technically healthy in its current navigation while still exposing poor legacy routing to crawlers and old search results.

## Human / workflow decision

- Treat Search Console as engineering evidence, not only a reporting dashboard.
- Separate valid historical redirects from genuinely wrong fallbacks.
- Repair only paths with an unambiguous modern equivalent.
- Prefer relevant single-hop redirects rather than sending every unknown legacy URL to a homepage.
- Do not claim same-day indexing improvement after a fix; Search Console data can lag behind production changes.

## Why this log is representative

The decision changed because an external first-party system revealed a class of behavior that current-page QA alone could not fully expose.
