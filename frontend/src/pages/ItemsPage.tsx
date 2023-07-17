import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getItems } from "../api/item-api";
import Button from "../components/buttons/Button";
import { Item } from "../types/item";
import useGetData from "../utils/hooks/useGetData";

const ItemsPage = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { data: items } = useGetData(getItems);
  const navigate = useNavigate();

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <Outlet />
      <table className="table-auto slate-900 dark:text-slate-200 font-exo text-sm border border-slate-500 border-separate">
        <thead className="font-semibold">
          <tr>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              ID
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Name
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Price
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Stock
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Discount %
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Discount Price
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Active
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item: Item) => (
            <tr
              key={item.itemId}
              onClick={() => navigate(`/categories/${item.category.id}`)}
              className="hover:cursor-pointer"
            >
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {item.itemId}
              </td>
              <td className="px-6 py-2 text-left border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {item.name}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {item.price}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {item.stock}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {item.discountPer}%
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {item.discountPrice}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {item.active ? "True" : "False"}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {item.category.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        text={!isAdding ? "Add Item" : "Cancel"}
        clickHandler={() => setIsAdding(!isAdding)}
      />

      {isAdding && <p>Form khulega</p>}
    </div>
  );
};

export default ItemsPage;
