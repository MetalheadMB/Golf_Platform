import express from "express";
import {
  uploadProof,
  getAllWinners,
  updateWinnerStatus,
} from "../controllers/winnerController.js";

const router = express.Router();

router.post("/upload-proof", uploadProof);
router.get("/", getAllWinners);
router.put("/status", updateWinnerStatus);

export default router;