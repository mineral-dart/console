import {configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {authenticationReducer, navigationReducer, organizationsReducer} from "@console/redux";

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    auth: authenticationReducer,
    organizations: organizationsReducer
  },
  middleware: [...getDefaultMiddleware()]
})

export default store