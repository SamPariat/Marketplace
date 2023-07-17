import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";

import type { Category } from "../../types/category";
import Button from "../buttons/Button";
import ErrorText from "../inputs/ErrorText";
import ValidFormInput from "../inputs/ValidFormInput";

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
            <ValidFormInput label="Category ID" name="id" />
            <ValidFormInput label="Category Name" name="name" />

            {/* TODO: add form input */}
            <div className="flex flex-col mx-2 my-2">
              <span className="flex items-center">
                <label
                  htmlFor="isTaxApplicable"
                  className="font-semibold px-6 py-2 inline-block w-64 bg-blue-400 dark:bg-slate-700"
                >
                  Is Tax Applicable
                </label>
                <Field
                  name="isTaxApplicable"
                  className="w-full py-2 px-2 bg-blue-100 dark:bg-slate-600"
                  as="select"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Field>

                <ErrorMessage name="isTaxApplicable">
                  {(errorMsg) => <ErrorText text={errorMsg} />}
                </ErrorMessage>
              </span>
            </div>
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
