import express from "express";

const router = express.Router();

router.get("/stats", (req, res) => {
  res.json({ message: "Sales API working" });
});

export default router;
