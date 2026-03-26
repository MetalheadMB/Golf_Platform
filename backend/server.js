import 'dotenv/config'; // This executes immediately upon import
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import winnerRoutes from "./routes/winnerRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/scores", scoreRoutes);
app.use("/draw", drawRoutes);
app.use("/winners", winnerRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/charities", charityRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

// This should now print your actual URL instead of undefined
console.log("ENV:", process.env.SUPABASE_URL);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});