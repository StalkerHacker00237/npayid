import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// ======================
// FIX FRONTEND SERVING
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 IMPORTANT: middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// API ROUTES
// ======================
app.use("/api", paymentRoutes);

// ======================
// FRONTEND SERVING
// ======================
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ======================
// WEBHOOK
// ======================
app.post("/webhook/notchpay", (req, res) => {
  console.log("Webhook reçu:", req.body);
  res.status(200).send("OK");
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

console.log("ENV CHECK:", process.env.NOTCHPAY_PUBLIC_KEY);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});