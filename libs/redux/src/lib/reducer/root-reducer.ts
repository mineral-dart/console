import {combineReducers} from "redux";
import {navigationReducer} from "./navigation-reducer";
import {authenticationReducer} from "./auth-reducer";

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  auth: authenticationReducer
})

export type RootState = ReturnType<typeof rootReducer>