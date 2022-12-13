import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  error: "",
  orderId: "",
};

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    createOrderRequest(state) {
      state.status = "pending";
      state.error = "";
      state.orderId = "";
    },
    createOrderSuccess(state, action) {
      state.status = "success";
      state.orderId = action.payload;
    },
    createOrderFailed(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    createOrderClear(state) {
      state.status = "";
      state.error = "";
      state.orderId = "";
    },
  },
});

export const createOrderReducer = createOrderSlice.reducer;
export const createOrderActions = createOrderSlice.actions;
