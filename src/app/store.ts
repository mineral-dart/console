import {configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {navigationReducer} from "@console/redux";

const store = configureStore({
  reducer: {
    navigation: navigationReducer
  },
  middleware: [...getDefaultMiddleware()]
})

export default store