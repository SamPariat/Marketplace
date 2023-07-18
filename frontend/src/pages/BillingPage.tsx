import { useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { getAllBills } from "../api/billing-api";
import Button from "../components/buttons/Button";
import type { Bill } from "../types/bill";
import useGetData from "../utils/hooks/useGetData";

const BillingPage = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { data: bills } = useGetData(getAllBills);
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
              Service Tax
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              CGST
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              SGST
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Discount %
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Discount Amount
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Total Amount
            </th>
            <th className="px-6 py-2 border border-slate-500 bg-blue-400 dark:bg-slate-700">
              Biller ID
            </th>
          </tr>
        </thead>
        <tbody>
          {bills?.map((bill: Bill) => (
            <tr
              key={bill.billId}
              className="hover:cursor-pointer"
              onClick={() => navigate(`${bill.billId}`)}
            >
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.billId}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.serviceTax}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.cgst}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.sgst}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.discountPercentage}%
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.discountAmount}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.totalAmount}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.billerId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        text={!isAdding ? "Create Bill" : "Cancel"}
        clickHandler={() => setIsAdding(!isAdding)}
      />

      {isAdding && <p>Form khulega</p>}
    </div>
  );
};

export default BillingPage;
