import { useState, useEffect, type FC } from "react";

const SECTORS = [
  { id: "hero", label: "01 // QUANTUM CORE", href: "#hero" },
  { id: "flagships", label: "02 // KEYSTONE ARENAS", href: "#flagships" },
  { id: "bento", label: "03 // BENTO MATRIX", href: "#bento" },
  { id: "matcher", label: "04 // SQUAD MATCHER", href: "#matcher" },
  { id: "speakers", label: "05 // VISIONARY ORACLES", href: "#speakers" },
  { id: "faq", label: "06 // PROTOCOLS", href: "#faq" },
];

export const ScrollSectorTracker: FC = () => {
  const [activeSector, setActiveSector] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const sectionElements = SECTORS.map((s) =>
        s.id === "hero" ? document.body : document.getElementById(s.id)
      );

      sectionElements.forEach((el, index) => {
        if (!el) return;
        const top = el.offsetTop || 0;
        const height = el.offsetHeight || 800;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSector(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Sector Navigation Rail"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-5 select-none pointer-events-auto"
    >
      {SECTORS.map((sec, idx) => {
        const isActive = activeSector === idx;
        return (
          <a
            key={sec.id}
            href={sec.href}
            className="group flex items-center gap-3 transition-all duration-300 cursor-pointer"
          >
            {/* Hover Tooltip Label */}
            <span
              className={`font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? "text-[#00F0FF] opacity-100 translate-x-0 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                  : "text-white/40 opacity-0 group-hover:opacity-100 group-hover:text-white translate-x-2 group-hover:translate-x-0"
              }`}
            >
              {sec.label}
            </span>

            {/* Indicator Dot & Ring */}
            <div className="relative flex items-center justify-center w-5 h-5">
              {isActive && (
                <span className="absolute inset-0 rounded-full border border-[#00F0FF] animate-ping opacity-60" />
              )}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#00F0FF] shadow-[0_0_12px_#00F0FF]"
                    : "w-1.5 h-1.5 bg-white/20 group-hover:bg-[#FFF3E6] group-hover:scale-125"
                }`}
              />
            </div>
          </a>
        );
      })}
    </aside>
  );
};
