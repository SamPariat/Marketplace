import { AxiosError, AxiosResponse } from "axios";

import type { Bill, BillingRequest } from "../types/bill";
import type { CustomResponse } from "../types/custom-response";
import { SalesPerDate } from "../types/sales-per-date";
import { generateError } from "../utils";
import { axiosInstance } from "./axios-config";

export const time = async (): Promise<CustomResponse<Date>> => {
  try {
    const response: AxiosResponse = await axiosInstance.get("/billing/time");

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getBillById = async (billId: number) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/billing?id=${billId}`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getBill = async (itemId: number) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/billing/${itemId}`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getAllBills = async (): Promise<CustomResponse<Array<Bill>>> => {
  try {
    const response: AxiosResponse = await axiosInstance.get("/billing/bills");

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getSalesPerDay = async (): Promise<
  CustomResponse<Array<SalesPerDate>>
> => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      "billing/sales-per-day"
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const addBill = async (
  bill: BillingRequest
): Promise<CustomResponse<Bill>> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/billing/addBill",
      bill
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};
