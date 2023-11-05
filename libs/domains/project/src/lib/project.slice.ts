import { PayloadAction, createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { ProjectEntity, ProjectsState } from '@console/interfaces'
import { apiClient } from '@console/api-client'
import { type RootState } from "@console/state/store"

export const PROJECTS_FEATURE_KEY = 'projects'

export const projectsAdapter = createEntityAdapter<ProjectEntity>()

export const fetchProjects = createAsyncThunk<ProjectEntity[], { organizationId: string }>('projects/fetch', async (data) => {
  const response = await apiClient.get<{ meta: any, data: ProjectEntity[] }>(`/organizations/${data.organizationId}/projects`).build()

  return response.data.data as ProjectEntity[]
})

export const postProject = createAsyncThunk<any, { organizationId: string }>(
  'project/post',
  async (data, { rejectWithValue }) => {
    const { organizationId, ...fields} = data
    
    console.log(organizationId, fields);
    
    try {
      const result = await apiClient.post('/organizations/projects')
        .payload({
          ...fields, organizationId
        }).build()

      return result.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const initialProjectsState: ProjectsState = projectsAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  joinOrganizationProject: {}
})

export const projectsSlice = createSlice({
  name: PROJECTS_FEATURE_KEY,
  initialState: initialProjectsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProjects.pending, (state) => {
      state.loadingStatus = 'loading'
    })
    .addCase(fetchProjects.fulfilled, (state: ProjectsState, action: PayloadAction<ProjectEntity[]>) => {
      projectsAdapter.upsertMany(state, action.payload)
      // action.payload.forEach((project: ProjectEntity) => {
      //   state.joinOrganizationProject = addOneToManyRelation(project.organization?.id, project.id, {
      //     ...state.joinOrganizationProject,
      //   })
      // })
      state.loadingStatus = 'loaded'
    })
    .addCase(fetchProjects.rejected, (state: ProjectsState, action) => {
      state.loadingStatus = 'error'
      state.error = action.error.message
    })
  }
})

export const projects = projectsSlice.reducer

export const projectsActions = projectsSlice.actions

const { selectAll, selectEntities } = projectsAdapter.getSelectors()


export const getProjectsState = (rootState: RootState): ProjectsState => rootState.project[PROJECTS_FEATURE_KEY]

export const selectAllProjects = createSelector(getProjectsState, selectAll)

export const selectProjectsEntities = createSelector(getProjectsState, selectEntities)
