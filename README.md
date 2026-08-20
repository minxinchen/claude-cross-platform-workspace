# Human-AI AIO Site Governance Case Study

> De-identified portfolio case study: how a human operator and AI agents worked together to improve a multilingual B2B industrial website without letting the model invent facts.

## What this project shows

This repository is a public, sanitized version of a real workflow. The original work involved a B2B industrial website, multilingual content, WordPress operations, structured data, search visibility, and repeated release validation.

The interesting part is not simply “AI wrote website copy.” The project shows how to design boundaries so AI can help while deterministic checks and human approvals keep the work safe.

## The core problem

A B2B technical website had several issues that are common in small industrial companies:

- product pages were close to catalog snippets instead of clear answers;
- multilingual pages were incomplete or inconsistent;
- product facts existed in public pages, PDFs, owner replies, and old generated files;
- structured data risked becoming misleading if AI filled missing fields;
- “looks good in the browser” did not always match anonymous public requests because of cache and login state.

## My role

I acted as the human operator between the business owner, the website, and AI agents.

My responsibilities included:

- defining what AI was allowed to change;
- separating owner-confirmed facts from guesses;
- asking the agent to generate content, scripts, reports, and validation gates;
- reviewing outputs before release;
- keeping evidence logs for before/after states;
- forcing the workflow to fail safely when facts, schema, language pages, or public rendering were inconsistent.

## Technical stack

- **WordPress**
- **Rank Math**
- **Polylang**
- **Breeze cache**
- **Google Search Console**
- **Google Rich Results Test**
- **Schema.org / JSON-LD**
- **Python**
- **Node.js**
- **Playwright / browser automation**
- **Lighthouse**
- **GitHub**
- **Google Drive**
- **AI agents / LLM-assisted workflow**

## Boundary design

The workflow used a simple rule:

```text
Human or owner-confirmed facts
        ↓
structured truth registry
        ↓
AI-generated copy / HTML / schema / scripts
        ↓
deterministic gates
        ↓
anonymous public validation
        ↓
release or rollback
```

AI could draft, compare, generate, and check. AI could not invent missing product specifications, silently publish uncertain facts, or claim success without evidence.

## AIO strategy in plain language

AIO in this project meant making the site easier for search engines, AI crawlers, and future agents to understand.

That did not mean adding more schema everywhere. In one important case, the safer move was removing invalid Product/ProductModel structured data because the public page did not show real price, offer, inventory, review, or rating data.

The rule was:

> If a human visitor cannot see or verify the fact, the structured data should not pretend it exists.

## Validation gates

The project used repeated gates instead of trust-me completion notes:

- multilingual URL coverage;
- canonical and reciprocal hreflang checks;
- H1 and metadata checks;
- structured data integrity;
- public anonymous HTML validation;
- visual desktop/mobile checks;
- sitemap, internal link, and image checks;
- redirect and canonical regression checks;
- source-of-truth consistency checks.

## Why logs mattered

The logs were not decoration. They recorded where the AI-human workflow failed and how the process changed.

Examples:

- a multilingual pillar page looked complete in one language, but not in all languages;
- a cache made the logged-in browser show a newer version than anonymous visitors saw;
- an updated product specification fixed the main page but left old FAQ/schema values behind;
- a release that was previously marked PASS was later corrected by stronger evidence.

This is the most important lesson of the project:

> Human-AI collaboration is not “AI finishes the task.” It is a loop where evidence can overturn an earlier AI conclusion.

## Repository map

```text
.
├── docs/
│   ├── human-ai-workflow.md
│   ├── aio-governance.md
│   └── incidents.md
├── examples/
│   ├── product-truth-registry.example.json
│   ├── project-state.example.json
│   └── release-gate.example.json
├── logs/
│   └── README.md
└── scripts/
    └── verify-release-gate.example.js
```

## What was intentionally removed

This public version removes or generalizes:

- client name and contact details;
- exact private business context;
- backend credentials or operational paths;
- raw crawl payloads;
- screenshots that may expose client assets;
- unpublished product or business facts;
- internal comments that were useful operationally but not safe as public portfolio material.

## Portfolio takeaway

This case study demonstrates a practical pattern for agent-assisted web operations:

1. let AI do repetitive reading, drafting, comparison, and script generation;
2. keep humans responsible for truth, release decisions, and business context;
3. turn every failure into a stricter gate;
4. make the final state inspectable through logs, checklists, and rollback paths.
