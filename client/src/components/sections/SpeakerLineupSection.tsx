import { useEffect, useRef, type FC } from "react";
import { Mic2, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPEAKERS = [
  {
    name: "Dr. Elena Vance",
    role: "Chief Scientist @ NeuralQuantum Labs",
    topic: "Scalable Superconducting Qubits & Room-Temp Coherence",
    badge: "KEYNOTE 01",
    time: "Day 1 // 11:00 AM",
    accent: "#00F0FF",
    initial: "EV",
  },
  {
    name: "Vikram Sengupta",
    role: "VP of Autonomous Robotics, Horizon Aero",
    topic: "Supersonic Drone Flocking Dynamics & Edge AI",
    badge: "KEYNOTE 02",
    time: "Day 2 // 02:30 PM",
    accent: "#9D4EDD",
    initial: "VS",
  },
  {
    name: "Sarah Chen",
    role: "Founder & Lead Architect @ VoidSec",
    topic: "Zero-Trust SCADA Defense Against Autonomous Malware",
    badge: "KEYNOTE 03",
    time: "Day 3 // 04:00 PM",
    accent: "#FFF3E6",
    initial: "SC",
  },
];

export const SpeakerLineupSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".speaker-card",
        { opacity: 0, y: 50, scale: 0.93, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="techfest-panel relative py-28 px-4 sm:px-6 lg:px-8 bg-[#08080C] overflow-hidden will-change-transform origin-top"
    >
      {/* Kinetic Parallax Watermark Text */}
      <div className="parallax-slow absolute top-1/4 right-10 font-mono text-[13vw] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0 leading-none">
        04 // ORACLES
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-[#00F0FF] uppercase border border-[#00F0FF]/30 px-3 py-1 rounded-full bg-[#00F0FF]/5 mx-auto">
            <Mic2 className="w-3.5 h-3.5" />
            <span>GLOBAL ORACLE STAGE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#FFF3E6] font-mono">
            VISIONARY KEYNOTES
          </h2>
          <p className="text-sm text-[#FFF3E6]/70 font-light">
            Global pioneers shaping the bleeding edge of quantum computing, planetary robotics, and biological neural interfaces.
          </p>
        </div>

        {/* Speaker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPEAKERS.map((s) => (
            <div
              key={s.name}
              className="speaker-card speaker-card-reveal p-6 sm:p-7 rounded-2xl bg-[#110714]/85 border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between gap-6 group hover:shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span
                    className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${s.accent}40`,
                      color: s.accent,
                      backgroundColor: `${s.accent}10`,
                    }}
                  >
                    {s.badge}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-[#FFF3E6]/50">
                    <Clock className="w-3 h-3" />
                    <span>{s.time}</span>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#381932] via-[#9D4EDD] to-[#00F0FF] p-[1.5px] flex-shrink-0">
                    <div className="w-full h-full bg-[#08080C] rounded-[10px] flex items-center justify-center font-mono font-bold text-base text-[#FFF3E6]">
                      {s.initial}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FFF3E6] group-hover:text-[#00F0FF] transition-colors leading-snug">
                      {s.name}
                    </h3>
                    <p className="text-xs font-mono text-[#FFF3E6]/60 mt-0.5">{s.role}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <span className="font-mono text-[10px] tracking-wider text-[#00F0FF] uppercase block mb-1">
                  // TALK SYNOPSIS
                </span>
                <p className="text-xs text-[#FFF3E6]/80 font-light leading-relaxed">
                  &ldquo;{s.topic}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
