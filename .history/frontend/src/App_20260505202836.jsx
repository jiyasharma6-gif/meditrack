import { useEffect, useState } from "react";
import API from "./api";
import MedicineForm from "./components/MedicineForm";
import MedicineList from "./components/MedicineList";
import Dashboard from "./components/Dashboard";
import Chart from "./components/Chart";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState([]);

  // 🔹 Fetch medicines
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await API.get("/medicine");
      setMedicines(res.data);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  // ➕ Add medicine
  const addMedicine = async (data) => {
    try {
      await API.post("/medicine", data);
      fetchMedicines();
    } catch (err) {
      console.error("Error adding medicine:", err);
    }
  };

  // ❌ Delete medicine
  const deleteMedicine = async (id) => {
    try {
      await API.delete(`/medicine/${id}`);
      fetchMedicines();
    } catch (err) {
      console.error("Error deleting medicine:", err);
    }
  };

  // ✏️ Update medicine
  const updateMedicine = async (id) => {
    const newPrice = prompt("Enter new price:");
    const newStock = prompt("Enter new stock:");

    if (!newPrice && !newStock) return;

    try {
      await API.put(`/medicine/${id}`, {
        price: newPrice,
        stock: newStock,
      });

      fetchMedicines();
    } catch (err) {
      console.error("Error updating medicine:", err);
    }
  };

  // 🔔 Expiry check (runs only when data changes)
  useEffect(() => {
    const expired = medicines.filter(
      (med) => med.expiry && new Date(med.expiry) < new Date()
    );

    if (expired.length > 0) {
      console.log(`⚠ ${expired.length} expired medicines found`);
    }
  }, [medicines]);

  // 🔍 FILTERED DATA (IMPORTANT FIX)
  const filteredMedicines = medicines.filter((med) =>
    med.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Meditrack 💊</h1>

      {/* 📊 Dashboard */}
      <Dashboard medicines={medicines} />

      {/* 📈 Chart */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Chart medicines={medicines} />
      </div>

      {/* 🔍 Search */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* ➕ Form */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px",
          margin: "auto",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <MedicineForm addMedicine={addMedicine} />
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* 📦 Medicine List (FILTER FIXED) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        <MedicineList
          medicines={filteredMedicines}
          deleteMedicine={deleteMedicine}
          updateMedicine={updateMedicine}
        />
      </div>
    </div>
  );
}

export default App;