import { ErrorMessage, Field } from "formik";

import ErrorText from "./ErrorText";

type ValidFormSelectProps = {
  name: string;
  options: Array<{
    value: string;
    text: string;
  }>;
  label: string;
};

const ValidFormSelect = ({ name, options, label }: ValidFormSelectProps) => {
  return (
    <div className="flex flex-col mx-2 my-2">
      <span className="flex items-center">
        <label
          htmlFor={name}
          className="font-semibold px-6 py-2 inline-block w-64 bg-blue-400 dark:bg-slate-700"
        >
          {label}
        </label>
        <Field
          name={name}
          className="w-full py-2 px-2 bg-blue-100 dark:bg-slate-600"
          as="select"
        >
          {options.map((option) => (
            <option value={option.value}>{option.text}</option>
          ))}
        </Field>

        <ErrorMessage name="isTaxApplicable">
          {(errorMsg) => <ErrorText text={errorMsg} />}
        </ErrorMessage>
      </span>
    </div>
  );
};

export default ValidFormSelect;