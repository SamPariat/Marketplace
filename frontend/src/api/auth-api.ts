import { AxiosError, AxiosResponse } from "axios";

import { axiosInstance } from "./axios-config";
import type { CustomResponse } from "../types/custom-response";
import type { LoginRequest, LoginResponse } from "../types/login";
import { generateError } from "../utils";

export const login = async (
  loginRequest: LoginRequest
): Promise<CustomResponse<LoginResponse>> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/auth/login",
      loginRequest
    );

    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};
