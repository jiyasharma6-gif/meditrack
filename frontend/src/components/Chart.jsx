import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function Chart({ medicines }) {
  const data = [
    {
      name: "Total",
      value: medicines.length
    },
    {
      name: "Low Stock",
      value: medicines.filter((m) => m.stock < 10).length
    },
    {
      name: "Expired",
      value: medicines.filter(
        (m) => m.expiry && new Date(m.expiry) < new Date()
      ).length
    }
  ];

  return (
    <BarChart width={300} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  );
}

export default Chart;