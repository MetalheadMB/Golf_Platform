import express from "express";
import { addScore, getScores } from "../controllers/scoreController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkSubscription } from "../middleware/subscriptionMiddleware.js";

const router = express.Router(); 

router.post("/add", protect, checkSubscription, addScore);
router.get("/", protect, checkSubscription, getScores);

export default router;