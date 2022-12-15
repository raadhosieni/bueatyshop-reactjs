import { createSlice } from "@reduxjs/toolkit";

const deleteUserSlice = createSlice({
  name: "deleteUser",
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

export const deleteUserReducer = deleteUserSlice.reducer;
export const deleteUserActions = deleteUserSlice.actions;
