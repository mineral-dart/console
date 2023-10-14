import { useApiClient } from "@console/api-client";
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { IOrganization, OrganizationState } from '@console/interfaces'
import { OrganizationEntity } from "libs/interfaces/src/lib/domains/organization.entity";

const apiClient = useApiClient()

export const organizationAdapter = createEntityAdapter<OrganizationEntity>()

export const fetchOrganization = createAsyncThunk('organization/fetch', async () => {
  const response = await apiClient.get('/organizations').build()

  return response.data as IOrganization[]
})

export const initialOrganizationState: OrganizationState = organizationAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  availableContainerRegistries: {
    loadingStatus: 'not loaded',
    items: [],
  },
})

const organizationSlice = createSlice({
  name: 'organization',
  initialState: initialOrganizationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganization.pending, (state) => {
        state.loadingStatus = 'loading'
      })
      .addCase(fetchOrganization.fulfilled, (state, { payload }) => {
        organizationAdapter.upsertMany(state, payload)
        state.loadingStatus = 'loaded'
      })
      .addCase(fetchOrganization.rejected, (state: OrganizationState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })

      // fetch organization by id

      // post organization

      // delete organization

      // update organization

      

  }
})

export const organization = organizationSlice.reducer