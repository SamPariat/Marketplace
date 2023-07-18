import React from "react";

type ButtonProps = {
  text: string;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  type: "submit" | "button" | "reset" | undefined;
  disabled?: boolean;
};

/**
 *
 * @param ButtonProps
 * @returns A reusable button
 */
const Button = ({ text, clickHandler, type, disabled }: ButtonProps) => {
  return (
    <button
      className="text-slate-900 dark:text-slate-200 bg-blue-100 dark:bg-slate-600 transition duration-300 hover:bg-blue-200 dark:hover:bg-slate-500 font-exo font-medium px-4 py-2 my-1 rounded-md"
      onClick={clickHandler}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
