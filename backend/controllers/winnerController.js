import supabase from "../config/supabaseClient.js";

// Upload proof (user uploads screenshot URL)
export const uploadProof = async (req, res) => {
  try {
    const { winner_id, proof_url } = req.body;

    if (!winner_id || !proof_url) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { error } = await supabase
      .from("winners")
      .update({
        proof_url,
        status: "pending",
      })
      .eq("id", winner_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Proof uploaded successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all winners (for admin panel)
export const getAllWinners = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("winners")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update winner status (admin: approve / reject / paid)
export const updateWinnerStatus = async (req, res) => {
  try {
    const { winner_id, status } = req.body;

    if (!winner_id || !status) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const validStatuses = ["pending", "approved", "rejected", "paid"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const { error } = await supabase
      .from("winners")
      .update({ status })
      .eq("id", winner_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Status updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};