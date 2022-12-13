import { createSlice } from "@reduxjs/toolkit";

const getOrdersSlice = createSlice({
  name: "getOrders",
  initialState: {
    status: "",
    error: "",
    orders: [],
  },
  reducers: {
    request(state) {
      state.status = "pending";
    },
    success(state, action) {
      state.status = "success";
      state.orders = action.payload;
    },
    fail(state, action) {
      state.status = "fail";
      state.error = action.payload;
    },
  },
});

export const getOrdersReducer = getOrdersSlice.reducer;
export const getOrdersActions = getOrdersSlice.actions;
