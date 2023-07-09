import { AxiosError } from "axios";

import { axiosInstance } from "./axios-config";
import { generateError } from "../utils";
import { CustomResponse } from "../types/custom-response";
import { Category } from "../types/category";

export const getAllCategories = async (): Promise<
  CustomResponse<Array<Category>>
> => {
  try {
    const response: CustomResponse<Array<Category>> = await axiosInstance.get(
      "/category/all"
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getCategory = async (
  categoryId: number
): Promise<CustomResponse<Category>> => {
  try {
    const response: CustomResponse<Category> = await axiosInstance.get(
      `/category/${categoryId}`
    );

    return response;
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
    const response: CustomResponse<Category> = await axiosInstance.post(
      "/category/add-category",
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

export const deleteCategory = async (
  categoryId: number
): Promise<CustomResponse<Category>> => {
  try {
    const response: CustomResponse<Category> = await axiosInstance.delete(
      `/category/delete?id=${categoryId}`
    );

    return response;
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
    const response: CustomResponse<Category> = await axiosInstance.patch(
      `/category/update?id=${categoryId}`,
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
