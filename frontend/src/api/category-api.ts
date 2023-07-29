import { AxiosError, AxiosResponse } from "axios";

import type { Category } from "../types/category";
import type { CustomResponse } from "../types/custom-response";
import type { ItemsPerCategory } from "../types/items-per-category";
import { generateError } from "../utils";
import { axiosInstance } from "./axios-config";

export const getAllCategories = async (): Promise<
  CustomResponse<Array<Category>>
> => {
  try {
    const response: AxiosResponse = await axiosInstance.get("/category/all");

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getCategory = async (categoryId: number) => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/category/${categoryId}`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getItemsPerCategory = async (): Promise<
  CustomResponse<Array<ItemsPerCategory>>
> => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      "/category/items-per-category"
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const addCategory = async (
  category: Category
): Promise<CustomResponse<Category>> => {
  const body = {
    id: category.id,
    name: category.name,
    isTaxApplicable: category.isTaxApplicable,
  };

  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/category/add-category",
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

export const deleteCategory = async (
  categoryId: number
): Promise<CustomResponse<Category>> => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/category/delete?id=${categoryId}`
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const updateCategory = async (
  categoryId: number,
  category: Category
): Promise<CustomResponse<Category>> => {
  const body: Category = {
    id: category.id,
    name: category.name,
    isTaxApplicable: category.isTaxApplicable,
  };

  try {
    const response: AxiosResponse = await axiosInstance.patch(
      `/category/update?id=${categoryId}`,
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
