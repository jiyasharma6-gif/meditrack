import { useEffect, useState } from "react";
import API from "./api";
import MedicineForm from "./components/MedicineForm";
import MedicineList from "./components/MedicineList";
import Dashboard from "./components/Dashboard";
import Chart from "./components/Chart";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Fetch data
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const res = await API.get("/medicine");
    setMedicines(res.data);
  };

  // ➕ Add
  const addMedicine = async (data) => {
    await API.post("/medicine", data);
    fetchMedicines();
  };

  // ❌ Delete
  const deleteMedicine = async (id) => {
    await API.delete(`/medicine/${id}`);
    fetchMedicines();
  };

  // ✏️ Update
  const updateMedicine = async (id) => {
    const newPrice = prompt("Enter new price:");
    const newStock = prompt("Enter new stock:");

    if (!newPrice && !newStock) return;

    await API.put(`/medicine/${id}`, {
      price: newPrice,
      stock: newStock
    });

    fetchMedicines();
  };

  // 🔔 ALERTS (expired medicines)
  useEffect(() => {
    const expired = medicines.filter(
      (med) => med.expiry && new Date(med.expiry) < new Date()
    );

    if (expired.length > 0) {
      alert(`⚠ ${expired.length} medicines are expired!`);
    }
  }, [medicines]);

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Meditrack 💊</h1>

      {/* 📊 DASHBOARD */}
      <Dashboard medicines={medicines} />

      {/* 📈 CHART */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Chart medicines={medicines} />
      </div>

      {/* 🔍 SEARCH */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* ➕ FORM */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px",
          margin: "auto",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <MedicineForm addMedicine={addMedicine} />
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* 📦 LIST */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        <MedicineList
          medicines={medicines}
          deleteMedicine={deleteMedicine}
          updateMedicine={updateMedicine}
          search={search}
        />
      </div>
    </div>
  );
}

export default App;