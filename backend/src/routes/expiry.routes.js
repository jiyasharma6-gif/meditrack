import express from "express";
import { getExpiryReport } from "../controllers/expiry.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/report", authMiddleware, getExpiryReport);

export default router;
