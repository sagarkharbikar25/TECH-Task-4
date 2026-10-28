import { useState, useEffect, useRef, type FC, type FormEvent } from "react";
import { HeroCanvas } from "../3d/HeroCanvas";
import { submitRegistration } from "../../lib/api";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import gsap from "gsap";

interface HeroSectionProps {
  onOpenRegister: () => void;
  registeredCount: number;
  onRegisteredCountUpdate: (count: number) => void;
}

export const HeroSection: FC<HeroSectionProps> = ({
  onOpenRegister,
  registeredCount,
  onRegisteredCountUpdate,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Split-character stagger animation on entrance & Parallax scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Staggered entrance for split characters
      tl.fromTo(
        ".hero-char-1",
        { opacity: 0, y: 50, rotateX: -45, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.03,
          ease: "power3.out",
        }
      )
      .fromTo(
        ".hero-char-2",
        { opacity: 0, y: 60, scale: 0.8, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.035,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        [formRef.current, buttonsRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" },
        "-=0.3"
      );

      // Parallax & Exit transition: text slides and gently recedes on scroll down
      gsap.to(".hero-parallax-text", {
        y: -140,
        opacity: 0.2,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Background ambient flares parallax (slower movement)
      gsap.to(".hero-parallax-bg", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  const handleQuickSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await submitRegistration({ email, category: "Hero Direct Access" });
      if (res.ok) {
        setSuccess(true);
        if (res.totalSignups) onRegisteredCountUpdate(res.totalSignups);
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#00F0FF", "#9D4EDD", "#FFF3E6", "#E69D67"],
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="techfest-panel relative min-h-screen flex flex-col justify-between pt-36 sm:pt-44 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#08080C] will-change-transform origin-top"
    >
      {/* 1. Full-Viewport Centered 3D WebGL Canvas Backdrop */}
      <HeroCanvas />

      {/* Kinetic Parallax Watermark Text */}
      <div className="parallax-slow absolute top-1/4 left-1/2 -translate-x-1/2 font-mono text-[14vw] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0 leading-none">
        SYNAPSE // 2026
      </div>

      {/* Ambient Gradient Flares */}
      <div className="hero-parallax-bg absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-[#381932]/45 via-[#9D4EDD]/20 to-transparent blur-[160px] pointer-events-none z-0" />
      <div className="hero-parallax-bg absolute top-16 left-12 w-80 h-80 bg-[#00F0FF]/15 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* 2. Overlaid High-Impact Central Typography & HUD */}
      <div className="hero-parallax-text relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center gap-7 pointer-events-auto">
        {/* Eyebrow Badge with Brand Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-[#00F0FF]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.25)]">
          <img src="/logo.jpg" alt="Logo" className="w-4 h-4 rounded-full object-cover" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#FFF3E6] uppercase">
            SYNAPSE 2026 // ANNUAL TECHFEST CONVERGENCE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
        </div>

        {/* Display Typography with Entrance Animation Refs */}
        <div className="flex flex-col items-center gap-2">
          <h1
            ref={titleLine1Ref}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#FFF3E6] font-mono leading-[1.04] drop-shadow-[0_0_35px_rgba(255,243,230,0.25)] flex flex-wrap justify-center overflow-hidden"
          >
            {"TRANSCEND THE".split("").map((c, i) => (
              <span
                key={i}
                className="hero-char-1 inline-block will-change-transform"
                style={{ whiteSpace: c === " " ? "pre" : "normal" }}
              >
                {c}
              </span>
            ))}
          </h1>
          <h1
            ref={titleLine2Ref}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight font-mono leading-[1.04] bg-gradient-to-r from-[#FFF3E6] via-[#9D4EDD] to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(157,78,221,0.7)] flex flex-wrap justify-center overflow-hidden"
          >
            {"QUANTUM GRID".split("").map((c, i) => (
              <span
                key={i}
                className="hero-char-2 inline-block will-change-transform"
                style={{ whiteSpace: c === " " ? "pre" : "normal" }}
              >
                {c}
              </span>
            ))}
          </h1>

          <p
            ref={subtextRef}
            className="max-w-2xl mx-auto text-sm sm:text-base text-[#FFF3E6]/80 font-light leading-relaxed pt-3 px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            Asia&apos;s apex collegiate technology festival. 3 days of high-velocity autonomous battlebots, quantum cryptographic hackathons, drone swarms, and biomechanical intelligence.
          </p>
        </div>

        {/* 3. Quick Email Registration Bar (Completely isolated container to prevent overlap) */}
        <div ref={formRef} className="w-full max-w-md mx-auto pt-2">
          {success ? (
            <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF] font-mono text-xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>ACCESS GRANTED // TELEMETRY LOGGED ON GRID</span>
            </div>
          ) : (
            <form onSubmit={handleQuickSignup} className="relative flex items-center w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter university email to join waitlist..."
                className="w-full py-4 pl-5 pr-36 rounded-2xl bg-[#110714]/85 border border-white/20 text-[#FFF3E6] placeholder-white/35 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] backdrop-blur-2xl transition-all shadow-xl"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#9D4EDD] text-[#08080C] font-mono text-xs font-bold tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>{isSubmitting ? "..." : "JOIN GRID"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* 4. Action Buttons (Clean vertical clearance, no collision) */}
        <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <button
            onClick={onOpenRegister}
            className="px-8 py-3.5 rounded-xl bg-[#FFF3E6] hover:bg-[#00F0FF] text-[#08080C] font-mono text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(255,243,230,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] active:scale-95"
          >
            CLAIM OPERATIVE PASS →
          </button>
          <a
            href="#flagships"
            className="px-8 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#FFF3E6] border border-white/15 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300"
          >
            EXPLORE ARENAS ↓
          </a>
        </div>
      </div>

      {/* 5. Floating Bottom Telemetry Stats Bar */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-16 sm:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-[#110714]/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
          <div className="space-y-1 border-r border-white/10 pr-4 last:border-0">
            <span className="font-mono text-[10px] tracking-widest text-[#00F0FF] uppercase">
              PRIZE MATRIX
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#FFF3E6] font-mono">
              ₹25,00,000+
            </div>
            <p className="text-[11px] text-[#FFF3E6]/50">Cash rewards &amp; grants</p>
          </div>

          <div className="space-y-1 sm:border-r border-white/10 sm:pr-4">
            <span className="font-mono text-[10px] tracking-widest text-[#9D4EDD] uppercase">
              ATTENDEE METRIC
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#FFF3E6] font-mono">
              {registeredCount.toLocaleString()}+
            </div>
            <p className="text-[11px] text-[#FFF3E6]/50">Engineers &amp; builders</p>
          </div>

          <div className="space-y-1 border-r border-white/10 pr-4 last:border-0">
            <span className="font-mono text-[10px] tracking-widest text-[#E69D67] uppercase">
              FLAGSHIP ARENAS
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#FFF3E6] font-mono">
              16 SECTORS
            </div>
            <p className="text-[11px] text-[#FFF3E6]/50">Robotics, AI, Cyber</p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-[#00F0FF] uppercase">
              GLOBAL REACH
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#FFF3E6] font-mono">
              180+ COLLEGES
            </div>
            <p className="text-[11px] text-[#FFF3E6]/50">Pan-India &amp; International</p>
          </div>
        </div>
      </div>
    </section>
  );
};
