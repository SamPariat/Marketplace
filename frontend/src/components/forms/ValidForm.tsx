import { Form, Formik, FormikHelpers } from "formik";

type ValidFormProps = {
  initialValues: any;
  onSubmit: (values: any, actions: FormikHelpers<any>) => void;
  validationSchema: any;
};

const ValidForm = ({
  initialValues,
  onSubmit,
  validationSchema,
}: ValidFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="text-slate-900 dark:text-slate-200 font-exo"></Form>
      )}
    </Formik>
  );
};

export default ValidForm;
