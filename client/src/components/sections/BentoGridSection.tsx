import { useEffect, useRef, type FC } from "react";
import { BentoCard } from "../ui/BentoCard";
import { Cpu, Terminal, Compass, Flame, Globe2, Sparkles, Radio } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BentoSectionProps {
  onSelectEvent: (eventTitle: string) => void;
}

export const BentoGridSection: FC<BentoSectionProps> = ({ onSelectEvent }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal on scroll
      gsap.fromTo(
        ".bento-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        }
      );

      // Staggered Bento Cards cascade on scroll
      gsap.fromTo(
        ".bento-item",
        { opacity: 0, y: 60, scale: 0.94, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-grid-container",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bento"
      ref={sectionRef}
      className="techfest-panel relative py-28 px-4 sm:px-6 lg:px-8 bg-[#08080C] overflow-hidden will-change-transform origin-top"
    >
      {/* Kinetic Parallax Watermark Text */}
      <div className="parallax-slow absolute top-1/4 right-6 font-mono text-[13vw] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0 leading-none">
        02 // BENTO LABS
      </div>

      {/* Background Grid & Plum Radial Mesh */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#381932]/35 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#9D4EDD]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Section Header */}
        <div className="bento-header flex flex-col gap-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-[#00F0FF] uppercase border border-[#00F0FF]/30 px-3 py-1 rounded-full bg-[#00F0FF]/5 mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTOR CATALOG // BENTO SYSTEM</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#FFF3E6] font-mono">
            EXPEDITIONS &amp; LABS
          </h2>
          <p className="text-sm text-[#FFF3E6]/70 font-light">
            Dynamic interactive arenas engineered to challenge the boundaries of applied physical computing, AI models, and deep tech.
          </p>
        </div>

        {/* Balanced Multi-Column Bento Grid */}
        <div className="bento-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento Item 1: Robotics Workshop */}
          <BentoCard
            className="bento-item bento-card-reveal"
            title="NEURAL SWARM ROBOTICS LAB"
            category="HANDS-ON WORKSHOP"
            badge="LIVE LAB"
            tagline="Program 20 coordinated micro-rovers in real-time swarm orchestration using reinforcement learning."
            accentColor="#00F0FF"
            onClick={() => onSelectEvent("Neural Swarm Robotics Lab")}
          >
            <div className="flex items-center justify-between py-4 px-2">
              <div className="flex flex-col gap-1">
                <div className="font-mono text-xs text-[#00F0FF]">
                  SIMULATION: <span className="text-white">CONVERGED (99.4%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFF3E6]/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>30 HARDWARE RIGS RESERVED</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF]">
                <Cpu className="w-7 h-7" />
              </div>
            </div>
          </BentoCard>

          {/* Bento Item 2: Quantum Cryptography */}
          <BentoCard
            className="bento-item bento-card-reveal"
            title="QUANTUM CRYPTO ACCELERATOR"
            category="ADVANCED PROTOCOL"
            badge="HIGH DEMAND"
            tagline="Post-quantum lattice cryptography and zero-knowledge snark verification workshops conducted by cryptographers."
            accentColor="#9D4EDD"
            onClick={() => onSelectEvent("Quantum Crypto Accelerator")}
          >
            <div className="flex items-center justify-between py-4 px-2">
              <div className="flex flex-col gap-1 font-mono text-xs text-[#FFF3E6]/70">
                <div>ALGORITHM: CRYSTALS-Kyber</div>
                <div>KEY LENGTH: 1024-bit Lattice</div>
                <div className="text-[#9D4EDD]">AUDIT: PASSED (ZERO-LEAK)</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#9D4EDD]/15 border border-[#9D4EDD]/40 text-[#9D4EDD]">
                <Terminal className="w-7 h-7" />
              </div>
            </div>
          </BentoCard>

          {/* Bento Item 3: Bio-Robotics Exhibition */}
          <BentoCard
            className="bento-item bento-card-reveal"
            title="BIOMECH EXPO"
            category="EXHIBITION"
            badge="SHOWCASE"
            tagline="Electromyographic robotic prosthetics and neural brain-computer interfaces on display."
            accentColor="#FFF3E6"
            onClick={() => onSelectEvent("Biomech Expo")}
          >
            <div className="flex items-center justify-between py-4 px-2">
              <div className="flex flex-col gap-1 font-mono text-xs text-[#FFF3E6]/70">
                <div>SENSORS: 64-CHANNEL EMG</div>
                <div>RESPONSE TIME: &lt; 8ms</div>
                <div className="text-[#00F0FF]">TELEMETRY: SYNCHRONIZED</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/15 text-[#FFF3E6]">
                <Compass className="w-7 h-7" />
              </div>
            </div>
          </BentoCard>

          {/* Bento Item 4: Startup Arena */}
          <BentoCard
            className="bento-item bento-card-reveal"
            title="SILICON SPEED PITCH"
            category="FOUNDER ARENA"
            badge="INR 10L FUND"
            tagline="Pitch hardware and AI moonshots to top angels and deep-tech venture partners in 3 minutes."
            accentColor="#E69D67"
            onClick={() => onSelectEvent("Silicon Speed Pitch")}
          >
            <div className="flex items-center justify-between py-4 px-2">
              <div className="flex flex-col gap-1 font-mono text-xs text-[#FFF3E6]/70">
                <div>VENTURE SEED POOL: ₹10,00,000</div>
                <div>INVESTOR PANEL: 12 PARTNERS</div>
                <div className="text-[#E69D67]">STAGE: MAIN AUDITORIUM</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#E69D67]/10 border border-[#E69D67]/30 text-[#E69D67]">
                <Flame className="w-7 h-7" />
              </div>
            </div>
          </BentoCard>

          {/* Bento Item 5: Open Source Sprint */}
          <BentoCard
            className="bento-item bento-card-reveal"
            title="GLOBAL OPEN-SOURCE SPRINT"
            category="COMMUNITY"
            badge="GLOBAL"
            tagline="Contribute to high-impact open-source developer infrastructure and compete for bounty pools."
            accentColor="#00F0FF"
            onClick={() => onSelectEvent("Global Open-Source Sprint")}
          >
            <div className="flex items-center justify-between py-4 px-2">
              <div className="flex flex-col gap-1 font-mono text-xs text-[#FFF3E6]/70">
                <div>REPOSITORIES: 14 PARTNER PROJECTS</div>
                <div className="text-[#00F0FF]">PULL REQUESTS MERGED: 380+</div>
                <div>BOUNTIES: DISTRIBUTED LIVE</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-[#00F0FF]">
                <Globe2 className="w-7 h-7" />
              </div>
            </div>
          </BentoCard>

          {/* Bento Item 6: Autonomous Rover Arena */}
          <BentoCard
            className="bento-item bento-card-reveal"
            title="AUTONOMOUS ROVER ODYSSEY"
            category="COMPETITION"
            badge="MARTIAN ARENA"
            tagline="Navigate unmapped crater terrain using onboard LiDAR, stereo SLAM, and computer vision."
            accentColor="#9D4EDD"
            onClick={() => onSelectEvent("Autonomous Rover Odyssey")}
          >
            <div className="flex items-center justify-between py-4 px-2">
              <div className="flex flex-col gap-1 font-mono text-xs text-[#FFF3E6]/70">
                <div>TERRAIN: SIMULATED REGOLITH</div>
                <div>NAV PROTOCOL: RTK-GPS + LIDAR</div>
                <div className="text-[#9D4EDD]">COURSE LENGTH: 120M</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#9D4EDD]/15 border border-[#9D4EDD]/35 text-[#9D4EDD]">
                <Radio className="w-7 h-7" />
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};
