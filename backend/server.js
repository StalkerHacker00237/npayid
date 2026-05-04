import dotenv from "dotenv";
dotenv.config(); // ⚠️ DOIT ÊTRE EN PREMIER

import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", paymentRoutes);

// webhook (optionnel)
app.post("/webhook/notchpay", (req, res) => {
  console.log("Webhook reçu:", req.body);
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 5000;

console.log("ENV CHECK:", process.env.NOTCHPAY_PUBLIC_KEY); // 👈 DEBUG

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});