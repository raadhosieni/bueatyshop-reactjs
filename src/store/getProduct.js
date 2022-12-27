import { createSlice } from "@reduxjs/toolkit";

const getProductSlice = createSlice({
  name: "getproduct",
  initialState: {
    status: "",
    product: "",
    error: "",
  },
  reducers: {
    request(state) {
      state.status = "pending";
    },
    success(state, action) {
      state.status = "success";
      state.product = action.payload;
    },
    fail(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const getProductReducer = getProductSlice.reducer;
export const getProductActions = getProductSlice.actions;
