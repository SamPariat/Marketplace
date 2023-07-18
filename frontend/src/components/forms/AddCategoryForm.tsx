import { Form, Formik } from "formik";
import * as Yup from "yup";

import type { Category } from "../../types/category";
import Button from "../buttons/Button";
import ValidFormInput from "../inputs/ValidFormInput";
import ValidFormSelect from "../inputs/ValidFormSelect";

const categoryValidationSchema = Yup.object({
  id: Yup.number()
    .required("Category ID cannot be empty.")
    .positive("Category ID cannot be less than zero.")
    .typeError("Category ID must be a number."),
  name: Yup.string().required("Category must have a name."),
  isTaxApplicable: Yup.boolean().default(false),
});

const initialValues: Category = {
  id: -1,
  name: "",
  isTaxApplicable: false,
};

const AddCategoryForm = () => {
  return (
    <div className="flex flex-col items-center justify-center font-exo dark:bg-slate-900 rounded-lg py-2">
      <Formik
        initialValues={initialValues}
        onSubmit={(value, actions) => {
          console.log(value);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        validationSchema={categoryValidationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="text-slate-900 dark:text-slate-200">
            <ValidFormInput label="Category ID" name="id" type="text" />
            <ValidFormInput label="Category Name" name="name" type="text" />
            <ValidFormSelect
              label="Is Tax Applicable"
              name="isTaxApplicable"
              options={[
                { text: "True", value: "true" },
                { text: "False", value: "false" },
              ]}
            />
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

export default AddCategoryForm;
