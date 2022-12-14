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
import { updateUserProfileReducer } from "./updateUserProfile";
import { getProductsReducer } from "./getProducts";
import { deleteProductReducer } from "./deleteProduct";
import { createProductReducer } from "./createProduct";
import { getProductReducer } from "./getProduct";
import { updateProductReducer } from "./updateProduct";

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
    updateUserProfile: updateUserProfileReducer,
    getProducts: getProductsReducer,
    deleteProduct: deleteProductReducer,
    createProduct: createProductReducer,
    getProduct: getProductReducer,
    updateProduct: updateProductReducer,
  },
});

export default store;
