import express from "express";
import { createPayment, handleCallback } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/pay", createPayment);
router.get("/callback", handleCallback);

export default router;