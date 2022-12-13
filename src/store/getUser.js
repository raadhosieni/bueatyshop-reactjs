import { createSlice } from "@reduxjs/toolkit";

const getUserSlice = createSlice({
  name: "getUser",
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

export const getUserReducer = getUserSlice.reducer;
export const getUserActions = getUserSlice.actions;
