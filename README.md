# SYNAPSE 2026: Quantum Techfest Landing Platform

Techfest CA Program, Web Development, Task 4 (Ideate Landing Page — 100 pts).

* **Live Target:** https://techfest-ca-ideate-landing.vercel.app
* **Design Wireframes:** [desktop-wireframe.svg](file:///d:/GitHub/TECH-Task-4/design/wireframes/desktop-wireframe.svg) · [mobile-wireframe.svg](file:///d:/GitHub/TECH-Task-4/design/wireframes/mobile-wireframe.svg)
* **Design Rationale:** [rationale.md](file:///d:/GitHub/TECH-Task-4/design/rationale.md)
* **Copy Deck:** [copy.md](file:///d:/GitHub/TECH-Task-4/design/copy.md)

---

## The Idea

**SYNAPSE 2026** is Asia's apex sci-fi collegiate technology festival platform that combines visceral flagship combat arenas (Robowars, Autonomous Drone Swarms, Quantum Cryptography) with an algorithmic **Neural Teammate Matcher**, enabling over 50,000 college students to discover interdisciplinary squadmates and secure operative access credentials.

> *For engineering students, developers, and robotics builders who struggle with fragmented college hackathon team-finding, SYNAPSE is an immersive collegiate techfest platform that pairs complementary skills and unlocks verified access passes, unlike generic registration forms.*

---

## Target User

* **Audience:** Undergraduate, postgraduate, and PhD engineering scholars, hardware tinkerers, hackathon coders, and startup founders.
* **Core Pain Points:**
  * Last-minute scramble and ghosting on WhatsApp/Discord groups when building hackathon teams.
  * Mismatched skill distribution (e.g. 4 frontend devs with no hardware/AI engineer).
  * Lack of clear arena specifications and real-time prize pool visibility.

---

## Conversion Goal

* **Primary Conversion Goal:** Operative Access Pass Registration via `POST /api/signup` (validated with Zod, rate-limited, and recorded in a real-time participant ledger).
* **Secondary Goal:** Interactive squad formation through the **Neural Teammate Matcher**.

---

## Design Rationale

* **Color Palette Identity:** Strictly based on reference **Combo 05**:
  * **Primary Velvet Plum (`#381932`):** Luxurious deep velvet tone providing cosmic depth without resorting to plain black.
  * **Warm Milk / Cream (`#FFF3E6`):** Soft, celestial off-white providing eye-friendly, WCAG AAA compliant contrast for typography and card outlines.
  * **Electric Cyan (`#00F0FF`) & Neon Violet (`#9D4EDD`):** Active data channels and energy matrices.
* **Kinetic Preloader:** Monospace 0% → 100% glitch text countdown with dual-curtain clip-path GSAP reveal.
* **3D Procedural WebGL Canvas:** Interactive icosahedron quantum crystal core with 1,200 floating star particles reacting to cursor coordinates via lerped quaternion tilt.
* **Scroll Architecture:** Lenis virtual smooth-scrolling synchronized with GSAP ScrollTrigger ticker.
* **Pinned Horizontal Marquee:** Locks vertical scroll to scrub through flagship combat categories before releasing standard page flow.
* **Cursor-Delta Glow (Bento Box):** Asymmetrical CSS grid cards calculating mouse distance to cast dynamic radial-gradient neon borders.

---

## What I Would A/B Test

1. **Headline Framing:**
   * *Variant A (Current):* "TRANSCEND THE QUANTUM GRID" (Visionary sci-fi appeal).
   * *Variant B:* "₹25,00,000+ PRIZE POOL // FORM YOUR WINNING SQUAD" (Financial and competitive hook).
2. **Registration Funnel Friction:**
   * *Variant A:* Inline university email input in Hero + Final CTA.
   * *Variant B:* Direct multi-step interactive modal pass selector.
3. **Hero Canvas vs. Video Hero:**
   * *Variant A:* 60 FPS Three.js procedural WebGL quantum core.
   * *Variant B:* 30-second 4K cinematic battlebot sizzle reel with canvas fallback.

---

## Architecture & File Map

```
TECH-Task-4/
├── api/
│   └── index.js             # Express backend with Zod validation & rate-limiting
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/
│   │   │   │   └── HeroCanvas.tsx           # Three.js / R3F Quantum Core
│   │   │   ├── animation/
│   │   │   │   ├── CustomPreloader.tsx      # GSAP Glitch Scramble Loader
│   │   │   │   └── SmoothScrollProvider.tsx # Lenis Virtual Scroll Wrapper
│   │   │   ├── sections/
│   │   │   │   ├── Navbar.tsx               # Floating Glassmorphic HUD
│   │   │   │   ├── HeroSection.tsx          # 3D Hero & Telemetry Bar
│   │   │   │   ├── FlagshipPinSection.tsx   # GSAP ScrollTrigger Pinned Track
│   │   │   │   ├── BentoGridSection.tsx     # Cursor-Glow Bento Grid
│   │   │   │   ├── InteractiveTeammateMatcher.tsx # Squad Compatibility Tool
│   │   │   │   ├── SpeakerLineupSection.tsx # Keynotes Stage
│   │   │   │   ├── FaqSection.tsx           # Logistics Accordion
│   │   │   │   ├── FinalCtaSection.tsx      # Matrix Portal Banner
│   │   │   │   └── Footer.tsx               # Cyberpunk Telemetry Footer
│   │   │   └── ui/
│   │   │       ├── BentoCard.tsx            # Mouse-Tracking Glow Card
│   │   │       ├── RegistrationModal.tsx    # Confetti-Enabled Pass Modal
│   │   │       ├── SectionTransitionDivider.tsx # Inter-Sector Laser Scan Transition
│   │   │       └── ScrollSectorTracker.tsx  # Fixed Edge Sector Navigation Rail
│   │   ├── hooks/
│   │   │   ├── useMouseCoords.ts            # Normalized Coordinate Tracker
│   │   │   └── useTechfestScrollMotion.ts   # Z-Axis Stacking, Staggers & Parallax
│   │   ├── lib/
│   │   │   └── api.ts                       # Backend fetcher with offline fallback
│   │   ├── App.tsx                          # Root Orchestrator
│   │   ├── main.tsx
│   │   └── index.css                        # Tailwind v4 & Cyber Grid Theme
│   ├── vite.config.ts
│   └── package.json
├── design/
│   ├── copy.md                              # Complete production copy deck
│   ├── rationale.md                         # Strategy, psychology, and UX rationale
│   └── wireframes/
│       ├── desktop-wireframe.svg            # Desktop Layout Blueprint
│       └── mobile-wireframe.svg             # Mobile Layout Blueprint
├── plan/
│   ├── task4-ideate-landing-PLAN.md
│   └── PHASE-EXECUTION-PLAN.md
├── vercel.json
├── package.json                             # Monorepo orchestration scripts
├── .env.example
└── README.md
```

---

## Stack

* **Frontend:** React 19 · Vite 8 · TypeScript · Tailwind CSS v4
* **3D & Creative WebGL:** Three.js · React Three Fiber (`@react-three/fiber`)
* **Motion & Physics:** GSAP (`gsap`) · ScrollTrigger · Lenis Smooth Scroll
* **Backend:** Node.js · Express · Zod (`zod`) · Express Rate Limit
* **Tactile Micro-interactions:** Canvas Confetti · Lucide Icons

---

## Run Locally

```bash
# 1. Install root dependencies
npm install

# 2. Install client dependencies
cd client && npm install

# 3. Launch both backend API (port 5000) & Vite frontend (port 5173)
cd ..
npm run dev:all

# Alternatively, run frontend standalone:
cd client
npm run dev
```

Visit **`http://localhost:5173`** in your browser.
