# SYNAPSE 2026 // Design Strategy & Rationale

> **Project:** Task 4 Ideate Landing Page  
> **Brand Identity:** Deep Plum (`#381932`) & Milk (`#FFF3E6`) Sci-Fi Quantum Convergence  
> **Target Audience:** College students, developers, robotics enthusiasts, and techfest participants.

---

## 1. Visual Identity & Color Psychology

From the reference specification (**Combo 05**):
* **Primary Velvet Plum (`#381932`):** Rather than standard generic sci-fi pure black or neon green, Plum provides a regal, luxurious depth. It feels tactile, mysterious, and high-tech—evoking deep-space quantum mechanics and premium collegiate prestige.
* **Warm Milk / Cream (`#FFF3E6`):** Provides warm, celestial contrast against the deep plum and void base (`#08080C`). Unlike harsh pure white (`#FFFFFF`) which causes eye strain in dark interfaces, Milk softens the optical intensity while preserving high legibility (WCAG AAA compliant).
* **Luminous Accents:**
  * **Electric Cyan (`#00F0FF`):** Symbolizes active data channels, WebGL wireframe matrices, and high-priority interactive touchpoints.
  * **Vivid Violet (`#9D4EDD`):** Bridges the velvet plum background with glowing neon highlights, creating depth through chromatic harmony.
  * **Warm Apricot (`#E69D67`):** Highlights prize amounts and marquee achievements.

---

## 2. Section Ordering & Conversion Funnel Logic

Visitors evaluate collegiate techfest landing pages through 5 progressive questions:
1. **What is this and why should I care?**  
   → *Hero Section:* High-impact 3D rotating quantum core, dynamic split headline, clear value proposition, and instant single-input registration.
2. **What are the marquee attractions?**  
   → *Flagship Corridors (Pinned Horizontal Scrub):* Locks scroll vertically to showcase flagship events (Robowars, Hackathons, Drone Racing) with clear prize allocations.
3. **What else can I participate in?**  
   → *Bento Grid Sector Hub:* Asymmetrical multi-column layout allowing rapid scanning of workshops, exhibitions, and venture pitches.
4. **Who will I build with?**  
   → *Neural Teammate Matcher:* Solves the major barrier to entry for college hackathons—finding complementary teammates across design, code, and hardware.
5. **Why should I trust this festival?**  
   → *Keynote Speakers & Protocol FAQ:* Credible global industry speakers, institutional prestige, and clear logistical transparency.
6. **What do I do next?**  
   → *Final Call CTA:* High-urgency plum-and-milk contrast portal with single-click pass reservation.

---

## 3. Micro-Interactions & Animation Architecture

* **Kinetics Preloader:** Simulates asset hydration with a monospace glitch counter (0% → 100%) and terminates with a curtain clip-path exit.
* **Procedural 3D WebGL Canvas:** The icosahedron core rotates continuously on its own, but responds to normalized mouse coordinates `[-1, 1]` with smooth lerping.
* **Cursor-Delta Glow (Bento Cards):** Uses real-time mouse position relative to card boundaries to render dynamic radial spotlights that highlight borders as users explore.
* **Smooth Scrolling (Lenis + GSAP ScrollTrigger):** Virtual scrolling harmonized with GSAP tickers ensures zero jitter when transitioning into pinned horizontal tracks.

---

## 4. A/B Testing Hypotheses

1. **Hero Headline Variant:**
   * *Variant A (Current):* "TRANSCEND THE QUANTUM GRID" (Atmospheric, visionary)
   * *Variant B:* "ASIA'S LARGEST COLLEGE TECH BATTLES // ₹25L+ PRIZE MATRIX" (Direct monetary incentive)
2. **CTA Mechanics:**
   * *Variant A:* Inline university email input + Claim Pass button
   * *Variant B:* Floating fixed button that opens the 3-step squad selector modal directly
3. **Interactive Visual:**
   * *Variant A (Current):* Three.js procedural particle core
   * *Variant B:* 30-second looping video sizzle reel of live Robowars combat
