import { useRef, useState, type FC, type ReactNode, type MouseEvent } from "react";

interface BentoCardProps {
  title: string;
  category: string;
  tagline: string;
  accentColor?: string; // e.g. "#00F0FF", "#9D4EDD", "#E69D67", "#FFF3E6"
  className?: string;
  badge?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const BentoCard: FC<BentoCardProps> = ({
  title,
  category,
  tagline,
  accentColor = "#00F0FF",
  className = "",
  badge,
  children,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.setProperty("--accent-color", accentColor);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative group rounded-2xl p-[1px] overflow-hidden transition-all duration-300 cursor-pointer ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(350px circle at var(--mouse-x, ${mousePos.x}px) var(--mouse-y, ${mousePos.y}px), var(--accent-color, ${accentColor}) 0%, rgba(255, 243, 230, 0.12) 40%, transparent 80%)`
          : "rgba(255, 243, 230, 0.08)",
      }}
    >
      {/* Inner Card Face */}
      <div className="relative flex flex-col justify-between h-full w-full bg-[#0E0612]/90 backdrop-blur-xl rounded-[15px] p-6 sm:p-7 overflow-hidden z-10 border border-white/[0.05] min-h-[290px]">
        {/* Cursor Delta Glow following Pointer */}
        <div
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(280px circle at var(--mouse-x, ${mousePos.x}px) var(--mouse-y, ${mousePos.y}px), var(--accent-color, ${accentColor}) 18%, transparent 70%)`,
          }}
        />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FFF3E6]/75 border border-white/10 px-3 py-1 rounded-full bg-white/[0.03]">
            {category}
          </span>
          <div className="flex items-center gap-2">
            {badge && (
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[#00F0FF] px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                {badge}
              </span>
            )}
            <span
              className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 12px ${accentColor}`,
              }}
            />
          </div>
        </div>

        {/* Visual Slot */}
        <div className="my-auto py-2 relative z-10">{children}</div>

        {/* Card Footer */}
        <div className="space-y-1.5 relative z-10 pt-2 border-t border-white/[0.05]">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFF3E6] group-hover:text-white transition-colors flex items-center justify-between">
            <span>{title}</span>
            <span className="text-xs font-mono text-white/30 group-hover:text-[#00F0FF] group-hover:translate-x-1 transition-all">
              →
            </span>
          </h3>
          <p className="text-sm text-[#FFF3E6]/65 font-light leading-relaxed">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
};
