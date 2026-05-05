import Medicine from "../models/Medicine.js";

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const ninetyDaysLater = new Date();
    ninetyDaysLater.setDate(today.getDate() + 90);

    const medicines = await Medicine.find({ shopId: req.user.id });

    let expired = 0;
    let nearExpiry = 0;
    let safe = 0;

    medicines.forEach((med) => {
      if (med.expiryDate < today) expired++;
      else if (med.expiryDate <= ninetyDaysLater) nearExpiry++;
      else safe++;
    });

    res.json({
      totalMedicines: medicines.length,
      expired,
      nearExpiry,
      safe
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};
