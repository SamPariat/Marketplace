import { Form, Formik } from "formik";
import * as Yup from "yup";

import { addConsumer} from "../../api/consumer-api";
import usePostData from "../../utils/hooks/usePostData";
import Button from "../buttons/Button";
import ValidFormInput from "../inputs/ValidFormInput";
import { Consumer } from "../../types/consumer";


const ConsumerValidationSchema = Yup.object({
  id: Yup.number()
    .required("Category ID cannot be empty.")
    .positive("Category ID must be greater than zero.")
    .typeError("Category ID must be a number."),
  name: Yup.string()
    .required("Category must have a name.")
    .matches(/^[a-zA-Z0-9]+$/, "Item ID can only contain letters and numbers."),
  phoneNo: Yup.string()
    .required("Consumer must have phone number.")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number."),});

const initialValues: Consumer = {
  id: 0,
  phoneNo:"",
  name: "",
  address:"",
};

const AddConsumerForm = () => {
  const { postData } = usePostData<Consumer, Consumer>(addConsumer);

  return (
    <div className="flex items-center justify-center font-exo dark:bg-slate-900 rounded-lg py-2">
      <Formik
        initialValues={initialValues}
        onSubmit={async (value, _actions) => {
          await postData(value);
        }}
        validationSchema={ConsumerValidationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="text-slate-900 dark:text-slate-200">
            <ValidFormInput label="Consumer ID" name="id" type="text" />
            <ValidFormInput label="Consumer Name" name="name" type="text" />
            <ValidFormInput label="Consumer Address" name="address" type="text" />
            <ValidFormInput label="Consumer Phone No" name="phoneNo" type="number" />
            <Button
              text="Submit"
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddConsumerForm;
