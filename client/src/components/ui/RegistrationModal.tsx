import { useState, type FC, type FormEvent } from "react";
import confetti from "canvas-confetti";
import { submitRegistration } from "../../lib/api";
import { X, CheckCircle2, AlertCircle, Loader2, Sparkles, Terminal } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  onSuccessCountUpdate?: (count: number) => void;
}

const CATEGORIES = [
  "Robowars: Heavyweight Arena",
  "Quantum Computing Hackathon",
  "Autonomous Drone Swarms",
  "Biomechanical AI Keynote",
  "Cybersecurity CTF Grid",
  "General VIP Fest Pass",
];

export const RegistrationModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = "General VIP Fest Pass",
  onSuccessCountUpdate,
}) => {
  const [email, setEmail] = useState("");
  const [squad, setSquad] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ message: string; alreadyRegistered?: boolean } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await submitRegistration({
        email,
        category,
        squad: squad.trim() || "Solo Innovator",
      });

      if (!res.ok) {
        setError(res.error || "Authorization error. Try again.");
      } else {
        setSuccessData({
          message: res.message || "Registration verified.",
          alreadyRegistered: res.alreadyRegistered,
        });

        if (res.totalSignups && onSuccessCountUpdate) {
          onSuccessCountUpdate(res.totalSignups);
        }

        // Fire festive neon confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00F0FF", "#9D4EDD", "#FFF3E6", "#E69D67"],
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network protocol error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setEmail("");
    setSquad("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08080C]/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#110714] border border-[#00F0FF]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(56,25,50,0.8)] overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#9D4EDD]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#00F0FF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-[#FFF3E6]/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/50 flex items-center justify-center text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30">
              ACCESS PASS AUTHORIZED
            </div>

            <h3 className="text-2xl font-black text-[#FFF3E6] tracking-tight">
              {successData.alreadyRegistered ? "WELCOME BACK, OPERATIVE" : "CREDENTIALS VERIFIED"}
            </h3>

            <p className="text-sm text-[#FFF3E6]/75 max-w-sm mx-auto leading-relaxed">
              {successData.message} An encrypted confirmation token has been dispatched for{" "}
              <span className="text-[#00F0FF] font-mono">{email}</span>.
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#9D4EDD] text-[#08080C] font-bold font-mono tracking-wider hover:opacity-90 transition-opacity"
              >
                RETURN TO GRID MATRIX
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>TERMINAL ENTRY // SYS.REGISTER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#FFF3E6]">
                SECURE OPERATIVE PASS
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF3E6]/65 font-light">
                Join 50,000+ engineers, designers, and founders at SYNAPSE 2026.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#FFF3E6]/80 uppercase tracking-wider mb-1.5">
                  Operative Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-[#FFF3E6] placeholder-white/20 text-sm focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#FFF3E6]/80 uppercase tracking-wider mb-1.5">
                  Sector / Arena Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#130715] border border-white/10 text-[#FFF3E6] text-sm focus:outline-none focus:border-[#00F0FF] transition-all font-mono"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#FFF3E6]/80 uppercase tracking-wider mb-1.5">
                  Squad / Institution Affiliation (Optional)
                </label>
                <input
                  type="text"
                  value={squad}
                  onChange={(e) => setSquad(e.target.value)}
                  placeholder="e.g. IIT Bombay / Team CyberForge"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-[#FFF3E6] placeholder-white/20 text-sm focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all font-mono"
                />
              </div>

              <p className="text-[11px] text-[#FFF3E6]/50 font-mono">
                * Zero spam guarantee. Access pass tokens are cryptographically generated.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#381932] via-[#9D4EDD] to-[#00F0FF] text-[#FFF3E6] font-bold font-mono tracking-widest uppercase hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_0_25px_rgba(157,78,221,0.4)] flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AUTHORIZING...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#FFF3E6]" />
                    <span>CLAIM ACCESS PASS</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
