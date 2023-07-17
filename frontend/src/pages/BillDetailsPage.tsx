import { Link, useParams } from "react-router-dom";

import { getBillById } from "../api/billing-api";
import type { Bill } from "../types/bill";
import useGetData from "../utils/hooks/useGetData";

const BillDetailsPage = () => {
  const { billId } = useParams();

  const { data: bill } = useGetData<Bill>(() =>
    getBillById(Number.parseInt(billId!))
  );

  return (
    <div className="flex flex-grow justify-center items-center font-exo">
      <div className="bg-slate-200 dark:bg-slate-900 rounded-lg text-slate-900 dark:text-slate-200 w-1/2 px-5 py-5">
        <h1 className="font-semibold text-3xl text-center mb-4">
          Details for bill id - {bill?.billId}
        </h1>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Bill Id</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {bill?.billId}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Biller Id</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {bill?.billerId}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Service Tax</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {bill?.serviceTax}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>CGST</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {bill?.cgst}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>SGST</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {bill?.sgst}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Discount %</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {bill?.discountPercentage}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Discount Amount</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {bill?.discountAmount}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Total Amount</p>
          <p className="bg-slate-300 dark:bg-slate-600 rounded-md w-fit py-1 px-10">
            {bill?.totalAmount}
          </p>
        </span>
        <span className="flex flex-row items-center justify-between my-2">
          <p>Items</p>
          <ul className="marker:text-sky-700 dark:marker:text-sky-300 list-disc">
            {bill?.items.map((item) => (
              <li key={item.itemId}>
                <Link
                  to={`/items/${item.itemId}`}
                  className="hover:underline underline-offset-2 hover:text-sky-700 dark:hover:text-sky-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default BillDetailsPage;
