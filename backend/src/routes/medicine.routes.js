import express from "express";
import { addMedicine, getMedicines } from "../controllers/medicine.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addMedicine);
router.get("/all", authMiddleware, getMedicines);

export default router;
