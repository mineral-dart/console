import {combineReducers} from "redux";
import {navigationReducer} from "./navigation-reducer";

export const rootReducer = combineReducers({
  navigation: navigationReducer
})

export type RootState = ReturnType<typeof rootReducer>