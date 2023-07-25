import { Form, Formik } from "formik";
import * as Yup from "yup";

import { addCategory } from "../../api/category-api";
import type { Category } from "../../types/category";
import usePostData from "../../utils/hooks/usePostData";
import Button from "../buttons/Button";
import ValidFormInput from "../inputs/ValidFormInput";
import ValidFormSelect from "../inputs/ValidFormSelect";

const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .required("Category must have a name.")
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Item ID can only contain letters and numbers."
    ),
  tax: Yup.number()
    .required("Category must have a name.")
    .min(0, "Percentage cannot not be negative.")
    .max(100, "Percentage cannot be more than 100."),
  serviceTax: Yup.number()
    .required("Category must have a name.")
    .min(0, "Percentage cannot not be negative.")
    .max(100, "Percentage cannot be more than 100."),
  isTaxApplicable: Yup.boolean().default(false),
});

const initialValues: Category = {
  tax: 0,
  name: "",
  serviceTax: 0,
  isTaxApplicable: false,
};

const AddCategoryForm = () => {
  const { postData } = usePostData<Category, Category>(addCategory);

  return (
    <div className="flex flex-col items-center justify-center font-exo dark:bg-slate-900 rounded-lg py-2">
      <Formik
        initialValues={initialValues}
        onSubmit={async (value, _actions) => {
          await postData(value);
          
        }}
        validationSchema={categoryValidationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="text-slate-900 dark:text-slate-200">
            <ValidFormInput label="Category Name" name="name" type="text" />
            <ValidFormInput label="Tax" name="tax" type="number" />
            <ValidFormInput
              label="Service Tax"
              name="serviceTax"
              type="number"
            />
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
