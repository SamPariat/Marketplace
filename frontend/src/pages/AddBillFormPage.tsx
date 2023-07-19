import { Suspense, useMemo, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { getItems } from "../api/item-api";
import BillItem from "../components/cards/BillItem";
import CalculateCard from "../components/cards/CalculateCard";
import ItemCard from "../components/cards/ItemCard";
import type { Item } from "../types/item";

export type Quantity = {
  [key: string]: { qty: number; amt: number };
};

const AddBillForm = () => {
  const { items } = useLoaderData() as { items: Array<Item> | null };
  const [itemAndQty, setItemAndQty] = useState<Quantity>({} as Quantity);

  const calculatedTotal = useMemo(() => {
    let total = 0;
    Object.keys(itemAndQty).map((itemName) => {
      const { amt } = itemAndQty[itemName];
      total += amt;
    });
    return total;
  }, [itemAndQty]);

  return (
    <div className="grid grid-cols-3 gap-5 grow">
      <div className="col-span-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200">
        <div className="grid grid-cols-5 gap-4 text-center px-4 py-4">
          <Suspense fallback={<p className="font-raleway">Loading...</p>}>
            <Await
              resolve={items}
              children={(resolvedItems) => (
                <>
                  {resolvedItems?.data?.map((item: Item) => (
                    <ItemCard
                      name={item.name}
                      price={item.price}
                      stock={item.stock}
                      itemId={item.itemId}
                      key={item.itemId}
                      updateQuantity={setItemAndQty}
                    />
                  ))}
                </>
              )}
            />
          </Suspense>
        </div>
      </div>

      <div className="col-span-1 flex flex-col font-exo text-slate-900 dark:text-slate-200 mr-4 my-4 gap-2">
        <div className="grid grid-cols-1 gap-2 h-auto py-4 bg-slate-200 dark:bg-slate-800 rounded-md">
          {Object.keys(itemAndQty).map((itemName) => (
            <BillItem
              name={itemName}
              quantity={itemAndQty[itemName].qty}
              totalPrice={itemAndQty[itemName].amt}
              key={itemName}
            />
          ))}
        </div>
        <CalculateCard
          subtotal={calculatedTotal}
          tax={0}
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
