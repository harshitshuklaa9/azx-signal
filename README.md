# AZX Signal — Transformation Intelligence

AZX Signal is a public-facing interactive marketing experience for AZX, an AI transformation consultancy working with enterprises in energy, utilities, logistics, and real estate. Enter a company name and sector, and the platform generates a transformation intelligence brief — surfacing the operational failures, organizational blockers, and coordination gaps that AZX identifies before walking into any engagement. The experience unfolds across four full-viewport screens, ending with the single question AZX uses to open the room.

## Setup

```bash
npm install
```

Create a `.env.local` file in the project root:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
vercel deploy
```

Add `OPENAI_API_KEY` as an environment variable in your Vercel project settings before deploying.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenAI gpt-4o-mini

---

Built as AZX GTM Engineer application by Harshit Shukla
