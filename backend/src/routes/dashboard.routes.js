import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({
    totalMedicines: 12,
    expired: 2,
    nearExpiry: 3,
    safe: 7,
  });
});

export default router;
