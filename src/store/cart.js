import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  shippingAddress: {
    address: "",
    city: "",
    postalcode: "",
    country: "",
  },
  paymentMethod: "",
};

const savedCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : initialState;

console.log(savedCart);

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existItem = state.items.find((item) => item.id === newItem.id);
      if (existItem) {
        existItem.quantity++;
        existItem.amount += newItem.price;
      } else {
        state.items.push(newItem);
      }
      state.totalAmount += newItem.price;
      state.totalQuantity++;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existItem = state.items.find((item) => item.id === id);
      if (existItem.quantity > 1) {
        existItem.quantity--;
        existItem.amount -= existItem.price;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
      state.totalAmount -= existItem.price;
      state.totalQuantity--;
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.shippingAddress.address = "";
      state.shippingAddress.city = "";
      state.shippingAddress.postalcode = "";
      state.shippingAddress.country = "";
      state.paymentMethod = "";
    },
    saveShippingAddress(state, action) {
      state.shippingAddress.address = action.payload.address;
      state.shippingAddress.city = action.payload.city;
      state.shippingAddress.postalcode = action.payload.postalcode;
      state.shippingAddress.country = action.payload.country;
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
