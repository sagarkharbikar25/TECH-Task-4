import type { FC } from "react";
import { ArrowUp } from "lucide-react";

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050308] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-[#FFF3E6]/60">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#00F0FF]/40 p-[1px] bg-gradient-to-br from-[#381932] to-[#00F0FF]">
                <img src="/logo.jpg" alt="SYNAPSE Logo" className="w-full h-full object-cover rounded-[7px]" />
              </div>
              <span className="font-bold text-base text-[#FFF3E6] font-mono tracking-wider">
                SYNAPSE.2026
              </span>
            </div>
            <p className="max-w-sm text-xs text-[#FFF3E6]/60 leading-relaxed font-sans">
              Asia&apos;s premier collegiate science and technology festival. Tailored with the iconic Plum (#381932) and Milk (#FFF3E6) aesthetic identity.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-[#00F0FF]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>ALL QUANTUM SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-[#FFF3E6] uppercase tracking-wider">
              CORRIDORS
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#flagships" className="hover:text-[#00F0FF] transition-colors">
                  // Combat Arenas
                </a>
              </li>
              <li>
                <a href="#bento" className="hover:text-[#00F0FF] transition-colors">
                  // Bento Sector Hub
                </a>
              </li>
              <li>
                <a href="#matcher" className="hover:text-[#00F0FF] transition-colors">
                  // Squad Matcher
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-[#00F0FF] transition-colors">
                  // Keynotes Stage
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-[#FFF3E6] uppercase tracking-wider">
              PROTOCOL
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="hover:text-[#00F0FF] transition-colors">
                  // FAQ &amp; Rules
                </a>
              </li>
              <li>
                <span className="text-[#FFF3E6]/40">// Security Guidelines</span>
              </li>
              <li>
                <span className="text-[#FFF3E6]/40">// Code of Conduct</span>
              </li>
              <li>
                <span className="text-[#00F0FF]">// CA Portal Verified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-[#FFF3E6]/40">
            © 2026 SYNAPSE TECHFEST. ARCHITECTED UNDER TECHFEST CA PROGRAM TASK 4.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/40 text-[#FFF3E6] transition-colors"
          >
            <span>TOP OF GRID</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#00F0FF]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
