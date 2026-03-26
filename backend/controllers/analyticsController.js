import supabase from "../config/supabaseClient.js";

export const getAnalytics = async (req, res) => {
  try {
    // Users
    const { count: userCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    // Scores
    const { count: scoreCount } = await supabase
      .from("scores")
      .select("*", { count: "exact", head: true });

    // Draws
    const { count: drawCount } = await supabase
      .from("draws")
      .select("*", { count: "exact", head: true });

    // Winners
    const { data: winners } = await supabase
      .from("winners")
      .select("prize");

    const totalWinners = winners.length;

    const totalPrize = winners.reduce((sum, w) => sum + (w.prize || 0), 0);

    res.json({
      totalUsers: userCount,
      totalScores: scoreCount,
      totalDraws: drawCount,
      totalWinners,
      totalPrize,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};