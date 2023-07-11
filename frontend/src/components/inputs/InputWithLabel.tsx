import { HTMLInputTypeAttribute } from "react";

type InputWithLabelProps = {
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  text: string;
};

const InputWithLabel = ({
  name,
  type,
  placeholder,
  text,
}: InputWithLabelProps) => {
  return (
    <div className="flex flex-col my-2">
      <label htmlFor={name} className="font-semibold">
        {text}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="border-slate-600 border-2 px-2 py-1 rounded-xl"
      />
    </div>
  );
};

export default InputWithLabel;
