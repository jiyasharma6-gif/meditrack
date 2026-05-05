function MedicineList({ medicines, deleteMedicine, updateMedicine, search }) {
  return (
    <>
      {medicines
        .filter((med) =>
          med.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((med) => {
          const today = new Date();
          const expiryDate = med.expiry ? new Date(med.expiry) : null;
          const diff = expiryDate ? expiryDate - today : null;

          return (
            <div
              key={med._id}
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3>{med.name}</h3>

              <p>💰 Price: ₹{med.price}</p>
              <p>📦 Stock: {med.stock}</p>
              <p>
                📅 Expiry:{" "}
                {expiryDate
                  ? expiryDate.toLocaleDateString()
                  : "N/A"}
              </p>

              {/* ⚠ Low Stock */}
              {med.stock < 10 && (
                <p style={{ color: "red" }}>⚠ Low Stock</p>
              )}

              {/* ❌ Expired */}
              {expiryDate && expiryDate < today && (
                <p style={{ color: "red" }}>❌ Expired</p>
              )}

              {/* ⚠ Expiring Soon */}
              {expiryDate &&
                expiryDate > today &&
                diff < 7 * 24 * 60 * 60 * 1000 && (
                  <p style={{ color: "orange" }}>
                    ⚠ Expiring Soon
                  </p>
                )}

              {/* 🔘 Buttons */}
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => deleteMedicine(med._id)}
                  style={{
                    marginRight: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => updateMedicine(med._id)}
                  style={{
                    background: "blue",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default MedicineList;