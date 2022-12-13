import { createSlice } from "@reduxjs/toolkit";

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    status: "",
    error: "",
    user: {},
  },
  reducers: {
    request(state) {
      state.status = "pending";
    },
    success(state, action) {
      state.status = "success";
      state.user = action.payload;
    },
    fail(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const updateUserReducer = updateUserSlice.reducer;
export const updateUserActions = updateUserSlice.actions;
