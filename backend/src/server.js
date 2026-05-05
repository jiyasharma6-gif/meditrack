// IMPORTS
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ ADD THIS

// LOAD ENV
dotenv.config();

// INIT APP
const app = express();

// ✅ MIDDLEWARE
app.use(cors()); // ✅ VERY IMPORTANT
app.use(express.json());

// 🔹 DEBUG (optional)
console.log("URI:", process.env.MONGO_URI);

// 🔹 MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    console.log("DB:", mongoose.connection.name);
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// 🔹 SCHEMA
const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  expiry: { type: Date }
});

const Medicine = mongoose.model("Medicine", medicineSchema);

// 🔹 ROUTES

// TEST
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ➕ CREATE
app.post("/medicine", async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 GET ALL
app.get("/medicine", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE
app.put("/medicine/:id", async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE
app.delete("/medicine/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 START SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});