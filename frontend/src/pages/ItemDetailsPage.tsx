import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useParams } from "react-router-dom";

import { getItemById } from "../api/item-api";
import UpdateItemForm from "../components/forms/UpdateItemForm";
import type { Item } from "../types/item";
import useGetData from "../utils/hooks/useGetData";

const ItemDetailsPage = () => {
  const { itemId } = useParams();
  const [updating, setUpdating] = useState(false);

  const { data: item } = useGetData<Item>(() =>
    getItemById(Number.parseInt(itemId!))
  );

  return (
    <div className="flex flex-grow justify-center items-center font-exo">
      <div className="bg-slate-200 dark:bg-slate-900 rounded-lg text-slate-900 dark:text-slate-200 w-1/2 px-5 py-5">
        <span className="flex flex-row justify-end gap-4">
          {!updating ? (
            <AiOutlineEdit
              onClick={() => setUpdating(true)}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <MdOutlineCancel
              onClick={() => setUpdating(false)}
              className="text-2xl cursor-pointer"
            />
          )}
        </span>
        <h1 className="font-semibold text-3xl text-center mb-4 select-none">
          Details for item id - {item?.itemId}
        </h1>
        {updating ? (
          <UpdateItemForm item={item!} />
        ) : (
          <>
            <span className="flex flex-row items-center justify-between my-2">
              <p>Item Id</p>
              <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
                {item?.itemId}
              </p>
            </span>
            <span className="flex flex-row items-center justify-between my-2">
              <p>Name</p>
              <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
                {item?.name}
              </p>
            </span>
            <span className="flex flex-row items-center justify-between my-2">
              <p>Price</p>
              <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
                {item?.price}
              </p>
            </span>
            <span className="flex flex-row items-center justify-between my-2">
              <p>Stock</p>
              <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
                {item?.stock}
              </p>
            </span>
            <span className="flex flex-row items-center justify-between my-2">
              <p>Active</p>
              <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
                {item?.active ? "True" : "False"}
              </p>
            </span>
            <span className="flex flex-row items-center justify-between my-2">
              <p>Discount %</p>
              <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
                {item?.discountPer}
              </p>
            </span>
            <span className="flex flex-row items-center justify-between my-2">
              <p>Cost Price</p>
              <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
                {item?.costPrice}
              </p>
            </span>
            <span className="flex flex-row items-center justify-between my-2">
              <p>Supplier</p>
              <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
                {item?.supplier}
              </p>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemDetailsPage;
