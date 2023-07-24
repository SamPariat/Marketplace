import { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import type { Quantity } from "../forms/AddBillFormPage";

type ItemCardProps = {
  name: string;
  price: number;
  stock: number;
  itemId?: number;
  updateQuantity: React.Dispatch<React.SetStateAction<Quantity>>; // A function to pass the state to the AddBillFormPage
};

const ItemCard = ({ name, price, stock, updateQuantity }: ItemCardProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleUpdateQuantity = () =>
    updateQuantity((prevQuantities) => {
      return {
        ...prevQuantities,
        [name]: { qty: quantity, amt: quantity * price },
      };
    });

  const handleClick = (sign: "minus" | "plus") => {
    if (sign === "minus") {
      if (quantity - 1 >= 0) {
        setQuantity(quantity - 1);
      } else {
        toast.info(`Item quantity of '${name}' cannot be negative`);
      }
    } else if (sign === "plus") {
      if (quantity + 1 <= stock) {
        setQuantity(quantity + 1);
      } else {
        toast.info(`Item quantity of '${name}' cannot exceed available stock`);
      }
    }
  };

  useEffect(() => {
    handleUpdateQuantity();
  }, [quantity]);

  return (
    <div className="font-raleway flex flex-col items-center justify-between w-full h-full px-2 py-2 mt-2 bg-sky-200 dark:bg-slate-700 rounded-lg select-none">
      <span className="flex flex-col">
        <p className="text-md font-medium">{name}</p>
        <p className="text-xs">&#8377;{price}</p>
        <p className="text-xs">{`Stock: ${stock}`}</p>
      </span>
      <span className="flex flex-row items-center gap-2 relative">
        <AiOutlineMinus
          className="text-xl hover:cursor-pointer"
          onClick={() => handleClick("minus")}
        />
        <p className="text-lg font-semibold">{quantity}</p>
        <AiOutlinePlus
          className="text-xl hover:cursor-pointer"
          onClick={() => handleClick("plus")}
        />
      </span>
    </div>
  );
};

export default ItemCard;