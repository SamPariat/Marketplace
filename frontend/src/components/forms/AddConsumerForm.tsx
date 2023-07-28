import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { Consumer } from "../../types/consumer";
import Button from "../buttons/Button";
import ValidFormInput from "../inputs/ValidFormInput";

const ConsumerValidationSchema = Yup.object({
  name: Yup.string()
    .required("Category must have a name.")
    .matches(/^[a-zA-Z0-9]+$/, "Item ID can only contain letters and numbers."),
  phoneNo: Yup.string()
    .required("Consumer must have phone number.")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number."),
});

const initialValues: Consumer = {
  phoneNo: "",
  name: "",
  address: "",
};

type AddConsumerFormProps = {
  setConsumer: React.Dispatch<React.SetStateAction<Consumer>>;
};

const AddConsumerForm = ({ setConsumer }: AddConsumerFormProps) => {
  return (
    <div className="flex items-center justify-center font-exo dark:bg-slate-900 rounded-lg py-2">
      <Formik
        initialValues={initialValues}
        onSubmit={(value, actions) => {
          setConsumer(value);
          toast.info("Saved user details");
          actions.setSubmitting(false);
        }}
        validationSchema={ConsumerValidationSchema}
      >
        {({ isValid }) => (
          <Form className="text-slate-900 dark:text-slate-200">
            <ValidFormInput label="Consumer Name" name="name" type="text" />
            <ValidFormInput
              label="Consumer Address"
              name="address"
              type="text"
            />
            <ValidFormInput
              label="Consumer Phone No"
              name="phoneNo"
              type="text"
            />
            <Button
              text="Save details"
              type="submit"
              disabled={!isValid}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddConsumerForm;
