import type { Item } from "../../types/item";

type LowStockItemCardProps = {
  lowStockItems: Array<Item>;
};

const LowStockItemCard = ({ lowStockItems }: LowStockItemCardProps) => {
  return (
    <div className="flex flex-col shadow-md mx-4">
      <h1 className="text-xl font-bold text-center my-4">
        List of items almost out of stock
      </h1>
      <table className="table-auto border-separate border border-slate-500 text-sm">
        <thead>
          <tr>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Item Name
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Stock
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Supplier
            </th>
          </tr>
        </thead>
        <tbody>
          {lowStockItems.map((lowStockItem) => (
            <tr
              key={`${lowStockItem.name} ${lowStockItem.stock} ${lowStockItem.supplier}`}
            >
              <td className="px-6 py-2 border border-slate-500 bg-blue-100 dark:bg-slate-600 text-center">
                {lowStockItem.name}
              </td>
              <td className="px-6 py-2 border border-slate-500 bg-blue-100 dark:bg-slate-600 text-center">
                {lowStockItem.stock}
              </td>
              <td className="px-6 py-2 border border-slate-500 bg-blue-100 dark:bg-slate-600 text-center">
                {lowStockItem.supplier}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockItemCard;
