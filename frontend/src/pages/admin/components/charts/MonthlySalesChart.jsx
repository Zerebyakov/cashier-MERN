import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const MonthlySalesChart = ({ data }) => {
  const monthlyData = Array(12).fill(0);
  const uniqueTransactions = {};

  data.forEach((item) => {
    const id = item.transaction_id;
    if (!uniqueTransactions[id]) {
      const month = new Date(item.transaction.createdAt).getMonth();
      monthlyData[month]++;
      uniqueTransactions[id] = true;
    }
  });

  const chartData = monthlyData.map((count, index) => ({
    month: new Date(0, index).toLocaleString("default", { month: "short" }),
    count,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ fontSize: "14px" }}
            cursor={{ fill: "#e5e7eb" }}
          />
          <Legend />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesChart;
