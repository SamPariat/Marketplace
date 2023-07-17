import { Outlet } from "react-router-dom";

import { getItems } from "../api/item-api";
import useGetData from "../utils/hooks/useGetData";

const ItemsPage = () => {
  const { data: items } = useGetData(getItems);

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
            <div className="flex  items-center justify-center">

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
          {items?.map((item) => (
            <tr key={item.itemId}>
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
      </div>
      <div className="container flex items-center justify-center p-10">
        <form>
          <table className="slate-900 dark:text-slate-200 font-exo border border-slate-500 border-separate">
            <tbody>
              <tr className="border border-slate-500">
                <td className="border border-slate-500 flex items-center">
                  <label
                    htmlFor="categoryId"
                    className="font-semibold px-6 py-1 inline-block w-64  bg-blue-400 dark:bg-slate-700"
                  >
                    Id
                  </label>
                  <input
                    type="text"
                    id="categoryId"
                    name="categoryId"
                    className="w-full py-1 px-2  bg-blue-100 dark:bg-slate-600"
                  />
                </td>
              </tr>
              <tr className="border border-slate-500">
                <td className="border border-slate-500 flex items-center">
                  <label
                    htmlFor="categoryName"
                    className="font-semibold px-6 py-1 inline-block w-64  bg-blue-400 dark:bg-slate-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    className="w-full py-1 px-2  bg-blue-100 dark:bg-slate-600"
                  />
                </td>
              </tr>
              <tr className="border border-slate-500">
                <td className="border border-slate-500 flex items-center">
                  <label
                    htmlFor="isTaxApplicable"
                    className="font-semibold px-6 py-1 inline-block w-64  bg-blue-400 dark:bg-slate-700"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="isTaxApplicable"
                    name="isTaxApplicable"
                    className="w-full py-1 px-2  bg-blue-100 dark:bg-slate-600"
                  />
                </td>
              </tr>
              <tr className="border border-slate-500">
                <td className="border border-slate-500 flex items-center">
                  <label
                    htmlFor="isTaxApplicable"
                    className="font-semibold px-6 py-1 inline-block w-64  bg-blue-400 dark:bg-slate-700"
                  >
                    Stock
                  </label>
                  <input
                    type="text"
                    id="isTaxApplicable"
                    name="isTaxApplicable"
                    className="w-full py-1 px-2  bg-blue-100 dark:bg-slate-600"
                  />
                </td>
              </tr>
              <tr className="border border-slate-500">
                <td className="border border-slate-500 flex items-center">
                  <label
                    htmlFor="isTaxApplicable"
                    className="font-semibold px-6 py-1 inline-block w-64  bg-blue-400 dark:bg-slate-700"
                  >
                    Discount %
                  </label>
                  <input
                    type="text"
                    id="isTaxApplicable"
                    name="isTaxApplicable"
                    className="w-full py-1 px-2  bg-blue-100 dark:bg-slate-600"
                  />
                </td>
              </tr>
              <tr className="border border-slate-500">
                <td className="border border-slate-500 flex items-center">
                  <label
                    htmlFor="isTaxApplicable"
                    className="font-semibold px-6 py-1 inline-block w-64  bg-blue-400 dark:bg-slate-700"
                  >
                    Discount Price
                  </label>
                  <input
                    type="text"
                    id="isTaxApplicable"
                    name="isTaxApplicable"
                    className="w-full py-1 px-2  bg-blue-100 dark:bg-slate-600"
                  />
                </td>
              </tr>
              <tr className="border border-slate-500">
                <td className="border border-slate-500 flex items-center">
                  <label
                    htmlFor="isTaxApplicable"
                    className="font-semibold px-6 py-1 inline-block w-64  bg-blue-400 dark:bg-slate-700"
                  >
                    Active
                  </label>
                  <input
                    type="text"
                    id="isTaxApplicable"
                    name="isTaxApplicable"
                    className="w-full py-1 px-2  bg-blue-100 dark:bg-slate-600"
                  />
                </td>
              </tr>
              <tr className="border border-slate-500">
                <td className="border border-slate-500 flex items-center">
                  <label
                    htmlFor="isTaxApplicable"
                    className="font-semibold px-6 py-1 inline-block w-64  bg-blue-400 dark:bg-slate-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="isTaxApplicable"
                    name="isTaxApplicable"
                    className="w-full py-1 px-2  bg-blue-100 dark:bg-slate-600"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemsPage;
