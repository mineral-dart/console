import { OrganizationsState } from "@console/interfaces";
import { createReducer } from "@reduxjs/toolkit";
import { updateOrganizationsState } from "../actions";

const initialState: OrganizationsState = {
    organizations: []
}

export const organizationsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateOrganizationsState, (state, action) => {
      state.organizations = action.payload
    })
})