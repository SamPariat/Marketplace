import { AxiosError, AxiosResponse } from "axios";

import { axiosInstance } from "./axios-config";

import type { CustomResponse } from "../types/custom-response";
import type { Item, ItemRequest } from "../types/item";
import { generateError } from "../utils";

// TODO : Update ItemController for this file

export const getItems = async (): Promise<CustomResponse<Array<Item>>> => {
  try {
    const response: AxiosResponse = await axiosInstance.get("/item/all");

    return response.data;
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
    const response: AxiosResponse = await axiosInstance.get(`/item/${itemId}`);

    return response.data;
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
    const response: AxiosResponse = await axiosInstance.get(
      `/item?name=${name}`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const addItem = async (
  item: Item,
  categoryId: number
): Promise<CustomResponse<Item>> => {
  const body: ItemRequest = {
    itemId: item.itemId,
    name: item.name,
    price: item.price,
    stock: item.stock,
    active: item.active,
    discountPer: item.discountPer,
    discountPrice: item.discountPrice,
    category: {
      id: categoryId,
    },
  };

  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/item/add-item",
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

export const deleteItem = async (
  itemId: number
): Promise<CustomResponse<Item>> => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/item/delete-item?id=${itemId}`
    );

    return response.data;
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
    const response: AxiosResponse = await axiosInstance.patch(
      `/item/update?id=${itemId}`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};
