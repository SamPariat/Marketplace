import { Form, Formik } from "formik";
import * as Yup from "yup";
import { getAllCategories } from "../../api/category-api";

import type { Item } from "../../types/item";
import Button from "../buttons/Button";
import ValidFormInput from "../inputs/ValidFormInput";
import ValidFormSelect from "../inputs/ValidFormSelect";
import useGetData from "../../utils/hooks/useGetData";

const categoryValidationSchema = Yup.object({
  itemId: Yup.string()
    .required("Item ID cannot be empty.")
    .matches(/^[a-zA-Z0-9]+$/, "Item ID can only contain letters and numbers.")
    .typeError("Item ID must be a string."),
  name: Yup.string()
    .required("Item must have a name.")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Item name can only contain letters and numbers."
    ),
  price: Yup.number()
    .typeError("Price must be a number.")
    .positive("Price must be more than zero."),
  stock: Yup.number()
    .typeError("Stock must be a number.")
    .min(0, "Stock cannot be negative.")
    .integer("Stock must be a number"),
  active: Yup.boolean().default(false),
  discountPer: Yup.number()
    .typeError("Discount must be a number.")
    .min(0, "Percentage cannot not be negative.")
    .max(100, "Percentage cannot be more than 100."),
  discountPrice: Yup.number()
    .typeError("Discount must be a number.")
    .min(0, "Discount cannot be negative.")
    .integer("Price must be a number"),
});

const initialValues: Item = {
  itemId: -1,
  name: "",
  price: 0,
  stock: 0,
  active: false,
  discountPer: 0,
  discountPrice: 0,
  category:{},
};

const AddItemForm = () => {
  const { data} = useGetData(getAllCategories );
  if (data === null) {
    return <p>Loading categories...</p>;
  }

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
            <ValidFormInput label="Item ID" name="id" type="text" />
            <ValidFormInput label="Item Name" name="name" type="text" />
            <ValidFormInput label="Price" name="price" type="number" />
            <ValidFormInput label="Stock" name="stock" type="number" />
            <ValidFormSelect
              label="Is Tax Applicable"
              name="isTaxApplicable"
              options={[
                { text: "True", value: "true" },
                { text: "False", value: "false" },
              ]}
            />
            <ValidFormInput
              label="Discount Price"
              name="discountPrice"
              type="number"
            />
            <ValidFormInput
              label="Discount %"
              name="discountPer"
              type="number"
            />
            <ValidFormSelect
              label="Category"
              name="category"
              options={data.map((category) => ({
                text: category.name,
              }))}
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

export default AddItemForm;
