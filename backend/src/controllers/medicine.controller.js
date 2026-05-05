import Medicine from "../models/Medicine.js";

/**
 * Add medicine
 */
export const addMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create({
      ...req.body,
      shopId: req.user.id
    });

    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: "Failed to add medicine" });
  }
};

/**
 * Get all medicines
 */
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ shopId: req.user.id });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch medicines" });
  }
};
