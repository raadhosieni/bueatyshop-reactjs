import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  error: "",
  orderDetails: {},
};

const getOrderSlice = createSlice({
  name: "getOrder",
  initialState,
  reducers: {
    getOrderRequest(state) {
      state.status = "pending";
      state.error = "";
      state.orderDetails = {};
    },
    getOrderSuccess(state, action) {
      state.status = "success";
      state.orderDetails = action.payload;
    },
    getOrderFailed(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    getOrderClear(state) {
      state.status = "";
      state.error = "";
      state.orderDetails = {};
    },
  },
});

export const getOrderReducer = getOrderSlice.reducer;
export const getOrderActions = getOrderSlice.actions;
