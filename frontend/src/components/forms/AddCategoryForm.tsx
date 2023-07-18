import { Form, Formik } from "formik";
import * as Yup from "yup";

import { addCategory } from "../../api/category-api";
import type { Category } from "../../types/category";
import usePostData from "../../utils/hooks/usePostData";
import Button from "../buttons/Button";
import ValidFormInput from "../inputs/ValidFormInput";
import ValidFormSelect from "../inputs/ValidFormSelect";

const categoryValidationSchema = Yup.object({
  id: Yup.number()
    .required("Category ID cannot be empty.")
    .positive("Category ID must be greater than zero.")
    .typeError("Category ID must be a number."),
  name: Yup.string().required("Category must have a name."),
  isTaxApplicable: Yup.boolean().default(false),
});

const initialValues: Category = {
  id: 0,
  name: "",
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
