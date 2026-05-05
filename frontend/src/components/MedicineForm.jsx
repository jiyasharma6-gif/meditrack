import { useState } from "react";

function MedicineForm({ addMedicine }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = () => {
    if (!name || !price) return alert("Enter name & price");

    addMedicine({ name, price, stock, expiry });

    setName("");
    setPrice("");
    setStock("");
    setExpiry("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        placeholder="Medicine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <input
        type="date"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default MedicineForm;