type ErrorTextProps = {
  text: string;
};

/**
 *
 * @param text - The error text
 * @returns A resusable error text template that can be used with Formik
 */
const ErrorText = ({ text }: ErrorTextProps) => {
  return <p className="text-sm text-red-400">{text}</p>;
};

export default ErrorText;
