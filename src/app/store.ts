import {configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {authenticationReducer, navigationReducer} from "@console/redux";

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    auth: authenticationReducer
  },
  middleware: [...getDefaultMiddleware()]
})

export default store