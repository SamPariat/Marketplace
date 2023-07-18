import { getItems } from "../api/item-api";
import BillItem from "../components/cards/BillItem";
import CalculateCard from "../components/cards/CalculateCard";
import ItemCard from "../components/cards/ItemCard";
import type { Item } from "../types/item";
import useGetData from "../utils/hooks/useGetData";

const AddBillForm = () => {
  const { data: items } = useGetData<Array<Item>>(() => getItems());

  return (
    <div className="grid grid-cols-3 gap-5 grow">
      <div className="col-span-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200">
        <div className="grid grid-cols-5 gap-4 text-center px-4 py-4">
          {items?.map((item) => (
            <ItemCard name={item.name} price={item.price} key={item.itemId} />
          ))}
        </div>
      </div>

      <div className="col-span-1 flex flex-col font-exo text-slate-900 dark:text-slate-200 mr-4 my-4 gap-2">
        <div className="grid grid-cols-1 gap-2 h-auto py-4 bg-slate-200 dark:bg-slate-800">
          {items?.map((item) => (
            <BillItem name={item.name} quantity={1} totalPrice={123} key={item.itemId} />
          ))}
        </div>
        <CalculateCard subtotal={1234} tax={0} total={1234} />
      </div>
    </div>
  );
};

export default AddBillForm;
