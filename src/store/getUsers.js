import { createSlice } from "@reduxjs/toolkit";

const getUsersSlice = createSlice({
  name: "getUsers",
  initialState: {
    status: "",
    error: "",
    users: [],
  },
  reducers: {
    request(state) {
      state.status = "pending";
    },
    success(state, action) {
      state.status = "success";
      state.users = action.payload;
    },
    fail(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const getUsersReducer = getUsersSlice.reducer;
export const getUsersActions = getUsersSlice.actions;
