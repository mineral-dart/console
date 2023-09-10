import {createReducer} from "@reduxjs/toolkit";
import {updateNavigationState} from "../actions";
import {NavigationState} from "@console/interfaces";

const initialState: NavigationState = {
  navigation: []
}

export const navigationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateNavigationState, (state, action) => {
      state.navigation = action.payload
    })
})