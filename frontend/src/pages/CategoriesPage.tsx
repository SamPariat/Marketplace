import { useState } from "react";

import { getAllCategories } from "../api/category-api";
import Button from "../components/buttons/Button";
import AddCategoryForm from "../components/forms/AddCategoryForm";
import type { Category } from "../types/category";
import useGetData from "../utils/hooks/useGetData";

const CategoriesPage = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { data: categories } = useGetData(getAllCategories);

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      {!isAdding && (
        <table className="table-auto text-slate-900 dark:text-slate-200 font-exo border border-slate-500 border-separate">
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
      )}

      {isAdding && <AddCategoryForm />}
      
      <Button
        text={!isAdding ? "Add Category" : "Cancel"}
        clickHandler={() => setIsAdding(!isAdding)}
      />
    </div>
  );
};

export default CategoriesPage;
