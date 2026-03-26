import express from "express";
import { getCharities } from "../controllers/charityController.js";
import { selectCharity } from "../controllers/charityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCharities);

router.post("/select", protect, selectCharity);

export default router;