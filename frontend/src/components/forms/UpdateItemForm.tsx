import { Form, Formik } from "formik";
import * as Yup from "yup";

import { getAllCategories } from "../../api/category-api";
import { updateItem } from "../../api/item-api";
import type { Item, ItemRequest } from "../../types/item";
import useGetData from "../../utils/hooks/useGetData";
import usePatchData from "../../utils/hooks/usePatchData";
import Button from "../buttons/Button";
import ValidFormInput from "../inputs/ValidFormInput";
import ValidFormSelect from "../inputs/ValidFormSelect";

const itemValidationSchema = Yup.object({
  name: Yup.string()
    .required("Item must have a name.")
    .matches(
      /^[a-zA-Z0-9 .-]+$/,
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
  costPrice: Yup.number()
    .typeError("Discount must be a number.")
    .min(0, "Discount cannot be negative.")
    .integer("Price must be a number"),
  supplier: Yup.string()
    .required("Supplier must have a name.")
    .matches(/^[a-zA-Z ]+$/, "Item name can only contain letters and numbers."),
});

type UpdateItemFormProps = {
  item: Item;
};

const UpdateItemForm = ({ item }: UpdateItemFormProps) => {
  const { data: categories } = useGetData(getAllCategories);
  const { patchData } = usePatchData<ItemRequest, Item>(updateItem);

  const categoryOptions = categories?.map((category) => {
    return { value: category.id!, text: category.name };
  });

  return (
    <div className="flex flex-col items-center justify-center font-exo dark:bg-slate-900 rounded-lg py-2 m-auto">
      <Formik
        initialValues={{
          name: item.name,
          price: item.price,
          stock: item.stock,
          active: item.active,
          discountPer: item.discountPer,
          costPrice: item.costPrice,
          supplier: item.supplier,
          categoryId: "1",
        }}
        onSubmit={async (value, _actions) => {
          await patchData(item.itemId!, {
            active: value.active,
            category: {
              id: Number.parseInt(value.categoryId),
            },
            costPrice: value.costPrice,
            discountPer: value.discountPer,
            name: value.name,
            price: value.price,
            stock: value.stock,
            supplier: value.supplier,
          });
        }}
        validationSchema={itemValidationSchema}
        enableReinitialize={true}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="text-slate-900 dark:text-slate-200">
            <ValidFormInput label="Item Name" name="name" type="text" />
            <ValidFormInput label="Price" name="price" type="number" />
            <ValidFormInput label="Stock" name="stock" type="number" />
            <ValidFormSelect
              label="Is Item Active?"
              name="active"
              options={[
                { text: "True", value: "true" },
                { text: "False", value: "false" },
              ]}
            />
            <ValidFormSelect
              label="Is Tax Applicable"
              name="isTaxApplicable"
              options={[
                { text: "True", value: "true" },
                { text: "False", value: "false" },
              ]}
            />
            <ValidFormInput label="Cost Price" name="costPrice" type="number" />
            <ValidFormInput
              label="Discount %"
              name="discountPer"
              type="number"
            />
            <ValidFormInput label="Supplier Name" name="supplier" type="text" />
            <ValidFormSelect
              label="Category"
              name="categoryId"
              options={categoryOptions ? categoryOptions : []}
            />
            <Button
              text="Update"
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateItemForm;
