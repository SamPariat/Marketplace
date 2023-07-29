import { AxiosError, AxiosResponse } from "axios";

import { fiveHrs } from "./constants";

export const generateError = (errorResponse: AxiosResponse): string => {
  return errorResponse?.data.message
    ? `${errorResponse?.data.message} : ${errorResponse?.data.error}`
    : errorResponse?.data.error;
};

export const handleError = (e: unknown) => {
  if (e instanceof AxiosError) {
    throw new Error(generateError(e.response!));
  }
  throw new Error("Some error occurred.");
};

export const hasTokenExpired = (tokenAsIsoString: string): boolean => {
  const tokenDate = new Date(tokenAsIsoString);
  const currentDate = new Date();
  console.log(currentDate.getMilliseconds(), tokenDate.getMilliseconds())
  return currentDate.getMilliseconds() - tokenDate.getMilliseconds() > fiveHrs;
};
