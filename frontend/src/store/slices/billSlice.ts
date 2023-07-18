import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Item } from "../../types/item";

export interface MapInterface {
  [key: number]: number;
}

export interface BillState {
  addedItems: Array<Item>;
  total: number;
  frequency: MapInterface;
}

const initialState: BillState = {
  addedItems: [],
  total: 0,
  frequency: {},
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    incrementQuantityOfItemId: (state, action: PayloadAction<number>) => {
      if (state.frequency[action.payload] === undefined) {
        state.frequency[action.payload] = 0;
      }
      state.frequency[action.payload]++;
    },
    decrementQuantityOfItemId: (state, action) => {
      if (state.frequency[action.payload] > 0) {
        state.frequency[action.payload]--;
      }
    },
  },
});

export const { incrementQuantityOfItemId, decrementQuantityOfItemId } =
  billSlice.actions;
export default billSlice.reducer;
