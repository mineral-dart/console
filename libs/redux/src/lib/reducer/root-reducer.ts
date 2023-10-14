import {combineReducers} from "redux";
import {navigationReducer} from "./navigation-reducer";
import {authenticationReducer} from "./auth-reducer";
import { organizationsReducer } from "./organizations-reducer";

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  auth: authenticationReducer,
  organizations: organizationsReducer
})

export type RootState = ReturnType<typeof rootReducer>