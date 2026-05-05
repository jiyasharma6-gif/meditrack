import express from "express";

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({ message: "Subscription API working" });
});

export default router;
