import supabase from "../config/supabaseClient.js";

// 🔹 Add Score (with max 5 logic)
export const addScore = async (req, res) => {
  try {
    const { score, date } = req.body;
    const user_id = req.user.id; // from JWT middleware

    // 1. Validate input
    if (!score || !date) {
      return res.status(400).json({ message: "Score and date required" });
    }

    if (score < 1 || score > 45) {
      return res.status(400).json({ message: "Score must be between 1-45" });
    }

    // 2. Fetch existing scores (oldest first)
    const { data: scores, error: fetchError } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: true });

    if (fetchError) {
      return res.status(400).json({ error: fetchError.message });
    }

    // 3. If already 5 scores → delete oldest
    if (scores.length >= 5) {
      const oldest = scores[0];

      const { error: deleteError } = await supabase
        .from("scores")
        .delete()
        .eq("id", oldest.id);

      if (deleteError) {
        return res.status(400).json({ error: deleteError.message });
      }
    }

    // 4. Insert new score
    const { data, error } = await supabase
      .from("scores")
      .insert([{ user_id, score, date }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: "Score added successfully",
      data,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔹 Get User Scores (latest first)
export const getScores = async (req, res) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user_id)
      .order("date", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};