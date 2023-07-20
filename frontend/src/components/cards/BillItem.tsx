import { Variants, motion } from "framer-motion";

type BillItemProps = {
  name: string;
  quantity: number;
  totalPrice: number;
};

const billItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const BillItem = ({ name, quantity, totalPrice }: BillItemProps) => {
  return (
    <motion.span
      className="font-raleway flex flex-row m-auto items-center justify-around gap-4 bg-sky-200 dark:bg-slate-700 px-4 py-2 w-4/5 rounded-2xl"
      variants={billItemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <span className="flex flex-row items-center gap-4">
        <p className="text-xs">{name}</p>
        <p className="text-sm">x {quantity}</p>
      </span>
      <p className="text-sm font-semibold">&#8377;{totalPrice.toFixed(2)}</p>
    </motion.span>
  );
};

export default BillItem;
