import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useTechfestScrollMotion
 * Implements IIT Bombay Techfest-inspired motion architecture:
 * 1. Z-axis Panel Scaling & Stacking transitions between major sections
 * 2. Staggered grid content reveals (y: 30px -> 0, blur: 8px -> 0)
 * 3. Kinetic parallax background depth for watermarks and floating wireframes
 */
export const useTechfestScrollMotion = () => {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Z-Axis Panel Stacking & Receding Transitions
      const panels = gsap.utils.toArray<HTMLElement>(".techfest-panel");
      panels.forEach((panel, i) => {
        // Skip last panel from receding
        if (i < panels.length - 1) {
          const nextPanel = panels[i + 1];
          gsap.to(panel, {
            scale: 0.95,
            opacity: 0.45,
            y: -40,
            filter: "blur(4px)",
            ease: "none",
            scrollTrigger: {
              trigger: nextPanel,
              start: "top 85%",
              end: "top 15%",
              scrub: 1.2,
            },
          });
        }
      });

      // 2. Universal Staggered Card & Grid Reveals
      const staggerGroups = [
        { trigger: ".bento-grid-container", targets: ".bento-card-reveal" },
        { trigger: "#speakers .grid", targets: ".speaker-card-reveal" },
        { trigger: "#faq .flex-col", targets: ".faq-row-reveal" },
      ];

      staggerGroups.forEach((group) => {
        const triggerEl = document.querySelector(group.trigger);
        if (triggerEl) {
          gsap.fromTo(
            group.targets,
            {
              opacity: 0,
              y: 32,
              filter: "blur(8px)",
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: triggerEl,
                start: "top 82%",
                once: false,
              },
            }
          );
        }
      });

      // 3. Kinetic Parallax Background Elements (Different Speeds)
      gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((el) => {
        gsap.to(el, {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax-fast").forEach((el) => {
        gsap.to(el, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Refresh ScrollTrigger instances
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);
};
