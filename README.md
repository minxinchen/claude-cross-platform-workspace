# Human-AI Evidence-Driven Web Operations Case Study

> De-identified portfolio case study of a real multilingual B2B website project: how a human operator used AI agents, experiments, logs and deterministic checks to make decisions without treating AI conclusions as truth.

## What this project is actually about

I did not start with a perfect Agent governance architecture. I started with practical website problems, let AI agents help inspect and modify the site, watched them make mistakes, disagreed with some recommendations, and gradually learned which evidence should be trusted before making the next decision.

The operating pattern became:

```text
Observe a problem
      ↓
Form candidate explanations
      ↓
Find evidence that can distinguish them
      ↓
Identify overlooked variables
      ↓
Change the implementation or validation rule
      ↓
Measure again
```

The logs matter because they preserve **why a decision changed**, not just what files were edited.

## Example: 13 seconds was not a hosting problem

The original mobile homepage took roughly **13.10 seconds** for the main first-screen content to become the Largest Contentful Paint.

The site used **Smart Slider 3** because the owner wanted the homepage to feel visually rich rather than static. Instead of immediately blaming hosting, an isolated test page changed one major variable: the first-screen slider was replaced with a lightweight static hero while the rest of the page stayed comparable.

```text
Mobile LCP
13.10s  →  3.16s  →  2.72s production
baseline    isolated    redesigned release
```

That evidence changed the implementation path. The production homepage kept the background, logo, copy, CTA, responsive layout and visual rhythm, but removed the heavy slider runtime.

See [`performance/isolated-first-screen-test.md`](performance/isolated-first-screen-test.md).

## Logs are loaded like evidence, not dumped into context

The original workspace accumulated many Lighthouse runs, raw HTML files, screenshots, JSON checks, stderr files and rollback snapshots. They are necessary evidence, but they are not equally informative.

```text
Raw Evidence
Lighthouse / HTML / screenshot / JSON / stderr
        ↓
Representative Log
Which evidence actually changed the interpretation?
        ↓
Decision Rule
What implementation, gate or release rule changed because of it?
```

For an Agent, the loading path becomes:

```text
Question
   ↓
Project State
   ↓
Problem Class
   ↓
Evidence Map
   ↓
Representative Log
   ↓
Raw Evidence only when needed
```

The machine-readable index is [`examples/evidence-map.example.json`](examples/evidence-map.example.json).

## High-information cases

### Performance

**Phenotype:** mobile first-screen ≈ 13 seconds.  
**Evidence:** changing only the heavy first-screen slider reduced LCP from 13.10s to 3.16s.  
**Overlooked variable:** first-screen interaction architecture mattered more than hosting alone.  
**Decision:** rebuild the first screen as a lightweight hero. Production LCP reached approximately 2.72s.

### Multilingual false completion

**Phenotype:** an AI-assisted release was described as multilingual-complete.  
**Evidence:** URLs, H1 and hreflang existed across languages, but equivalent pillar DOM existed in only one language.  
**Overlooked variable:** surface coverage was mistaken for equivalent rendered content.  
**Decision:** require per-language anonymous DOM validation before multilingual completion can PASS.

See [`incidents/multilingual-false-pass.md`](incidents/multilingual-false-pass.md).

### Product truth drift

**Phenotype:** visible product content was updated while older FAQ / machine-readable data still contained obsolete values.  
**Overlooked variable:** one engineering fact had multiple representations.  
**Decision:** owner-confirmed data became the highest product truth source, and derived representations were validated together.

See [`incidents/product-truth-drift.md`](incidents/product-truth-drift.md).

### Search-engine reality check

**Phenotype:** local/public QA looked healthy, but first-party Search Console data exposed legacy URL behavior that still needed repair.  
**Evidence:** 32 redirected URLs were reviewed; 14 clear legacy equivalents were incorrectly falling back to a homepage.  
**Decision:** Search Console became an engineering input, not only a reporting dashboard.

See [`search/search-console-redirect-review.md`](search/search-console-redirect-review.md).

