import { createSlice } from "@reduxjs/toolkit";

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: {
    status: "",
    error: "",
  },
  reducers: {
    request(state) {
      state.status = "pending";
    },
    success(state) {
      state.status = "success";
    },
    fail(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    reset(state) {
      state = {};
    },
  },
});

export const updateProductReducer = updateProductSlice.reducer;
export const updateProductActions = updateProductSlice.actions;
