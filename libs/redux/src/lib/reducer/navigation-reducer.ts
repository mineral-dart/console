import {createReducer} from "@reduxjs/toolkit";
import {updateNavigationState, updateSettingsNavigationState} from "../actions";
import {NavigationState} from "@console/interfaces";

const initialState: NavigationState = {
  navigation: [],
  settingsNavigation: []
}

export const navigationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateNavigationState, (state, action) => {
      state.navigation = action.payload.navigation
      state.settingsNavigation = action.payload.settingsNavigation
    })
    .addCase(updateSettingsNavigationState, (state, action) => {
      state.settingsNavigation = action.payload
    })
})