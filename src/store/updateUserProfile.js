import { createSlice } from "@reduxjs/toolkit";

const updateUserProfileSlice = createSlice({
  name: "updateUserProfile",
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

export const updateUserProfileReducer = updateUserProfileSlice.reducer;
export const updateUserProfileActions = updateUserProfileSlice.actions;
