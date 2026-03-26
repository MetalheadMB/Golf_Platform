import supabase from "../config/supabaseClient.js";

// Get all charities
export const getCharities = async (req, res) => {
  const { data, error } = await supabase
    .from("charities")
    .select("*");

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};

export const selectCharity = async (req, res) => {
  const user_id = req.user.id;
  const { charity_id } = req.body;

  const { error } = await supabase
    .from("users")
    .update({ charity_id })
    .eq("id", user_id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Charity selected successfully" });
};