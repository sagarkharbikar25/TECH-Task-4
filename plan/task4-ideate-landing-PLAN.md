# Task 4: Ideate Landing Page (100 pts)

**Repo name:** `techfest-ca-ideate-landing`
**Live URL (target):** `techfest-ca-ideate-landing.vercel.app`
**Stack:** React (Vite) · Tailwind CSS · Framer Motion · Node.js · Express · Vercel · Figma (wireframes)
**Estimated time:** ~1 day

> This reads like a concept-and-design task. Confirm in the official brief whether they want a design document, a Figma file, a built page, or all three, plus judging criteria and deadline. Adjust this plan accordingly.

---

## 1. Approach

The score likely depends on the **quality of the idea and the thinking behind the page**, not just the visuals. So the work is split into: idea → strategy → copy → wireframes → build → documentation.

### Step 1: Pick a specific idea
A narrow, real problem beats a generic one. Candidate directions (pick one and commit):

| Idea | Audience | Why it works |
|---|---|---|
| Hackathon team-finder | College students | Real pain point, you've lived it |
| Campus ambassador task tracker | CA program participants | Relevant to Techfest itself |
| Resume-to-portfolio generator | Students and freshers | Clear value, easy to explain |
| Local event discovery for college fests | Students | Tied to the Techfest theme |

Pick one you can describe in a sentence.

### Step 2: Value proposition
Fill in:
> For **[audience]** who **[problem]**, **[product]** is a **[category]** that **[key benefit]**, unlike **[alternative]**.

### Step 3: Page strategy
- **Primary conversion goal:** one only (e.g. waitlist signup)
- **Secondary goal:** e.g. share link
- **Visitor questions to answer in order:** What is it? Is it for me? How does it work? Why should I trust it? What do I do next?

### Step 4: Page structure
1. Navbar
2. Hero: value proposition, subtext, CTA, product visual or mockup
3. Problem: 3 pain points
4. Solution: 3 key features
5. How it works: 3 steps
6. Use cases or social proof (use honest placeholders such as "early tester feedback", not fake testimonials)
7. FAQ: 4 to 5 questions
8. Final CTA
9. Footer

### Step 5: Write the real copy first
No lorem ipsum. Write headlines and body text in a doc before touching Figma or code.

### Step 6: Wireframes (Figma)
- Low-fidelity: boxes and text, mobile and desktop
- Mid-fidelity: spacing, typography, color, component states
- Mini style guide: palette, 2 fonts, button styles, card style
- Share as a view-only Figma link and export key frames as PNG for the README

### Step 7: Build
React page that matches the mid-fi design. Backend is thin, matching the other tasks.

### Step 8: Document the thinking
A short "Design Rationale" section in the README (below).

---

## 2. Architecture

| Endpoint | Purpose |
|---|---|
| `GET /api/health` | Health check |
| `POST /api/signup` | Validates email, rate limited, stores in memory / logs |

### Folder structure
```
techfest-ca-ideate-landing/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/    Button, FeatureCard, StepCard, FaqItem, SignupForm
│   │   ├── sections/      Navbar, Hero, Problem, Solution, HowItWorks, UseCases, Faq, FinalCta, Footer
│   │   ├── lib/           api.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── design/
│   ├── wireframes/        exported PNGs
│   ├── copy.md            all page copy
│   └── rationale.md       strategy and decisions
├── api/
│   └── index.js
├── vercel.json
├── package.json
├── .env.example
└── README.md
```

Including `design/` in the repo shows the process, which this task likely rewards.

### `api/index.js`
```js
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", rateLimit({ windowMs: 60_000, max: 20 }));

const signups = [];
const schema = z.object({ email: z.string().trim().email().max(120) });

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/signup", (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: "Invalid email" });
  signups.push({ ...parsed.data, at: Date.now() });
  res.status(201).json({ ok: true });
});

export default app;
```

### `vercel.json`
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Root `package.json`: `"type": "module"`, deps `express`, `cors`, `express-rate-limit`, `zod`.

---

## 3. Build Checklist

- [ ] Idea chosen, audience and value proposition written
- [ ] Quick competitor scan: 3 to 5 similar landing pages, note what works and what doesn't
- [ ] Page strategy and conversion goal defined
- [ ] All section copy written in `design/copy.md`
- [ ] Low-fi wireframes (mobile + desktop)
- [ ] Mid-fi design with style guide in Figma
- [ ] Create repo, scaffold Vite + Tailwind, commit `chore: scaffold`
- [ ] Build sections to match the design
- [ ] Signup form wired to `POST /api/signup`, with loading, error, and success states
- [ ] Responsive pass: 360px, 768px, 1280px+
- [ ] Accessibility and Lighthouse check
- [ ] Add `design/` folder (wireframes, copy, rationale)
- [ ] Deploy to Vercel, test live
- [ ] README with design rationale
- [ ] Submit on ca.techfest.org (include the Figma link if accepted)

---

## 4. Risks

| Risk | Mitigation |
|---|---|
| Generic idea | Choose a narrow niche and defend it in the rationale |
| Pretty page, weak reasoning | Write the rationale doc and keep copy specific |
| Fake social proof | Use honest placeholders, don't invent testimonials |
| Spending too long in Figma | Timebox wireframes to 2 to 3 hours |

---

## 5. Definition of Done

- Clear idea with a one-line value proposition
- Real copy, wireframes, and a deployed page matching the design
- README that explains the reasoning (audience, goal, decisions, A/B ideas)

---

## 6. README Skeleton

```md
# <Product Name>: Landing Page

Techfest CA Program, Web Development, Task 4.

**Live:** https://techfest-ca-ideate-landing.vercel.app
**Design:** <Figma view-only link>

## The Idea
<one-line value proposition>

## Target User
<who, and their pain point>

## Conversion Goal
<primary action and why>

## Design Rationale
- Why this section order
- Why this headline and CTA
- Color and typography choices
- Mobile-first decisions

## What I Would A/B Test
- Headline variants
- CTA wording and placement
- Hero visual vs. product demo video

## Preview
<screenshots + wireframe images>

## Stack
React (Vite) · Tailwind · Framer Motion · Express · Vercel

## Run locally
npm install && cd client && npm install
npm run dev
```
