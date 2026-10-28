import { useState, useEffect, useRef, type FC } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Who is eligible to participate in SYNAPSE 2026 competitions?",
    a: "All undergraduate, postgraduate, and PhD scholars currently enrolled in recognized colleges and universities worldwide are eligible. Inter-college teams are permitted and encouraged in hackathons and robotic combat tracks.",
  },
  {
    q: "How does the Neural Teammate Matcher work?",
    a: "Our matcher pairs individuals based on complementary skills (e.g., pairing a hardware engineer with a computer vision specialist), schedule availability, and hackathon track interests. You can connect, review verified GitHub/portfolio credentials, and form a squad with one click.",
  },
  {
    q: "What is the team size limit for Robowars and the Quantum Hackathon?",
    a: "Robowars teams may consist of 2 to 6 members. The 36-hour Quantum Hackathon permits squads of 2 to 4 developers. Solo participants can use our in-app squad builder to get matched ahead of check-in.",
  },
  {
    q: "Is accommodation and food provided during the 3 festival days?",
    a: "Yes. All verified offline participants who secure an Operative Pass receive hostel accommodation slots on campus, 24/7 access to hardware tinkering labs, and catered meals throughout the hackathon duration.",
  },
  {
    q: "When and how are the prize pools distributed?",
    a: "Cash prizes totaling ₹25,00,000+ are transferred directly to winning team accounts via electronic wire transfer within 14 business days post-evaluation by our industry jury.",
  },
];

export const FaqSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-row",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="techfest-panel relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0D0512] border-t border-white/[0.08] overflow-hidden will-change-transform origin-top"
    >
      {/* Kinetic Parallax Watermark Text */}
      <div className="parallax-slow absolute top-1/4 left-10 font-mono text-[13vw] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none whitespace-nowrap z-0 leading-none">
        05 // PROTOCOLS
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-[#00F0FF] uppercase border border-[#00F0FF]/30 px-3 py-1 rounded-full bg-[#00F0FF]/5 mx-auto">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>OPERATIVE PROTOCOLS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFF3E6] font-mono">
            FREQUENTLY ASKED QUERIES
          </h2>
          <p className="text-sm text-[#FFF3E6]/70 font-light">
            Everything you need to know about participation credentials, team formation, and campus logistics.
          </p>
        </div>

        {/* Accordion List with Robust Card Isolation */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="faq-row faq-row-reveal rounded-2xl bg-[#08080C]/85 border border-white/10 overflow-hidden transition-all duration-300 shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <span className="font-mono text-sm sm:text-base font-bold text-[#FFF3E6] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#00F0FF] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#FFF3E6]/75 leading-relaxed font-light border-t border-white/[0.06] animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
