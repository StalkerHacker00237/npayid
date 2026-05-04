import axios from "axios";

const API_URL = "https://api.notchpay.co";

const getApiKey = () => process.env.NOTCHPAY_PUBLIC_KEY;

// =========================
// CREATE PAYMENT
// =========================
export const createPaymentService = async (payload) => {
  try {
    const apiKey = getApiKey();

    if (!apiKey) {
      throw new Error("NOTCHPAY_PUBLIC_KEY non défini");
    }

    const response = await axios.post(
      `${API_URL}/payments`,
      payload,
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ Create Payment Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// =========================
// DIRECT CHARGE (FIX COMPLET)
// =========================
export const processPaymentService = async (reference, phone, channel) => {
  try {
    const apiKey = getApiKey();

    const response = await axios.post(
      `${API_URL}/payments/${reference}`,
      {
        channel: channel, // cm.mtn ou cm.orange
        data: {
          phone: phone // ✅ FIX IMPORTANT
        }
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ Process Payment Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// =========================
// VERIFY PAYMENT
// =========================
export const verifyPaymentService = async (reference) => {
  try {
    const apiKey = getApiKey();

    const response = await axios.get(
      `${API_URL}/payments/${reference}`,
      {
        headers: {
          Authorization: apiKey
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ Verify Payment Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};