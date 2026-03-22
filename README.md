# GTM Signal - azx-signal

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Firecrawl](https://img.shields.io/badge/Firecrawl-orange?style=flat-square)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel)

**Live demo:** https://azx-signal.vercel.app

---

Most prospect research is manual, stale, and generic by the time it reaches a strategist. GTM Signal replaces that process with a real-time intelligence pipeline — scraping live public signals about any target company and returning a grounded transformation brief that a senior operator could walk into a board meeting with.

---

## What it produces

| Output | Description |
|--------|-------------|
| **Hidden Failure** | The structural breakdown public statements don't name but signals reveal |
| **Why AI Stalls** | The incentive misalignment that kills transformation before it scales |
| **Coordination Gap** | The exact handoff where information degrades and cost accumulates |
| **Opening Question** | One sentence that reframes how leadership sees their own operations |

---

## Architecture
```
Company + Vertical
        ↓
Firecrawl — 4 parallel scrapes
  ├── Recent news signals
  ├── Hiring pattern signals
  ├── Press release signals
  └── Company structure signals
        ↓
OpenAI gpt-4o-mini — grounded reasoning over real data
        ↓
Server-sent events — streams to UI in real time
        ↓
4-screen intelligence brief
```

The output is different every time because it pulls from what the company actually said and did publicly. Not a prompt wrapper. A pipeline.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14, App Router, TypeScript |
| Scraping | Firecrawl — parallel web intelligence |

