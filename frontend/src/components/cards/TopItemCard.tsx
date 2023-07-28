import type { ItemSold } from "../../types/item-sold";

type TopItemCardProps = {
  topItems: Array<ItemSold>;
};

const TopItemCard = ({ topItems }: TopItemCardProps) => {
  return (
    <div className="flex flex-col shadow-md mx-4">
      <h1 className="text-xl font-bold text-center my-4">Top {topItems.length} items sold</h1>
      <table className="table-auto border-separate border border-slate-500 text-sm">
        <thead>
          <tr>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Item Name
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Units Sold
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Seller
            </th>
          </tr>
        </thead>
        <tbody>
          {topItems.map((topItem) => (
            <tr key={`${topItem.name} ${topItem.quantity} ${topItem.soldBy}`}>
              <td className="px-6 py-2 border border-slate-500 bg-blue-100 dark:bg-slate-600 text-center">
                {topItem.name}
              </td>
              <td className="px-6 py-2 border border-slate-500 bg-blue-100 dark:bg-slate-600 text-center">
                {topItem.quantity}
              </td>
              <td className="px-6 py-2 border border-slate-500 bg-blue-100 dark:bg-slate-600 text-center">
                {topItem.soldBy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopItemCard;
