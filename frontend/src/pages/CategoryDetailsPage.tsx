import { useParams } from "react-router-dom";

import { getCategory } from "../api/category-api";
import type { Category } from "../types/category";
import useGetData from "../utils/hooks/useGetData";

const CategoryDetailsPage = () => {
  const { categoryId } = useParams();

  const { data: category } = useGetData<Category>(() =>
    getCategory(Number.parseInt(categoryId!))
  );

  return (
    <div className="flex flex-grow justify-center items-center font-exo">
      <div className="bg-slate-200 dark:bg-slate-900 rounded-lg text-slate-900 dark:text-slate-200 w-1/2 px-5 py-5">
        <h1 className="font-semibold text-3xl text-center mb-4">
          Details for category id - {category?.id}
        </h1>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Category Id</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {category?.id}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Name</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {category?.name}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Tax Applicable</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {category?.isTaxApplicable ? "True" : "False"}
          </p>
        </span>
      </div>
    </div>
  );
};

export default CategoryDetailsPage;
