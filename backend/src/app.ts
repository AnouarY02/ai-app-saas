import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import insightRoutes from "./routes/insightRoutes";
import authRoutes from "./routes/authRoutes";
import healthRoutes from "./routes/healthRoutes";
import adminRoutes from "./routes/adminRoutes";
import aiRoutes from "./routes/aiRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { brandingStore } from "./models/BrandingModel";
import { featureFlagStore } from "./models/FeatureFlagModel";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));

// Public routes
app.get("/api/public/branding", (_req, res) => {
  const branding = brandingStore.get("default");
  res.json(branding || {});
});

app.get("/api/public/flags", (_req, res) => {
  const flags = Array.from(featureFlagStore.values()).filter((f) => f.enabled);
  res.json(flags);
});

// Auth & user routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/health", healthRoutes);

// Admin routes (protected: admin only)
app.use("/api/admin", adminRoutes);

// AI routes (protected: authenticated)
app.use("/api/ai", aiRoutes);

app.use((_req, res, _next) => {
  res.status(404).json({ message: "Niet gevonden" });
});

app.use(errorHandler);

export default app;
