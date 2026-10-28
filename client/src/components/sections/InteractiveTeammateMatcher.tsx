import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import { Users, Check, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MatcherProps {
  onJoinSquadWaitlist: () => void;
}

const ROLES = [
  { id: "ai", label: "AI / ML Researcher", skills: ["PyTorch", "Transformers", "CUDA"] },
  { id: "robotics", label: "Robotics & Hardware", skills: ["ROS 2", "Embedded C++", "PCB CAD"] },
  { id: "frontend", label: "Creative Dev / Web3", skills: ["Three.js", "React", "Rust"] },
  { id: "designer", label: "Product & 3D Designer", skills: ["Blender", "Figma", "Shaders"] },
];

const MOCK_TEAMMATES = [
  {
    name: "Arjun K.",
    college: "IIT Bombay",
    role: "Hardware Architect",
    skills: ["ROS 2", "SolidWorks", "Motor Drivers"],
    compat: 96,
    avatar: "A",
  },
  {
    name: "Siddharth M.",
    college: "BITS Pilani",
    role: "Full-Stack & Three.js",
    skills: ["WebGL", "TypeScript", "Node.js"],
    compat: 92,
    avatar: "S",
  },
  {
    name: "Kavya R.",
    college: "IIT Delhi",
    role: "Deep Learning Engineer",
    skills: ["PyTorch", "Computer Vision", "YOLOv10"],
    compat: 89,
    avatar: "K",
  },
];

export const InteractiveTeammateMatcher: FC<MatcherProps> = ({ onJoinSquadWaitlist }) => {
  const [selectedRole, setSelectedRole] = useState(ROLES[0].id);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["PyTorch"]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentRoleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s: string) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const calculatedScore = Math.min(
    99,
    80 + selectedSkills.length * 4 + (selectedRole === "robotics" ? 7 : 5)
  );

  return (
    <section
      id="matcher"
      ref={sectionRef}
      className="techfest-panel relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0512] border-t border-b border-white/[0.08] overflow-hidden will-change-transform origin-top"
    >
      {/* Kinetic Parallax Watermark Text */}
      <div className="parallax-slow absolute top-1/4 left-10 font-mono text-[13vw] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0 leading-none">
        03 // NEURAL SQUAD
      </div>

      {/* Background Plum Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#381932]/45 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-[#9D4EDD] uppercase border border-[#9D4EDD]/40 px-3 py-1 rounded-full bg-[#9D4EDD]/10 mx-auto">
            <Users className="w-3.5 h-3.5" />
            <span>ALGORITHMIC SQUAD DISCOVERY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFF3E6] font-mono">
            NEURAL TEAMMATE MATCHER
          </h2>
          <p className="text-sm text-[#FFF3E6]/70 font-light">
            Never attend a techfest solo again. Our algorithm connects you with complementary developers, robotics builders, and pitch leads across top engineering campuses.
          </p>
        </div>

        {/* Interactive Matcher Dashboard Card */}
        <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#08080C]/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          {/* Left Column: Role & Skill Selector */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <label className="block text-xs font-mono text-[#00F0FF] uppercase tracking-wider mb-3">
                1. SELECT YOUR SPECIALIZATION
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedRole(r.id);
                      setSelectedSkills([r.skills[0]]);
                    }}
                    className={`p-3.5 rounded-xl font-mono text-xs text-left transition-all border ${
                      selectedRole === r.id
                        ? "bg-[#381932] border-[#00F0FF] text-[#FFF3E6] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                        : "bg-white/[0.02] border-white/10 text-[#FFF3E6]/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="font-bold">{r.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#00F0FF] uppercase tracking-wider mb-3">
                2. VERIFIED STACK &amp; CAPABILITIES
              </label>
              <div className="flex flex-wrap gap-2">
                {currentRoleObj.skills.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all border flex items-center gap-1.5 ${
                        active
                          ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF]"
                          : "bg-white/[0.03] border-white/10 text-[#FFF3E6]/60 hover:text-white"
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#FFF3E6]/70">COMPATIBILITY ENGINE VELOCITY</span>
                <span className="text-[#00F0FF] font-bold">{calculatedScore}% MATCH ACCURACY</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00F0FF] via-[#9D4EDD] to-[#FFF3E6] transition-all duration-500"
                  style={{ width: `${calculatedScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Teammate Pool */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-[#FFF3E6]/60 tracking-wider uppercase">
                  RECOMMENDED SQUADMATES
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="flex flex-col gap-3">
                {MOCK_TEAMMATES.map((mate) => (
                  <div
                    key={mate.name}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-[#9D4EDD]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#381932] border border-[#FFF3E6]/30 flex items-center justify-center font-mono font-bold text-xs text-[#FFF3E6]">
                        {mate.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#FFF3E6] font-mono">
                          {mate.name}
                        </div>
                        <div className="text-[10px] text-[#FFF3E6]/50">
                          {mate.college} · {mate.role}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono text-xs font-bold text-[#00F0FF]">
                      {mate.compat}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onJoinSquadWaitlist}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9D4EDD] to-[#00F0FF] text-[#08080C] font-mono font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <span>CONNECT WITH MATCHED SQUAD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
