import Medicine from "../models/Medicine.js";

export const getExpiryReport = async (req, res) => {
  try {
    const today = new Date();
    const ninetyDaysLater = new Date();
    ninetyDaysLater.setDate(today.getDate() + 90);

    const medicines = await Medicine.find({
      shopId: req.user.id
    });

    const expired = [];
    const nearExpiry = [];

    medicines.forEach((med) => {
      if (med.expiryDate < today) {
        expired.push(med);
      } else if (med.expiryDate <= ninetyDaysLater) {
        nearExpiry.push(med);
      }
    });

    res.json({
      expiredCount: expired.length,
      nearExpiryCount: nearExpiry.length,
      expired,
      nearExpiry
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate expiry report" });
  }
};
