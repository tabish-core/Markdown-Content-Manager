import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);

// Health check route (useful for verifying the deployment is alive)
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Markdown Notes API is running." });
});

connectDB();

// Only start a local server outside of Vercel (serverless)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;