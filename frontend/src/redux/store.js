import { configureStore } from "@reduxjs/toolkit"
import products from "../redux/slices/product";
import cart from "./slices/cart";
import user from "./slices/user";
const store = configureStore({
  reducer: {
    cart: cart,
    user: user,
    products: products,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store;

