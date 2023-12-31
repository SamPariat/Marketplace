import { ErrorMessage, Field, FieldAttributes } from "formik";

import ErrorText from "./ErrorText";

type ValidFormInputProps = {
  name: string;
  label: string;
  type: "text" | "password";
} & FieldAttributes<any>;

/**
 *
 * @param name The attribute name applied in the label
 * @param label The label to display
 * @param value The initial value to display
 * @returns A reusable Formik input field
 */
const ValidFormInput = ({ name, label, type }: ValidFormInputProps) => {
  return (
    <div className="flex flex-col mx-2 my-2">
      <span className="flex items-center">
        <label
          htmlFor={name}
          className="w-full font-semibold px-6 py-2 inline-block bg-slate-300 dark:bg-slate-700"
        >
          {label}
        </label>
        <Field
          name={name}
          className="w-full py-2 px-2 bg-slate-200 dark:bg-slate-600"
          type={type}
        />
      </span>
      <ErrorMessage name={name}>
        {(errorMsg) => <ErrorText text={errorMsg} />}
      </ErrorMessage>
    </div>
  );
};

export default ValidFormInput;
