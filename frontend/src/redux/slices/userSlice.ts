import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { login } from "../../api/auth-api";
import type { LoginRequest } from "../../types/login";
import { handleError, hasTokenExpired } from "../../utils";
import { reduxState } from "../../utils/constants";
import { axiosInstance } from "../../api/axios-config";

export interface UserState {
  loading: boolean;
  token: string | undefined;
  email: string | undefined;
  error: string | undefined;
  role: string | undefined;
  name: string | undefined;
  tokenIssuingTime: string | undefined;
}

const initialState: UserState = {
  loading: false,
  token: undefined,
  email: undefined,
  error: undefined,
  role: undefined,
  name: undefined,
  tokenIssuingTime: undefined,
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await login({ email, password });

      if (response.error) {
        handleError(response.error);
        return rejectWithValue(response.error);
      }

      toast.success(response.message);

      const { username, jwtToken, role, name } = response.data;
      return { email: username, jwtToken, role, name };
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = undefined;
      state.token = undefined;
      state.role = undefined;
      state.name = undefined;
      state.tokenIssuingTime = undefined;
      axiosInstance.defaults.headers.common["Authorization"] = null;

      // Remove the token from local storage
      localStorage.removeItem(reduxState);
    },
    loadUserState: (state, action) => {
      if (action.payload) {
        if (hasTokenExpired(action.payload.token)) {
          return;
        }
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.name = action.payload.name;
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.token}`;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action.payload?.email;
      state.token = action.payload?.jwtToken;
      state.role = action.payload?.role;
      state.name = action.payload?.name;
      state.tokenIssuingTime = new Date().toISOString();
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload?.jwtToken}`;

      // Store the token in local storage
      localStorage.setItem(
        reduxState,
        JSON.stringify({
          email: state.email,
          token: action.payload?.jwtToken,
          role: action.payload?.role,
          name: action.payload?.name,
        })
      );
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout, loadUserState } = userSlice.actions;

export default userSlice.reducer;
