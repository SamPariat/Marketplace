type BillItemProps = {
  name: string;
  quantity: number;
  totalPrice: number;
};

const BillItem = ({ name, quantity, totalPrice }: BillItemProps) => {
  return (
    <span className="font-raleway flex flex-row m-auto items-center justify-around gap-4 bg-sky-200 dark:bg-slate-700 px-4 py-2 w-4/5 rounded-2xl">
      <span className="flex flex-row items-center gap-4">
        <p className="text-xs">{name}</p>
        <p className="text-sm">x {quantity}</p>
      </span>
      <p className="text-sm font-semibold">&#8377;{totalPrice.toFixed(2)}</p>
    </span>
  );
};

export default BillItem;
