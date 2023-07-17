import { HTMLInputTypeAttribute, Dispatch, SetStateAction } from "react";

type InputWithLabelProps = {
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  text: string;
  changeHandler: Dispatch<SetStateAction<string>>;
  value: string;
};

const InputWithLabel = ({
  name,
  type,
  placeholder,
  text,
  changeHandler,
  value,
}: InputWithLabelProps) => {
  return (
    <div className="flex flex-col my-2 w-1/3 text-slate-900 dark:text-slate-200">
      <label htmlFor={name} className="font-semibold">
        {text}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="border-slate-600 border-2 px-4 py-1 rounded-xl bg-slate-100 dark:bg-slate-400 placeholder:text-slate-400 dark:placeholder:text-slate-200"
        value={value}
        onChange={(event) => changeHandler(event.target.value)}
      />
    </div>
  );
};

export default InputWithLabel;
