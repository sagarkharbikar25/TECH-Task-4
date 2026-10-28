import { useState, useEffect } from "react";
import type { FC } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenRegister: () => void;
  registeredCount: number;
}

export const Navbar: FC<NavbarProps> = ({ onOpenRegister, registeredCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "FLAGSHIPS", href: "#flagships" },
    { label: "BENTO MATRIX", href: "#bento" },
    { label: "SQUAD MATCHER", href: "#matcher" },
    { label: "KEYNOTES", href: "#speakers" },
    { label: "PROTOCOL FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080C]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      {/* Top Cybernetic Scroll Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[2.5px] bg-white/[0.04] overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#00F0FF] via-[#9D4EDD] to-[#FFF3E6] transition-all duration-100 will-change-[width] shadow-[0_0_12px_rgba(0,240,255,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Gemini-generated Asset */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#00F0FF]/50 p-[1px] bg-gradient-to-br from-[#381932] via-[#9D4EDD] to-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-transform duration-300 group-hover:scale-105">
            <img
              src="/logo.jpg"
              alt="SYNAPSE 2026 Logo"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-lg tracking-wider text-[#FFF3E6] font-mono group-hover:text-[#00F0FF] transition-colors leading-none">
              SYNAPSE<span className="text-[#00F0FF] font-light">.26</span>
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#FFF3E6]/50 uppercase mt-1">
              TECHFEST CONVERGENCE
            </span>
          </div>
        </a>

        {/* Desktop Links with Robust Gap Spacing */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono tracking-widest text-[#FFF3E6]/75 hover:text-[#00F0FF] transition-colors uppercase whitespace-nowrap hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Live Telemetry Pill & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono text-[#FFF3E6]/75 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="whitespace-nowrap">NODE ACTIVE // {registeredCount} REGISTERED</span>
          </div>

          <button
            onClick={onOpenRegister}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#381932] via-[#9D4EDD] to-[#00F0FF] hover:brightness-110 text-[#FFF3E6] text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(157,78,221,0.4)] active:scale-95"
          >
            <span>CLAIM PASS</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={onOpenRegister}
            className="px-3 py-1.5 rounded-lg bg-[#9D4EDD]/30 border border-[#9D4EDD]/50 text-[#FFF3E6] text-xs font-mono"
          >
            PASS
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#FFF3E6]/70 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0611]/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono tracking-widest text-[#FFF3E6]/80 hover:text-[#00F0FF] py-1"
            >
              // {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#9D4EDD] text-[#08080C] font-mono font-bold text-xs uppercase tracking-widest"
            >
              REGISTER FOR PASS →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
