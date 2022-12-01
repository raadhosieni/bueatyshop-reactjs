import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  token: null,
  isAdmin: false,
  expiresInDate: null,
  status: "",
  error: null,
};

const savedUserState = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : initialState;

const userSlice = createSlice({
  name: "user",
  initialState: savedUserState,
  reducers: {
    login(state, action) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      state.expiresInDate = action.payload.expiresInDate;
      state.status = "success";
    },
    signup(state) {
      state.status = "success";
    },
    logout(state) {
      state.id = null;
      state.token = null;
      state.isAdmin = null;
      state.expiresInDate = null;
      state.status = "";
      state.error = null;
    },
    request(state) {
      state.status = "pending";
    },
    failed(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
