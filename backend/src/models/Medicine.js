import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    batchNo: String,
    quantity: {
      type: Number,
      required: true
    },
    price: Number,
    mrp: Number,
    expiryDate: {
      type: Date,
      required: true
    },
    manufacturer: String,
    category: String
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
