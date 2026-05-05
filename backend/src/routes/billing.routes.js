import express from "express";

const router = express.Router();

router.post("/create", (req, res) => {
  res.json({ message: "Billing API working" });
});

export default router;
