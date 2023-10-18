import { useApiClient } from "@console/api-client";
import { PayloadAction, createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { IOrganization, OrganizationState } from '@console/interfaces'
import { OrganizationEntity } from "libs/interfaces/src/lib/domains/organization.entity";
import { type RootState } from "@console/state/store"
import { apiClient } from '@console/api-client'

export const organizationAdapter = createEntityAdapter<OrganizationEntity>()

export const fetchOrganization = createAsyncThunk('organization/fetch', async () => {  
  const response = await apiClient.get<{ meta: any, data: IOrganization[]}>('/organizations').build()
  
  return response.data.data as IOrganization[]
})

export const fetchOrganizationById = createAsyncThunk(
  'organization/fetch-by-id',
  async (payload: { organizationId: string }) => {
    const response = await apiClient.get<IOrganization>(`/organizations/${payload.organizationId}`).build()

    return response.data as IOrganization
  }
)


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
      .addCase(fetchOrganization.fulfilled, (state: OrganizationState, action: PayloadAction<OrganizationEntity[]>) => {        
        organizationAdapter.upsertMany(state, action.payload)
        state.loadingStatus = 'loaded'
      })
      .addCase(fetchOrganization.rejected, (state: OrganizationState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })

      // fetch organization by id
      .addCase(
        fetchOrganizationById.fulfilled,
        (state: OrganizationState, action: PayloadAction<OrganizationEntity>) => {
          organizationAdapter.upsertOne(state, action.payload)
          state.loadingStatus = 'loaded'
        }
      )

      // post organization

      // delete organization

      // update organization



  }
})

export const organization = organizationSlice.reducer

const { selectAll } = organizationAdapter.getSelectors()

export const getOrganizationState = (rootState: RootState): OrganizationState =>
  rootState.organization['organizations']

export const selectAllOrganization = createSelector(getOrganizationState, selectAll)
