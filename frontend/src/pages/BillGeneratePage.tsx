import { useLocation } from "react-router-dom";

import { addBill } from "../api/billing-api";
import Button from "../components/buttons/Button";
import type { Bill, BillingRequest } from "../types/bill";
import type { NameIdQuantity } from "../types/name-id-quantity";
import usePostData from "../utils/hooks/usePostData";
import type { Quantity } from "./AddBillFormPage";
import { useAppSelector } from "../utils/hooks/useAppSelector";
import { RootState } from "../redux";

type LocationStateType = {
  itemAndQty: Quantity;
  subtotal: number;
  total: number;
  discount: number;
};

const BillGeneratePage = () => {
  // const [consumer, setConsumer] = useState<Consumer>({} as Consumer);
  const userId = useAppSelector((state: RootState) => state.user.id);
  const location = useLocation();
  const { postData } = usePostData<Bill, BillingRequest>(addBill);

  // Passed from AddBillFormPage -> CalculateCard as props -> BillGeneratePage as state of navigation
  const { itemAndQty, subtotal, total, discount } =
    location.state as LocationStateType;

  const gst = 0.18 * total;
  const priceAfterGST = gst + total;
  const discountRupees = subtotal - total;

  const submitBillHandler = async () => {
    // Filter out the items that were submitted from the previous page
    const boughtItems = Object.values(itemAndQty).filter(
      (item) => item.qty > 0
    );

    // Generate itemQuantities for the backend request
    const itemQuantities = [] as Array<NameIdQuantity>;
    for (const [name, info] of Object.entries(itemAndQty)) {
      if (info.qty > 0) {
        itemQuantities.push({ name, itemId: info.itemId, quantity: info.qty });
      }
    }

    // Get the id's of the items bought by the user
    const items = boughtItems.reduce((prevValue, currValue) => {
      return [...prevValue, { itemId: currValue.itemId }];
    }, [] as Array<{ itemId: number }>);

    await postData({
      billingTable: {
        serviceTax: 0,
        billerId: userId!,
        cgst: gst / 2,
        sgst: gst / 2,
        items,
        discountAmount: discountRupees,
        discountPercentage: discount,
        totalAmount: total,
      },
      itemQuantities,
    });
  };

  return (
    <div className="flex flex-col space-y-6 my-10 text-slate-900 dark:text-slate-200 w-2/5 m-auto font-raleway">
      <div className="flex flex-col bg-slate-200 dark:bg-slate-600 rounded-xl items-center shadow-lg py-2">
        <h1 className="text-5xl my-4 font-bold">Admin Panel</h1>
        <h2 className="text-3xl my-2">Your Bill</h2>
      </div>
      <div className="flex flex-col bg-slate-200 dark:bg-slate-600 rounded-xl shadow-md px-6 py-3 divide-y divide-dashed">
        <h3 className="text-2xl font-bold py-4">Details</h3>
        <div className="pt-8 space-y-2">
          <span className="flex flex-row justify-between font-medium text-lg">
            <h4 className="text-slate-500 dark:text-slate-400">Subtotal</h4>
            <h4 className="font-medium">&#8377;{subtotal.toFixed(2)}</h4>
          </span>
          <span className="flex flex-row justify-between font-medium text-lg">
            <h4 className="text-slate-500 dark:text-slate-400">Total</h4>
            <h4 className="font-medium">&#8377;{total.toFixed(2)}</h4>
          </span>
          <span className="flex flex-row justify-between font-medium text-lg">
            <h4 className="text-slate-500 dark:text-slate-400">
              Total after GST
            </h4>
            <h4 className="font-medium">&#8377;{priceAfterGST.toFixed(2)}</h4>
          </span>
          <span className="flex flex-row justify-between font-medium text-lg">
            <h4 className="text-slate-500 dark:text-slate-400">
              Overall Discount (INR)
            </h4>
            <h4 className="font-medium">&#8377;{discountRupees.toFixed(2)}</h4>
          </span>
          <span className="flex flex-row justify-between font-medium text-lg">
            <h4 className="text-slate-500 dark:text-slate-400">
              Overall Discount (%)
            </h4>
            <h4 className="font-medium">{discount.toFixed(2)}%</h4>
          </span>
        </div>
      </div>
      {/* <AddConsumerForm setConsumer={setConsumer} /> */}
      <Button
        text="Save Bill"
        type="submit"
        rounded
        clickHandler={submitBillHandler}
      />
    </div>
  );
};

export default BillGeneratePage;
