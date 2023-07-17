import { getAllCategories } from "../api/category-api";
import type { Category } from "../types/category";
import useGetData from "../utils/hooks/useGetData";

const CategoriesPage = () => {
  const { data: categories } = useGetData(getAllCategories);

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <div className="flex  items-center justify-center">
        <table className="table-auto slate-900 dark:text-slate-200 font-exo border border-slate-500 border-separate">
          <thead className="font-semibold">
            <tr>
              <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
                Category Id
              </th>
              <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
                Category Name
              </th>
              <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
                Is Tax Applicable
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category: Category) => (
              <tr key={category.id}>
                <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                  {category.id}
                </td>
                <td className="px-6 py-2 text-left border border-slate-500 bg-blue-100 dark:bg-slate-600">
                  {category.name}
                </td>
                <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                  {category.isTaxApplicable ? "True" : "False"}
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
                    Category Id
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
                    Category Name
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
                    Is Tax Applicable
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

export default CategoriesPage;