### Experiment ≠ production

A scroll-reveal concept existed on an isolated `noindex` test page while the production homepage did not contain the test marker at that checkpoint.

**Decision:** an experiment cannot be described as shipped without explicit release evidence.

See [`experiments/scroll-reveal-state-check.md`](experiments/scroll-reveal-state-check.md).

### Human hypothesis vs Agent optimization target

The Agent optimized for a production-safe Rich Results policy: no fabricated Offer, price, review or rating fields, and no unsupported Product implementation.

I still had a different, untested question:

> What if only one product became an experimental group with stronger visible FAQ and semantic clarity, while other products stayed unchanged, and I later compared GSC / AI-search visibility?

That experiment has **not been executed** and has **no result yet**. It remains in the repository because production safety and experimental information gain are different objective functions.

See [`hypotheses/single-product-aio-experiment.md`](hypotheses/single-product-aio-experiment.md).

## My role

I acted as the human operator between business context, the public website, AI agents and external evidence. I was responsible for deciding which problem mattered, which facts were authoritative, whether an Agent recommendation should be accepted/rejected/tested, whether something was allowed to ship, and which failures deserved a permanent validation rule.

AI agents were used for high-volume reading, comparison, implementation drafts, script generation, structured checks and evidence collection.

## Technical stack

**WordPress · Rank Math · Polylang · Breeze cache · Smart Slider 3 · Google Search Console · Google Rich Results Test · Schema.org / JSON-LD · Python · Node.js · Playwright · Lighthouse · GitHub · Google Drive · AI agents / LLM-assisted workflow**

## AIO in plain language

AIO here means reducing how much a search engine or AI system has to guess.

- **H1**: state clearly what the page is mainly about.
- **HTML product information**: do not hide important facts only in images or PDFs.
- **hreflang / canonical**: describe language relationships and preferred URLs.
- **Schema.org**: a shared vocabulary for describing entities such as an Article or Organization.
- **JSON-LD**: a machine-readable format for expressing that vocabulary.
- **GSC**: first-party evidence of how Google is actually discovering, indexing and routing the site.

None of these guarantees rankings or AI citations. They are technical conditions that make information more consistent and inspectable.

## Why not add every possible Product schema field?

The public B2B pages did not expose verified Offer, price, inventory, review or rating data. The production-safe policy became:

> Do not invent a field just to make a machine validator happy.

Unsupported Product / ProductModel rich-result implementation was removed rather than filled with fabricated commercial data. The still-unvalidated single-product experiment is documented separately.

See [`docs/aio-governance.md`](docs/aio-governance.md).

## Repository map

```text
.
├── docs/
│   ├── human-ai-workflow.md
│   ├── aio-governance.md
│   └── incidents.md
├── examples/
│   ├── evidence-map.example.json
│   ├── product-truth-registry.example.json
│   ├── project-state.example.json
│   └── release-gate.example.json
├── performance/
│   └── isolated-first-screen-test.md
├── incidents/
│   ├── multilingual-false-pass.md
│   └── product-truth-drift.md
├── search/
│   └── search-console-redirect-review.md
├── experiments/
│   └── scroll-reveal-state-check.md
├── hypotheses/
│   └── single-product-aio-experiment.md
├── logs/
│   └── README.md
└── scripts/
    └── verify-release-gate.example.js
```

## What was intentionally removed

This public version removes or generalizes client identity, private business context, credentials, operational paths, raw crawls, identifiable screenshots, unpublished engineering facts, internal WordPress IDs and raw logs that contain client-specific material.

The public repo keeps the **decision structure** and representative evidence patterns instead of exposing the client workspace.

## Takeaway

The useful skill I developed was not simply asking AI to optimize a website. It was learning to ask:

1. What is the observed problem?
2. Which variables could explain it?
3. Which log actually distinguishes those explanations?
4. What important variable did the Agent or I overlook?
5. What decision should change because of that evidence?
6. What new check prevents the same reasoning failure from recurring?

That is the operating model behind this case study.
