import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsReducer";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
