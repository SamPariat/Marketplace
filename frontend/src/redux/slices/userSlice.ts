import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../api/auth-api";

export interface UserState {
  token: string | null;
  email: string | null;
}

const initialState: UserState = {
  token: null,
  email: null,
};

const loginUser = createAsyncThunk("users/loginUser", async ({email, password}) => {

});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase()
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
