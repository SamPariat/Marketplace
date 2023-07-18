import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type ItemCardProps = {
  name: string;
  price: number;
};

const ItemCard = ({ name, price }: ItemCardProps) => {
  return (
    <div className="font-raleway flex flex-col items-center justify-between w-full h-full px-2 py-2 mt-2 bg-sky-200 dark:bg-slate-700 rounded-lg">
      <span className="flex flex-col items-start">
        <p className="text-md font-medium">{name}</p>
        <p className="text-xs">&#8377;{price}</p>
      </span>
      <span className="flex flex-row items-center gap-2 relative">
        <AiOutlineMinus className="text-xl hover:cursor-pointer" />
        <p className="text-lg font-semibold">3</p>
        <AiOutlinePlus className="text-xl hover:cursor-pointer" />
      </span>
    </div>
  );
};

export default ItemCard;
