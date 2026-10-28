import { useEffect, useRef, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  fromSector?: string;
  toSector?: string;
  label: string;
}

export const SectionTransitionDivider: FC<SectionDividerProps> = ({
  fromSector = "01",
  toSector = "02",
  label,
}) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!dividerRef.current || !pillRef.current || !lineRef.current) return;

      // Animate divider expansion and glow on scroll trigger
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0.2, opacity: 0.3 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        pillRef.current,
        { scale: 0.85, opacity: 0, y: 15 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 85%",
          },
        }
      );
    }, dividerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={dividerRef}
      className="relative w-full py-10 sm:py-14 flex flex-col items-center justify-center overflow-hidden z-20 pointer-events-none select-none"
    >
      {/* Central Expanding Laser Guideline */}
      <div
        ref={lineRef}
        className="relative w-full max-w-6xl h-[1.5px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent flex items-center justify-center will-change-transform"
      >
        {/* Animated Laser Pulse traveling continuously across */}
        <div className="absolute top-0 left-0 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-laser-scan shadow-[0_0_15px_#00F0FF]" />
        <div className="absolute top-0 right-0 w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#9D4EDD] to-transparent animate-laser-scan delay-700 shadow-[0_0_15px_#9D4EDD]" />
      </div>

      {/* Center Interactive Telemetry Pill */}
      <div
        ref={pillRef}
        className="relative -mt-3.5 px-4 py-1 rounded-full bg-[#08080C] border border-[#00F0FF]/35 shadow-[0_0_20px_rgba(0,240,255,0.25)] flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] text-[#FFF3E6] uppercase backdrop-blur-xl"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
        <span className="text-[#00F0FF] font-bold">SEC.{fromSector} // SEC.{toSector}</span>
        <span className="text-white/30">|</span>
        <span className="text-[#FFF3E6]/75">{label}</span>
      </div>
    </div>
  );
};
