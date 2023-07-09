import { AxiosError } from "axios";

import { axiosInstance } from "./axios-config";

import type { CustomResponse } from "../types/custom-response";
import type { Item } from "../types/item";
import { generateError } from "../utils";

// TODO : Update ItemController for this file

export const getItems = async (): Promise<CustomResponse<Array<Item>>> => {
  try {
    const response: CustomResponse<Array<Item>> = await axiosInstance.get(
      "/item/all"
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getItemById = async (
  itemId: number
): Promise<CustomResponse<Item>> => {
  try {
    const response: CustomResponse<Item> = await axiosInstance.get(
      `/item/${itemId}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getItemsByName = async (
  name: string
): Promise<CustomResponse<Array<Item>>> => {
  try {
    const response: CustomResponse<Array<Item>> = await axiosInstance.get(
      `/item?name=${name}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const addItem = async (item: Item): Promise<CustomResponse<Item>> => {
  const body: Item = {
    itemId: item.itemId,
    name: item.name,
    price: item.price,
    stock: item.stock,
    active: item.active,
    discountPer: item.discountPer,
    discountPrice: item.discountPrice,
  };

  try {
    const response: CustomResponse<Item> = await axiosInstance.post(
      "/item/add-item",
      body
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const deleteItem = async (
  itemId: number
): Promise<CustomResponse<Item>> => {
  try {
    const response: CustomResponse<Item> = await axiosInstance.delete(
      `/item/delete-item?id=${itemId}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const updateItem = async (
  itemId: number
): Promise<CustomResponse<Item>> => {
  try {
    const response: CustomResponse<Item> = await axiosInstance.patch(
      `/item/update?id=${itemId}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};
