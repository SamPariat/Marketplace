import { AxiosError, AxiosResponse } from "axios";

export const generateError = (errorResponse: AxiosResponse): string => {
  return errorResponse?.data.message
    ? `${errorResponse?.data.message}: ${errorResponse?.data.error}`
    : errorResponse?.data.error;
};

export const handleError = (e: unknown) => {
  if (e instanceof AxiosError) {
    throw new Error(generateError(e.response!));
  }
  throw new Error("Some error occurred.");
};
