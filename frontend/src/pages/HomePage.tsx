import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { getStockLessThan5, getTopItems } from "../api/item-api";
import ItemsPerCategory from "../components/cards/ItemsPerCategory";
import LowStockItemCard from "../components/cards/LowStockItemCard";
import SalesPerDay from "../components/cards/SalesPerDay";
import TopItemCard from "../components/cards/TopItemCard";
import type { CustomResponse } from "../types/custom-response";
import type { Item } from "../types/item";
import type { ItemSold } from "../types/item-sold";

const HomePage = () => {
  const { topItems, lowStockItems } = useLoaderData() as {
    topItems: CustomResponse<Array<ItemSold>> | null;
    lowStockItems: CustomResponse<Array<Item>> | null;
  };

  return (
    <div className="grid grid-cols-2 space-x-4 space-y-4 font-exo text-slate-900 dark:text-slate-200 grow">
      <div className="col-span-2">
        <ItemsPerCategory />
      </div>
      <div className="col-span-2">
        <SalesPerDay />
      </div>
      <div className="col-span-1">
        <Suspense fallback={<p>Loading top items...</p>}>
          <Await
            resolve={topItems}
            children={(resolvedTopItems) => (
              <TopItemCard topItems={resolvedTopItems?.data} />
            )}
          />
        </Suspense>
      </div>
      <div className="col-span-1">
        <Suspense fallback={<p>Loading low stock items...</p>}>
          <Await
            resolve={lowStockItems}
            children={(resolvedLowStockItems) => (
              <LowStockItemCard lowStockItems={resolvedLowStockItems?.data} />
            )}
          />
        </Suspense>
      </div>
    </div>
  );
};

export const loader = () => {
  return defer({
    topItems: getTopItems(),
    lowStockItems: getStockLessThan5(),
  });
};

export default HomePage;
