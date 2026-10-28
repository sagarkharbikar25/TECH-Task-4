import { useEffect, useRef, useState, type FC } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const SCRAMBLE_CHARS = "0101_#$!%&X*[]<>";

const STATUS_PHRASES = [
  "INITIALIZING QUANTUM CORE...",
  "CALIBRATING NEON MATRIX...",
  "SYNCING SUB-DIMENSIONAL EVENT DATA...",
  "ACTIVATING PLUM & MILK SHIELDING...",
  "NEURAL SYNC COMPLETE. WELCOME TO SYNAPSE."
];

export const CustomPreloader: FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLParagraphElement>(null);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterObj = { val: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.timeline({
            onComplete: () => {
              if (containerRef.current) containerRef.current.style.display = "none";
              onComplete();
            }
          })
          .to(statusTextRef.current, { opacity: 0, y: -20, duration: 0.3 })
          .to(counterTextRef.current, { opacity: 0, scale: 1.1, duration: 0.4 }, "<")
          .to([curtainLeftRef.current, curtainRightRef.current], {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.1,
            stagger: 0.08,
            ease: "expo.inOut"
          });
        }
      });

      tl.to(counterObj, {
        val: 100,
        duration: 2.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const current = Math.floor(counterObj.val);
          setCounter(current);

          const phraseIndex = Math.min(
            Math.floor((current / 100) * STATUS_PHRASES.length),
            STATUS_PHRASES.length - 1
          );

          if (statusTextRef.current) {
            const rawPhrase = STATUS_PHRASES[phraseIndex];
            const scrambled = rawPhrase
              .split("")
              .map((char) =>
                Math.random() < 0.2
                  ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
                  : char
              )
              .join("");
            statusTextRef.current.innerText = scrambled;
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-auto bg-[#08080C]"
    >
      {/* Dual Curtain Split for Reveal */}
      <div
        ref={curtainLeftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#130715] border-r border-[#FFF3E6]/10"
      />
      <div
        ref={curtainRightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#130715] border-l border-[#FFF3E6]/10"
      />

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      {/* Content HUD */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-5 text-center select-none px-4">
        {/* Gemini Logo */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#00F0FF]/40 p-[1.5px] bg-gradient-to-br from-[#381932] via-[#9D4EDD] to-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.4)] animate-pulse">
          <img src="/logo.jpg" alt="SYNAPSE 2026 Emblem" className="w-full h-full object-cover rounded-xl" />
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.35em] text-[#00F0FF] uppercase border border-[#00F0FF]/30 px-4 py-1.5 rounded-full bg-[#00F0FF]/5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span>SYS.CONNECT // SYNAPSE 2026</span>
        </div>

        {/* Counter Display */}
        <div className="flex items-baseline space-x-2 font-mono">
          <span
            ref={counterTextRef}
            className="text-7xl sm:text-9xl font-black tracking-tighter text-[#FFF3E6] drop-shadow-[0_0_35px_rgba(157,78,221,0.5)]"
          >
            {counter.toString().padStart(3, "0")}
          </span>
          <span className="text-2xl text-[#9D4EDD] font-bold">%</span>
        </div>

        {/* Scrambled Status Line */}
        <p
          ref={statusTextRef}
          className="font-mono text-xs sm:text-sm tracking-widest text-[#FFF3E6]/75 uppercase h-6 w-72 sm:w-96 truncate"
        >
          INITIALIZING CORE...
        </p>

        {/* Progress bar line */}
        <div className="w-56 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00F0FF] via-[#9D4EDD] to-[#FFF3E6] transition-all duration-75"
            style={{ width: `${counter}%` }}
          />
        </div>

        {/* Branding Credit */}
        <div className="pt-4 font-mono text-[10px] tracking-[0.2em] text-[#FFF3E6]/40 uppercase">
          POWERED BY TECHFEST ARCHITECTURE // PLUM &amp; MILK THEME
        </div>
      </div>
    </div>
  );
};
