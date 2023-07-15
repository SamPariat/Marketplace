import { AxiosError, AxiosResponse } from "axios";

import { axiosInstance } from "./axios-config";

import type { CustomResponse } from "../types/custom-response";
import type { User } from "../types/user";
import { generateError } from "../utils";

export const getAllUsers = async (): Promise<CustomResponse<Array<User>>> => {
  try {
    const response: AxiosResponse = await axiosInstance.get("/user");

    return response.data;
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
    const response: AxiosResponse = await axiosInstance.get(`/user/${userId}`);

    return response.data;
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
    const response: AxiosResponse = await axiosInstance.post(
      "/user/signup",
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

export const deleteByUserId = async (
  userId: number
): Promise<CustomResponse<User>> => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/user/delete?id=${userId}`
    );

    return response.data;
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
    const response: AxiosResponse = await axiosInstance.patch(
      `/user/update?id=${userId}`,
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
