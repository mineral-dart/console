import { type PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  initialOrganizationState,
  organization
} from '@console/domains/organization'
import {initialProjectsState, projects} from "@console/domains/project";
import {userReducer} from "@console/domains/users";

export const organizationReducer = combineReducers({
  organizations: organization
})

export const projectReducer = combineReducers({
  projects: projects
})


export const rootReducer = combineReducers({
  organization: organizationReducer,
  project: projectReducer,
  user: userReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const initialRootState = (): RootState => ({
  organization: {
    organizations: initialOrganizationState
  },
  project: {
    projects: initialProjectsState
  }
})