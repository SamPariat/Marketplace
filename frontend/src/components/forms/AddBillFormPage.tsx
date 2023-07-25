import { AnimatePresence } from "framer-motion";
import { Suspense, useMemo, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { getItems } from "../../api/item-api";
import BillItem from "../../components/cards/BillItem";
import CalculateCard from "../../components/cards/CalculateCard";
import ItemList from "../../components/cards/ItemList";
import type { Item } from "../../types/item";

export type Quantity = {
  [key: string]: { qty: number; amt: number; discountAmt: number };
};

const AddBillForm = () => {
  const { items } = useLoaderData() as { items: Array<Item> | null };
  const [itemAndQty, setItemAndQty] = useState<Quantity>({} as Quantity);
  const [filter, setFilter] = useState<string>("");

  // Optimized calculation of the subtotal before adding in the discount factor
  const calculatedSubTotal = useMemo(() => {
    let subtotal = 0;
    Object.keys(itemAndQty).map((itemName) => {
      const { amt } = itemAndQty[itemName];
      subtotal += amt;
    });
    return subtotal;
  }, [itemAndQty]);

  // Optimized calculation of the total after the discount
  const calculatedTotal = useMemo(() => {
    let total = 0;
    Object.keys(itemAndQty).map((itemName) => {
      const { discountAmt } = itemAndQty[itemName];
      total += discountAmt;
    });
    return total;
  }, [itemAndQty]);

  // Calculates the overall discount percentage
  const calculatedDiscountPercent = useMemo(() => {
    return 100 * (1 - calculatedTotal / calculatedSubTotal);
  }, [itemAndQty]);

  return (
    <div className="grid grid-cols-3 gap-5 grow">
      <div className="col-span-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200">
        <input
          type="text"
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Enter item name"
          className="font-raleway bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-200 px-4 py-2 rounded-md text-center ml-4 mt-4"
        />
        <div className="grid grid-cols-5 gap-4 text-center px-4 py-4">
          <Suspense fallback={<p className="font-raleway">Loading...</p>}>
            <Await
              resolve={items}
              children={(resolvedItems) => (
                <ItemList
                  renderedItems={resolvedItems?.data}
                  updateQuantity={setItemAndQty}
                  filter={filter}
                />
              )}
            />
          </Suspense>
        </div>
      </div>

      <div className="col-span-1 flex flex-col font-exo text-slate-900 dark:text-slate-200 mr-4 my-4 gap-2">
        <div className="grid grid-cols-1 gap-2 h-auto py-4 bg-slate-200 dark:bg-slate-800 rounded-md">
          {Object.keys(itemAndQty).map((itemName, index) => (
            <AnimatePresence key={index}>
              {itemAndQty[itemName].qty > 0 && (
                <BillItem
                  name={itemName}
                  quantity={itemAndQty[itemName].qty}
                  totalPrice={itemAndQty[itemName].amt}
                  key={itemName}
                />
              )}
            </AnimatePresence>
          ))}
        </div>
        <CalculateCard
          subtotal={calculatedSubTotal}
          discount={calculatedDiscountPercent}
          total={calculatedTotal}
        />
      </div>
    </div>
  );
};

export const loader = () => {
  return defer({
    items: getItems(),
  });
};

export default AddBillForm;
