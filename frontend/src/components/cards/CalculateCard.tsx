import { AnimatePresence, motion, Variants } from "framer-motion";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import type { Quantity } from "../../pages/AddBillFormPage";

type CalculateCardProps = {
  subtotal: number;
  total: number;
  discount: number;
  itemAndQty: Quantity;
};

const calculateCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Discount initially hidden as 0 can't be divided by 0 showing NaN
const CalculateCard = ({
  subtotal,
  discount,
  total,
  itemAndQty,
}: CalculateCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 py-4 rounded-md">
      <span className="flex flex-row justify-between w-3/4">
        <p>Subtotal</p>
        <p className="font-bold">&#8377;{subtotal.toFixed(2)}</p>
      </span>
      <AnimatePresence>
        {subtotal > 0 && total > 0 && (
          <motion.span
            className="flex flex-row justify-between w-3/4"
            key="discount"
            variants={calculateCardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p>Discount</p>
            <p>{discount.toFixed(2)}%</p>
          </motion.span>
        )}
      </AnimatePresence>
      <span className="flex flex-row justify-between w-3/4 my-4">
        <p className="text-2xl font-semibold font-raleway">Total</p>
        <p className="text-2xl font-bold font-raleway">
          &#8377;{total.toFixed(2)}
        </p>
      </span>
      <Button
        text="Generate Bill"
        type={undefined}
        disabled={total === 0}
        rounded
        clickHandler={() =>
          navigate("generate-bill", {
            state: { itemAndQty, total, subtotal, discount },
          })
        }
      />
    </div>
  );
};

export default CalculateCard;
