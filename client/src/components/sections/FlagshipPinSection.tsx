import { useEffect, useRef, type FC } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, Cpu, Compass, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FlagshipPinProps {
  onSelectEvent: (eventName: string) => void;
}

const FLAGSHIP_DATA = [
  {
    id: "SECTOR_01",
    title: "ROBOWARS: TITANIUM CARNAGE",
    category: "EXTREME COMBAT ROBOTICS",
    prize: "₹5,00,000 POOL",
    desc: "60kg pneumatic crushers and spinning vertical blades duel inside a 12mm bulletproof polycarbonate combat cage.",
    accent: "#00F0FF",
    icon: Zap,
    specs: ["Weight Limit: 60kg", "Arena: Enclosed Cage", "Weapon: Active Only"],
  },
  {
    id: "SECTOR_02",
    title: "QUANTUM AI HACKATHON",
    category: "36-HR CODE CONVERGENCE",
    prize: "₹4,50,000 POOL",
    desc: "Build autonomous multi-agent swarms, cryptographic zero-knowledge protocols, and neural architectures under 36 hours.",
    accent: "#9D4EDD",
    icon: Cpu,
    specs: ["Duration: 36 Hours", "Mentors: Tier 1 VCs", "Tracks: AI, ZK, Web3"],
  },
  {
    id: "SECTOR_03",
    title: "AEROMODELLING DRONE PRIX",
    category: "SUPERSONIC OBSTACLE SPRINT",
    prize: "₹3,50,000 POOL",
    desc: "FPV quadcopter racing through laser-gated rings, high-G inverted loops, and autonomous optical flow tracking zones.",
    accent: "#FFF3E6",
    icon: Compass,
    specs: ["Class: 5-inch Open", "Video: Digital HD", "Gates: 18 Laser Rings"],
  },
  {
    id: "SECTOR_04",
    title: "CYBER MATRIX CTF ARENA",
    category: "OFFENSIVE SECURITY SPRINT",
    prize: "₹3,00,000 POOL",
    desc: "Red-team offensive hacking against military-grade simulated SCADA grids, binary exploitation, and reverse engineering.",
    accent: "#E69D67",
    icon: Shield,
    specs: ["Format: Jeopardy + AD", "Scoreboard: Real-time", "Flags: 48 Challenges"],
  },
];

export const FlagshipPinSection: FC<FlagshipPinProps> = ({ onSelectEvent }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

      // Header entrance animation on scroll
      gsap.fromTo(
        ".flagship-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      // Horizontal track scrub animation
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progressBar = document.getElementById("flagship-scrub-bar");
            if (progressBar) {
              progressBar.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flagships"
      ref={sectionRef}
      className="techfest-panel relative min-h-screen bg-[#08080C] overflow-hidden flex flex-col justify-center pt-28 pb-12 border-t border-b border-white/[0.08] will-change-transform origin-top"
    >
      {/* Kinetic Parallax Watermark Text */}
      <div className="parallax-slow absolute top-1/3 left-6 sm:left-16 font-mono text-[13vw] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0 leading-none">
        01 // ROBOWARS ARENA
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#381932]/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header with Scrub Progress Line */}
      <div className="flagship-header relative z-20 px-6 sm:px-16 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-[#00F0FF] uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>FLAGSHIP CORRIDOR // HORIZONTAL SCRUB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFF3E6] font-mono">
              KEYSTONE COMBAT ARENAS
            </h2>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-1.5 font-mono text-xs text-white/40">
            <span>HORIZON SCRUB ACTIVE</span>
            <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                id="flagship-scrub-bar"
                className="h-full w-0 bg-gradient-to-r from-[#00F0FF] to-[#9D4EDD] transition-all duration-75 shadow-[0_0_10px_#00F0FF]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pinning Track with Robust Gap */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 pl-6 sm:pl-16 pr-24 will-change-transform z-10 py-4"
      >
        {FLAGSHIP_DATA.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="w-[85vw] sm:w-[440px] h-[440px] flex-shrink-0 rounded-2xl bg-[#110614]/90 border border-white/10 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden group hover:border-[#00F0FF]/50 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center p-2 border"
                    style={{
                      borderColor: `${item.accent}40`,
                      backgroundColor: `${item.accent}15`,
                      color: item.accent,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-[#FFF3E6]/50 uppercase block">
                      {item.id}
                    </span>
                    <span
                      className="font-mono text-xs font-bold tracking-wider uppercase block"
                      style={{ color: item.accent }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#FFF3E6]">
                  {item.prize}
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-2.5 my-auto py-2">
                <h3 className="text-2xl font-black text-[#FFF3E6] tracking-tight leading-snug group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FFF3E6]/70 font-light leading-relaxed">
                  {item.desc}
                </p>

                {/* Specs Pill List */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-[#FFF3E6]/75"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectEvent(item.title)}
                className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-[#FFF3E6] hover:text-[#08080C] border border-white/15 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-[#00F0FF]/50"
              >
                <span>REGISTER FOR ARENA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
