import { createSlice } from "@reduxjs/toolkit";

const createProductSlice = createSlice({
  name: "createProduct",
  initialState: {
    status: "",
    product: {},
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
    reset(state) {
      state.status = "";
      state.error = "";
    },
  },
});

export const createProductReducer = createProductSlice.reducer;
export const createProductActions = createProductSlice.actions;
