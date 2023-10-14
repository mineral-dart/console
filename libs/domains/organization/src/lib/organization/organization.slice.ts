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
  extraReducers: (builder) => {}
})

export const organization = organizationSlice.reducer