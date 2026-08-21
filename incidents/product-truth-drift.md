# Representative Log: Product Truth Drift

## Problem

A product's visible main content had already been updated from newer owner-confirmed engineering data, but older FAQ and machine-readable representations still exposed obsolete values.

## High-information evidence

The important finding was not simply "one number was wrong." It was that one product fact existed in several places at once:

- visible product body
- FAQ
- structured data / JSON-LD
- product knowledge JSON
- translated pages

Updating the main body did not invalidate every derived representation.

## Overlooked variable

**One fact can have multiple stale copies.**

A page can therefore look correct to a human reviewer while still sending contradictory information to search engines or AI systems.

## Human / workflow decision

- Treat owner-confirmed engineering data as the highest product truth source.
- Do not let the Agent choose between conflicting values based on plausibility.
- When truth changes, validate every derived representation together.
- Explicitly ban known obsolete values in regression checks when appropriate.

## New gate

A product-spec consistency validator now checks the authoritative registry against public language pages, FAQ / machine-readable content and known legacy values.

## Why this log is representative

The decisive insight was not the specific product value. It was the dependency model: generated or copied content must be invalidated when its upstream truth changes.
