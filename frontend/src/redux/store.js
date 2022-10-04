import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cart-slice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;