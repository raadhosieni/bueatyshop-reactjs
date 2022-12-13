import { createSlice } from "@reduxjs/toolkit";

const updateDeliveredSlice = createSlice({
  name: "updateDelivered",
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
  },
});

export const updateDeliveredReducer = updateDeliveredSlice.reducer;
export const updateDeliveredActions = updateDeliveredSlice.actions;
