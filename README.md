# Human-AI Evidence-Driven Web Operations Case Study

> De-identified portfolio case study of a real multilingual B2B website project: how a human operator used AI agents, experiments, logs and deterministic checks to make decisions without treating AI conclusions as truth.

## What this project is actually about

This was not a project where I started with a perfect Agent governance architecture.

I started with practical website problems, let AI agents help inspect and modify the site, watched them make mistakes, disagreed with some of their recommendations, and gradually learned which evidence should be trusted before making the next decision.

The most important pattern became:

```text
Observe a problem
      ↓
Form candidate explanations
      ↓
Find the evidence that can distinguish them
      ↓
Identify overlooked variables
      ↓
Change the implementation or validation rule
      ↓
Measure again
```

The logs matter because they preserve *why* a decision changed, not just what files were edited.

## One concrete example: 13 seconds was not a hosting problem

The original mobile homepage took roughly **13.10 seconds** for the main first-screen content to become the Largest Contentful Paint.

The site used **Smart Slider 3** because the owner wanted the homepage to feel visually rich rather than static.

Instead of immediately blaming hosting, an isolated test page changed one major variable: the first-screen slider was replaced with a lightweight static hero while the rest of the page stayed comparable.

```text
Mobile LCP
13.10s  →  3.16s  →  2.72s production
baseline    isolated    redesigned release
```

That evidence changed the decision.

The solution was not simply “remove all visual design.” The production homepage kept the background, logo, copy, CTA, responsive layout and visual rhythm, while removing the heavy slider runtime. Lightweight interaction ideas were tested separately so experiments could not be confused with production releases.

This is the kind of log that matters: one that changes the causal explanation and therefore changes the implementation path.

## Logs are loaded like evidence, not dumped into context

The original project accumulated many Lighthouse runs, raw HTML files, screenshots, JSON checks, stderr files and rollback snapshots.

Those raw files are necessary evidence, but they are not all equally informative.

I now organize them conceptually like this:

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

See [`examples/evidence-map.example.json`](examples/evidence-map.example.json).

## High-information cases

### 1. Performance

**Phenotype:** mobile first-screen ≈ 13 seconds.

**High-information evidence:** changing only the heavy first-screen slider reduced LCP from 13.10s to 3.16s.

**Overlooked variable:** first-screen interaction architecture mattered more than hosting alone.

**Decision:** rebuild the first screen as a lightweight hero. Production LCP reached approximately 2.72s.

### 2. Multilingual false completion

**Phenotype:** an AI-assisted release was described as multilingual-complete.

**High-information evidence:** URLs, H1 and hreflang existed across languages, but equivalent pillar DOM existed in only one language.

**Overlooked variable:** surface coverage was mistaken for equivalent rendered content.

**Decision:** require per-language anonymous DOM validation before multilingual completion can PASS.

### 3. Product truth drift

**Phenotype:** visible product content was updated, while older FAQ / machine-readable data still contained obsolete values.

**Overlooked variable:** one engineering fact had multiple representations.

**Decision:** owner-confirmed data became the highest product truth source, and derived representations were validated together.

### 4. Search-engine reality check

**Phenotype:** local/public QA looked healthy, but first-party Search Console data showed legacy URL behavior that still needed repair.

**High-information evidence:** 32 redirected URLs were reviewed; 14 clear legacy equivalents were incorrectly falling back to a homepage.

**Decision:** Search Console became an engineering input, not only a reporting dashboard.

### 5. Experiment ≠ production

A scroll-reveal concept existed on an isolated `noindex` test page. At the same checkpoint, production did not contain the test marker.

**Decision:** an experiment cannot be described as shipped without explicit release evidence.

### 6. Human hypothesis vs Agent optimization target

The Agent optimized for a production-safe Rich Results policy: no fabricated Offer, price, review or rating fields, and no unsupported Product implementation.

I still had a different, untested question:

> What if only one product became an experimental group with stronger visible FAQ and semantic clarity, while other products stayed unchanged, and I later compared GSC / AI-search visibility?

That experiment has **not been executed** and has **no result yet**.

I keep it in the case study because it shows that production safety and experimental information gain are different objective functions. Human-AI collaboration includes disagreement, not only delegation.

## My role

I acted as the human operator between business context, the public website, AI agents and external evidence.

I was responsible for:

- deciding which problem was worth solving first;
- deciding which facts were authoritative;
- separating confirmed facts from hypotheses;
- deciding whether an Agent recommendation should be accepted, rejected or tested;
- reviewing public output before release;
- using logs to identify overlooked variables;
- turning important failures into reusable validation rules.

AI agents were used for high-volume reading, comparison, implementation drafts, script generation, structured checks and evidence collection.

## Technical stack

- **WordPress**
- **Rank Math**
- **Polylang**
- **Breeze cache**
- **Smart Slider 3**
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

## AIO in plain language

AIO in this project means reducing how much a search engine or AI system has to guess.

Examples:

- **H1**: clearly state what the page is mainly about.
- **HTML product information**: do not hide important facts only inside images or PDFs.
- **hreflang / canonical**: tell search engines how language versions and preferred URLs relate.
- **Schema.org**: a shared vocabulary for describing things such as an Article or Organization.
- **JSON-LD**: one machine-readable format for expressing that vocabulary.
- **GSC**: first-party evidence of how Google is actually discovering, indexing and routing the site.

None of these guarantees rankings or AI citations. They are technical conditions that make information more consistent and inspectable.

## Why not add every possible Product schema field?

The project tested Product / ProductModel structured data, but the public B2B pages did not expose verified Offer, price, inventory, review or rating data.

The production-safe policy became:

> Do not invent a field just to make a machine validator happy.

Unsupported Product / ProductModel rich-result implementation was removed rather than filled with fabricated commercial data.

See [`docs/aio-governance.md`](docs/aio-governance.md) for the distinction between this production policy and the still-unvalidated single-product experiment hypothesis.

## Representative incidents

The incident reviews focus on overlooked variables rather than a chronological dump of every edit:

- a performance bottleneck incorrectly attributed to infrastructure;
- multilingual completion generalized from one language;
- logged-in WordPress output differing from anonymous cache;
- updated product truth not propagating into FAQ / structured data;
- local PASS being challenged by Search Console evidence;
- a test page being distinguishable from production;
- an earlier PASS being overturned by stronger later evidence.

See [`docs/incidents.md`](docs/incidents.md).

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
├── logs/
│   └── README.md
└── scripts/
    └── verify-release-gate.example.js
```

## What was intentionally removed

This public version removes or generalizes:

- client identity and contact details;
- private business context;
- backend credentials and operational paths;
- raw crawls and identifiable screenshots;
- unpublished engineering facts;
- internal WordPress IDs;
- raw work logs that contain client-specific material.

The public repo keeps the *decision structure* and representative evidence patterns instead of exposing the client workspace.

## Takeaway

The useful skill I developed was not “asking AI to optimize a website.”

It was learning to ask:

1. What is the observed problem?
2. Which variables could explain it?
3. Which log actually distinguishes those explanations?
4. What important variable did the Agent or I overlook?
5. What decision should change because of that evidence?
6. What new check prevents the same reasoning failure from recurring?

That is the operating model behind this case study.
