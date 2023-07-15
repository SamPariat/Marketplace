import { AxiosError } from "axios";

import { axiosInstance } from "./axios-config";
import type { CustomResponse } from "../types/custom-response";
import type { LoginRequest, LoginResponse } from "../types/login";
import { generateError } from "../utils";

export const login = async (
  loginRequest: LoginRequest
): Promise<CustomResponse<LoginResponse>> => {
  try {
    const response: CustomResponse<LoginResponse> = await axiosInstance.post(
      "/auth/login",
      loginRequest
    );

    const { email, jwtToken: token } = response.data.data;

    localStorage.setItem(
      "token",
      JSON.stringify({
        email,
        token,
      })
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(generateError(e.response!));
    }
    throw new Error("Some error occurred.");
  }
};
