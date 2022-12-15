import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user";
import { cartReducer } from "./cart";
import { createOrderReducer } from "./createOrder";
import { getOrderReducer } from "./getOrder";
import { updatePaymentReducer } from "./updatePayment";
import { getOrdersReducer } from "./getOrders";
import { updateDeliveredReducer } from "./updateDelivered";
import { getUsersReducer } from "./getUsers";
import { getUserReducer } from "./getUser";
import { updateUserReducer } from "./updateUser";
import { deleteUserReducer } from "./deleteUser";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    createOrder: createOrderReducer,
    getOrder: getOrderReducer,
    updatePayment: updatePaymentReducer,
    getOrders: getOrdersReducer,
    updateDelivered: updateDeliveredReducer,
    getUsers: getUsersReducer,
    getUser: getUserReducer,
    updateUser: updateUserReducer,
    deleteUser: deleteUserReducer,
  },
});

export default store;
