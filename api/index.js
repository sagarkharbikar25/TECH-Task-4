import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 20 requests per minute rate limit on /api
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { ok: false, error: "Quantum request throttle exceeded. Retry in 60s." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

// In-memory registration ledger
const signups = [
  { email: "alex.chen@mit.edu", category: "Robowars", squad: "TitanSlayers", timestamp: Date.now() - 3600000 },
  { email: "priya.sharma@iitb.ac.in", category: "Quantum Hackathon", squad: "NeuralFlux", timestamp: Date.now() - 1800000 },
  { email: "marcus.vance@stanford.edu", category: "AI Aerospace", squad: "Valkyrie", timestamp: Date.now() - 900000 },
];

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Invalid operative email address" }).max(120),
  category: z.string().optional().default("General Pass"),
  squad: z.string().optional().default("Solo Innovator"),
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    status: "QUANTUM_CORE_ACTIVE",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Live Stats
app.get("/api/stats", (_req, res) => {
  res.json({
    ok: true,
    registeredCount: 1420 + signups.length,
    activeColleges: 184,
    prizePool: "INR 25,00,000+",
    flagshipArenas: 16,
  });
});

// Registration endpoint
app.post("/api/signup", (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    const errorMsg = result.error.errors[0]?.message || "Validation failed";
    return res.status(400).json({ ok: false, error: errorMsg });
  }

  const { email, category, squad } = result.data;
  
  // Check duplicate
  const exists = signups.some((s) => s.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(200).json({
      ok: true,
      alreadyRegistered: true,
      message: "Access Key already verified for this operative. Your telemetry is logged.",
      totalSignups: 1420 + signups.length,
    });
  }

  const newEntry = {
    email,
    category,
    squad,
    timestamp: Date.now(),
  };

  signups.push(newEntry);

  return res.status(201).json({
    ok: true,
    alreadyRegistered: false,
    message: "Operative registration authorized. Access Pass issued.",
    data: { email, category, squad },
    totalSignups: 1420 + signups.length,
  });
});

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[SYNAPSE API] Quantum Core live on http://localhost:${PORT}`);
  });
}

export default app;
