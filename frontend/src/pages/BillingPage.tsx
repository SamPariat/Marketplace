import { Outlet, useNavigate } from "react-router";

import { getAllBills } from "../api/billing-api";
import Button from "../components/buttons/Button";
import type { Bill } from "../types/bill";
import useGetData from "../utils/hooks/useGetData";

const BillingPage = () => {
  const { data: bills } = useGetData(getAllBills);
  const navigate = useNavigate();

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <Outlet />
      <table className="table-auto text-slate-900 dark:text-slate-200 font-exo text-sm border border-slate-500 border-separate">
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
                {bill.serviceTax.toFixed(2)}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.cgst.toFixed(2)}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.sgst.toFixed(2)}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.discountPercentage.toFixed(2)}%
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.discountAmount.toFixed(2)}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.totalAmount.toFixed(2)}
              </td>
              <td className="px-6 py-2 text-center border border-slate-500 bg-blue-100 dark:bg-slate-600">
                {bill.billerId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        type={undefined}
        text="Create bill"
        clickHandler={() => navigate("new-bill")}
      />
    </div>
  );
};

export default BillingPage;
