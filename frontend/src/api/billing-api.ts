import { AxiosError } from "axios";

import type { Bill, BillRequest } from "../types/bill";
import type { CustomResponse } from "../types/custom-response";
import { generateError } from "../utils";
import { axiosInstance } from "./axios-config";

// TODO : Finalize backend routes in BillingController

export const time = async (): Promise<CustomResponse<Date>> => {
  try {
    const response: CustomResponse<Date> = await axiosInstance.get(
      "/billing/time"
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getBill = async (itemId: number) => {
  try {
    const response: CustomResponse<Date> = await axiosInstance.get(
      `/billing/${itemId}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getAllBills = async (): Promise<CustomResponse<Array<Bill>>> => {
  try {
    const response: CustomResponse<Array<Bill>> = await axiosInstance.get(
      "/billing/bills"
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getBillById = async (billId: number) => {
  try {
    const response: CustomResponse<Date> = await axiosInstance.get(
      `/billing?id=${billId}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const addBill = async (bill: BillRequest) => {
  try {
    const response: CustomResponse<Date> = await axiosInstance.post(
      "/billing/addBill",
      bill
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};
