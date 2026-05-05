import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  subscriptionPlan: { type: String, default: "TRIAL" },
  subscriptionExpiry: Date
}, { timestamps: true });

export default mongoose.model("User", userSchema);
