import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";
import { getAllCategories } from "../api/category-api";
import type { Category } from "../types/category";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Array<Category> | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await toast.promise(getAllCategories(), {
          pending: "Fetching categories...",
          success: "Categories retrieved successfully",
          error: "Error fetching categories",
        });

        setCategories(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new AxiosError(error.message);
        } else if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-3/4">
      <table className="table-auto slate-900 dark:text-slate-200 font-exo">
        <thead className="uppercase">
          <tr>
            <th className="px-6 py-2">Category Id</th>
            <th className="px-6 py-2">Category Name</th>
            <th className="px-6 py-2">Is Tax Applicable</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-2 text-center">{category.id}</td>
              <td className="px-6 py-2 text-left">{category.name}</td>
              <td className="px-6 py-2 text-center">
                {category.isTaxApplicable ? "True" : "False"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
