import { AxiosError, AxiosResponse } from "axios";

import { axiosInstance } from "./axios-config";

import type { CustomResponse } from "../types/custom-response";
import type { User } from "../types/user";

const generateError = (errorResponse: AxiosResponse): string => {
  return errorResponse?.data.message
    ? `${errorResponse?.data.message}: ${errorResponse?.data.error}`
    : errorResponse?.data.error;
};

export const getAllUsers = async (): Promise<CustomResponse<Array<User>>> => {
  try {
    const response: CustomResponse<Array<User>> = await axiosInstance.get(
      "/user"
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const getUser = async (
  userId: number
): Promise<CustomResponse<User>> => {
  try {
    const response: CustomResponse<User> = await axiosInstance.get(
      `/user/${userId}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const signup = async (user: User): Promise<CustomResponse<User>> => {
  const body: Omit<User, "id"> = {
    email: user.email,
    password: user.password,
    name: user.name,
    role: user.role,
  };

  try {
    const response: CustomResponse<User> = await axiosInstance.post(
      "/user/signup",
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

export const deleteByUserId = async (
  userId: number
): Promise<CustomResponse<User>> => {
  try {
    const response: CustomResponse<User> = await axiosInstance.delete(
      `/user/delete?id=${userId}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};

export const updateUser = async (
  userId: number,
  user: User
): Promise<CustomResponse<User>> => {
  const body: User = {
    id: user.id,
    email: user.email,
    password: user.password,
    name: user.name,
    role: user.role,
  };

  try {
    const response: CustomResponse<User> = await axiosInstance.patch(
      `/user/update?id=${userId}`,
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
