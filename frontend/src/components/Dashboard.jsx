function Dashboard({ medicines }) {
  const total = medicines.length;

  const lowStock = medicines.filter((med) => med.stock < 10).length;

  const expired = medicines.filter(
    (med) => med.expiry && new Date(med.expiry) < new Date()
  ).length;

  const expiringSoon = medicines.filter((med) => {
    if (!med.expiry) return false;
    const diff = new Date(med.expiry) - new Date();
    return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div style={container}>
      <Card title="Total" value={total} />
      <Card title="Low Stock" value={lowStock} color="orange" />
      <Card title="Expired" value={expired} color="red" />
      <Card title="Expiring Soon" value={expiringSoon} color="purple" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{ ...cardStyle, borderTop: `5px solid ${color || "#333"}` }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "20px", color }}>{value}</p>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "20px",
  flexWrap: "wrap",
  gap: "10px"
};

const cardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  width: "150px",
  textAlign: "center"
};

export default Dashboard;