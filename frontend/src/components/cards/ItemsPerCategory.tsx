import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import useGetData from "../../utils/hooks/useGetData";
import { getItemsPerCategory } from "../../api/category-api";

const ItemsPerCategory = () => {
  const { data: itemsPerCategory } = useGetData(getItemsPerCategory);

  if (!itemsPerCategory) {
    return <p>No items</p>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-2">
      <h1 className="text-xl font-bold text-center my-4">Total items per category</h1>
      <BarChart data={itemsPerCategory} width={750} height={350}>
        <Tooltip />
        <XAxis dataKey="categoryName" />
        <YAxis />
        <Bar dataKey="itemsSold" fill="#38bdf8" width={1} />
      </BarChart>
    </div>
  );
};

export default ItemsPerCategory;
