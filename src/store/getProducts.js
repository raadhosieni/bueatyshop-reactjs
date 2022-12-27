import { createSlice } from "@reduxjs/toolkit";

const getProductsSlice = createSlice({
  name: "getProducts",
  initialState: {
    status: "",
    products: [],
    error: "",
  },
  reducers: {
    request(state) {
      state.status = "pending";
    },
    success(state, action) {
      state.status = "success";
      state.products = action.payload;
    },
    fail(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const getProductsReducer = getProductsSlice.reducer;
export const getProductsActions = getProductsSlice.actions;
