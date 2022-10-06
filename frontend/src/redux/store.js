import { configureStore, combineReducers } from "@reduxjs/toolkit"
import cart from "./slices/cart";
import user from "./slices/user";
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
} from 'redux-persist'




const store = configureStore({
    reducer: {
        cart: cart,
        user: user,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
// const persistedReducer = persistReducer(persistConfig, store)


export default store;

// const persistConfig = {
//   key: 'root',
//   storage,
// }
// const reducers = combineReducers({
//   cart: cart,
//   user: user,
// });
// const persistedReducer = persistReducer(persistConfig, reducers);

// export default configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });