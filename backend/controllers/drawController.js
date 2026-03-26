import supabase from "../config/supabaseClient.js";

// 🔹 Generate 5 unique numbers
const generateDrawNumbers = () => {
  const nums = new Set();
  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(nums);
};

export const runDraw = async (req, res) => {
  try {
    const drawNumbers = generateDrawNumbers();

    // 1. Save draw
    const { data: draw, error: drawError } = await supabase
      .from("draws")
      .insert([{ numbers: drawNumbers }])
      .select()
      .single();

    if (drawError) return res.status(400).json({ error: drawError.message });

    // 2. Get all scores
    const { data: scores, error: scoreError } = await supabase
      .from("scores")
      .select("*");

    if (scoreError) return res.status(400).json({ error: scoreError.message });

    // 3. Group scores by user
    const userScoresMap = {};

    scores.forEach((s) => {
      if (!userScoresMap[s.user_id]) {
        userScoresMap[s.user_id] = [];
      }
      userScoresMap[s.user_id].push(s.score);
    });

    // 4. Prize pool (dummy for now)
    const totalPool = 1000;

    const tierShare = {
      5: 0.4,
      4: 0.35,
      3: 0.25,
    };

    const winnersByTier = {
      3: [],
      4: [],
      5: [],
    };

    // 5. Find winners
    for (const user_id in userScoresMap) {
      const userScores = userScoresMap[user_id];

      const matchCount = userScores.filter((score) =>
        drawNumbers.includes(score)
      ).length;

      if (matchCount >= 3) {
        winnersByTier[matchCount].push(user_id);
      }
    }

    const winnersToInsert = [];

    // 6. Calculate prize per tier
    for (const tier of [3, 4, 5]) {
      const users = winnersByTier[tier];

      if (users.length === 0) continue;

      const pool = totalPool * tierShare[tier];
      const prizePerUser = pool / users.length;

      users.forEach((user_id) => {
        winnersToInsert.push({
          user_id,
          draw_id: draw.id,
          match_count: tier,
          prize: prizePerUser,
          status: "pending",
        });
      });
    }

    // 7. Insert winners
    if (winnersToInsert.length > 0) {
      const { error: winnerError } = await supabase
        .from("winners")
        .insert(winnersToInsert);

      if (winnerError)
        return res.status(400).json({ error: winnerError.message });
    }

    res.json({
      drawNumbers,
      winnersByTier,
      totalWinners: winnersToInsert.length,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};