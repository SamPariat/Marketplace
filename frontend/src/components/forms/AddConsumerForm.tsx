import { Form, Formik } from "formik";
import * as Yup from "yup";

import { addConsumer } from "../../api/consumer-api";
import { Consumer } from "../../types/consumer";
import usePostData from "../../utils/hooks/usePostData";
import ValidFormInput from "../inputs/ValidFormInput";

const ConsumerValidationSchema = Yup.object({
  name: Yup.string()
    .required("Category must have a name.")
    .matches(/^[a-zA-Z0-9 ]+$/, "Name can only contain letters."),
  address: Yup.string()
    .required("Category ID cannot be empty.")
    .matches(/^[a-zA-Z0-9 ]+$/, "Name can only contain letters."),
  phoneNo: Yup.string()
    .required("Consumer must have phone number.")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number."),
});

const initialValues: Consumer = {
  phoneNo: "",
  name: "",
  address: "",
};

const AddConsumerForm = () => {
  const { postData } = usePostData<Consumer, Consumer>(addConsumer);

  return (
    <div className="flex items-center justify-center font-exo dark:bg-slate-800 rounded-lg py-2">
      <Formik
        initialValues={initialValues}
        onSubmit={async (value, _actions) => {
          await postData(value);
        }}
        validationSchema={ConsumerValidationSchema}
      >
        {() => (
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
              type="number"
            />
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddConsumerForm;
