import { configureStore } from "@reduxjs/toolkit";

import billReducer from "./slices/billSlice";

export const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
