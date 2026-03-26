import supabase from "../config/supabaseClient.js";

export const checkSubscription = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from("users")
      .select("subscription_status, subscription_end")
      .eq("id", user_id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.subscription_status !== "active") {
      return res.status(403).json({ message: "Subscription required" });
    }

    // Optional: check expiry
    if (new Date(data.subscription_end) < new Date()) {
      return res.status(403).json({ message: "Subscription expired" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};