import { AxiosError, AxiosResponse } from "axios";

import { Consumer } from "../types/consumer";
import { CustomResponse } from "../types/custom-response";
import { generateError } from "../utils";
import { axiosInstance } from "./axios-config";

export const getAllCategories = async (): Promise<
  CustomResponse<Array<Consumer>>
> => {
  try {
    const response: AxiosResponse = await axiosInstance.get("/consumer/all");

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getConsumer = async (phoneNo: number) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/consumer/${phoneNo}`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const addConsumer = async (
  consumer: Consumer
): Promise<CustomResponse<Consumer>> => {
  const body = {
    id: consumer.id,
    name: consumer.name,
    address: consumer.address,
    phoneNo: consumer.phoneNo,
  };

  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/consumer/add-consumer",
      body
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const deleteConsumer = async (
  phoneNo: number
): Promise<CustomResponse<Consumer>> => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/consumer/delete?id=${phoneNo}`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};
