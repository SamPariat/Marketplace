import { configureStore } from "@reduxjs/toolkit";

import { reduxState } from "../utils/constants";
import userReducer, { loadUserState } from "./slices/userSlice";

const loadUserDataFromLocalStorage = () => {
  try {
    const currentState = localStorage.getItem(reduxState);
    if (currentState !== null) {
      return JSON.parse(currentState);
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

store.dispatch(loadUserState(loadUserDataFromLocalStorage()));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
