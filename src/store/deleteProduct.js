import { createSlice } from "@reduxjs/toolkit";

const deleteProductSlice = createSlice({
  name: "deleteProduct",
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
      state.status = "";
      state.error = "";
    },
  },
});

export const deleteProductReducer = deleteProductSlice.reducer;
export const deleteProductActions = deleteProductSlice.actions;
