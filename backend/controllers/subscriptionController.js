import supabase from "../config/supabaseClient.js";

export const subscribe = async (req, res) => {
  const user_id = req.user.id;
  const { type } = req.body; // monthly or yearly

  let endDate = new Date();

  if (type === "monthly") {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const { error } = await supabase
    .from("users")
    .update({
      subscription_status: "active",
      subscription_type: type,
      subscription_end: endDate,
    })
    .eq("id", user_id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Subscription activated" });
};