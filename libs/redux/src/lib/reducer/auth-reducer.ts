import {AuthenticationState} from "@console/interfaces";
import {createReducer} from "@reduxjs/toolkit";
import {updateUserState} from "../actions/authentication-actions";

const initialState: AuthenticationState = {
  user: null
}

export const authenticationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateUserState, (state, action) => {
      console.log(action.payload)
      state.user = action.payload
    })
})