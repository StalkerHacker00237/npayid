import { v4 as uuidv4 } from "uuid";
import {
  createPaymentService,
  verifyPaymentService,
  processPaymentService
} from "../services/notchpayService.js";

export const createPayment = async (req, res) => {
  try {
    const { phone, gateway } = req.body;

    if (!phone || !gateway) {
      return res.status(400).json({ message: "Numéro ou gateway manquant" });
    }

    // =========================
    // FORMAT PHONE
    // =========================
    const formattedPhone = phone.startsWith("+237")
      ? phone
      : "+237" + phone;

    // =========================
    // CHANNEL FIX (IMPORTANT)
    // =========================
    const channel =
      gateway === "CM_MTNMOMO"
        ? "cm.mtn"
        : "cm.orange";

    const reference = "order_" + uuidv4();

    const payload = {
      amount: 10000,
      currency: "XAF",
      customer: {
        name: "Client",
        phone: formattedPhone
      },
      reference,
      callback: `${process.env.BASE_URL}/api/callback`,
      description: "Paiement 10000 FCFA"
    };

    console.log("PAYLOAD SENT:", payload);

    // =========================
    // STEP 1 - CREATE PAYMENT
    // =========================
    const payment = await createPaymentService(payload);

    console.log("CREATE RESPONSE:", payment);

    const paymentReference = payment?.transaction?.reference;

    if (!paymentReference) {
      throw new Error("Reference NotchPay introuvable");
    }

    // =========================
    // STEP 2 - PROCESS PAYMENT
    // =========================
    const processResponse = await processPaymentService(
      paymentReference,
      formattedPhone, // ✅ ON GARDE LE +237 (IMPORTANT FIX)
      channel
    );

    console.log("PROCESS RESPONSE:", processResponse);

    return res.json({
      message: "Paiement lancé",
      status: processResponse?.transaction?.status || "processing",
      reference: paymentReference
    });

  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error?.response?.data || error);

    return res.status(500).json({
      message: "Erreur paiement",
      error: error?.response?.data || error.message
    });
  }
};

export const handleCallback = async (req, res) => {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).send("Reference manquante");
    }

    const payment = await verifyPaymentService(reference);

    const status = payment?.transaction?.status;

    if (status === "complete") return res.send("✅ Paiement réussi");
    if (status === "processing" || status === "pending") return res.send("⏳ En cours");

    return res.send("❌ Échec");

  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};