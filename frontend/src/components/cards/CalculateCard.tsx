import Button from "../buttons/Button";

type CalculateCardProps = {
  subtotal: number;
  total: number;
  tax: number;
};

const CalculateCard = ({ subtotal, tax, total }: CalculateCardProps) => {
  return (
    <div className="flex flex-col items-center bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 py-4 rounded-md">
      <span className="flex flex-row justify-between w-3/4">
        <p>Subtotal</p>
        <p className="font-bold">&#8377;{subtotal}</p>
      </span>
      <span className="flex flex-row justify-between w-3/4">
        <p>Tax</p>
        <p>{tax}%</p>
      </span>
      <span className="flex flex-row justify-between w-3/4 my-4">
        <p className="text-2xl font-semibold font-raleway">Total</p>
        <p className="text-2xl font-bold font-raleway">&#8377;{total}</p>
      </span>
      <Button text="Add Bill" type={undefined} rounded />
    </div>
  );
};

export default CalculateCard;
