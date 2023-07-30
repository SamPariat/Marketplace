import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { getSalesPerDay } from "../../api/billing-api";
import useGetData from "../../utils/hooks/useGetData";

const SalesPerDay = () => {
  const { data: salesPerDay } = useGetData(getSalesPerDay);
  salesPerDay?.forEach(
    (salePerDay) =>
      (salePerDay.date = new Date(salePerDay.date).toLocaleDateString())
  );

  if (!salesPerDay) {
    return <p>No items</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold text-center my-4">Sales per day</h1>
      <LineChart data={salesPerDay} width={750} height={350}>
        <Tooltip />
        <XAxis dataKey="date" />
        <YAxis width={100} />
        <Line dataKey="sales" fill="#38bdf8" width={1} />
      </LineChart>
    </div>
  );
};

export default SalesPerDay;
