import { createSlice } from "@reduxjs/toolkit";

const updatePaymentSlice = createSlice({
  name: "updatePayment",
  initialState: {
    status: "",
    error: "",
  },
  reducers: {
    updatePaymentRequest(state, action) {
      state.status = "pending";
    },
    updatePaymentSuccess(state, action) {
      state.status = "success";
    },
    updatePaymentFailed(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const updatePaymentReducer = updatePaymentSlice.reducer;
export const updatePaymentActions = updatePaymentSlice.actions;
