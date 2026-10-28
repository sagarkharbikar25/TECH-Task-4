import { useState, useEffect, useRef, type FC, type FormEvent } from "react";
import { submitRegistration } from "../../lib/api";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FinalCtaProps {
  onOpenRegister: () => void;
  onRegisteredCountUpdate: (count: number) => void;
}

export const FinalCtaSection: FC<FinalCtaProps> = ({
  onOpenRegister,
  onRegisteredCountUpdate,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        portalRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);

    try {
      const res = await submitRegistration({ email, category: "Final CTA Portal" });
      if (res.ok) {
        setSubmitted(true);
        if (res.totalSignups) onRegisteredCountUpdate(res.totalSignups);
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.8 },
          colors: ["#381932", "#FFF3E6", "#00F0FF", "#9D4EDD"],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="techfest-panel relative py-28 px-4 sm:px-6 lg:px-8 bg-[#08080C] overflow-hidden will-change-transform origin-top"
    >
      {/* Kinetic Parallax Watermark Text */}
      <div className="parallax-slow absolute top-1/4 right-10 font-mono text-[13vw] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0 leading-none">
        06 // QUANTUM GRID
      </div>

      {/* Plum & Milk Glowing Radial Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#381932]/60 via-[#9D4EDD]/30 to-[#00F0FF]/20 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={portalRef} className="rounded-3xl bg-gradient-to-b from-[#180918] to-[#0A030D] border border-[#FFF3E6]/20 p-8 sm:p-14 text-center flex flex-col items-center gap-8 shadow-[0_0_80px_rgba(56,25,50,0.7)] backdrop-blur-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#FFF3E6]/30 text-xs font-mono tracking-[0.25em] text-[#FFF3E6] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>ACCESS PORTAL // FINAL CALL</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-3 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#FFF3E6] font-mono leading-tight">
              SECURE YOUR PLACE ON THE QUANTUM GRID
            </h2>
            <p className="text-sm sm:text-base text-[#FFF3E6]/75 font-light leading-relaxed">
              Early access operatives gain prioritized team-matching slots, verified hackathon credentials, and exclusive invitations to closed keynote roundtables.
            </p>
          </div>

          {/* Signup Form Container (isolated with clear vertical margins) */}
          <div className="w-full max-w-md mx-auto my-2">
            {submitted ? (
              <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF] font-mono text-xs">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>OPERATIVE PASS RESERVED // TELEMETRY VERIFIED</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full py-4 pl-5 pr-36 rounded-2xl bg-black/70 border border-white/20 text-[#FFF3E6] placeholder-white/35 text-sm font-mono focus:outline-none focus:border-[#00F0FF] transition-all shadow-xl"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 px-5 py-2.5 rounded-xl bg-[#FFF3E6] text-[#08080C] font-mono text-xs font-black tracking-wider uppercase hover:bg-[#00F0FF] transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>{loading ? "..." : "AUTHORIZE"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Guarantee Badges (Completely isolated, zero overlap) */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs font-mono text-[#FFF3E6]/60">
            <button
              type="button"
              onClick={onOpenRegister}
              className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
              <span>FREE ADMISSION PASS (CUSTOMIZE SECTOR)</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>INSTANT PASS VERIFICATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
