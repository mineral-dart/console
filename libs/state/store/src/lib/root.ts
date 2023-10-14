import { type PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  initialOrganizationState,
  organization
} from '@console/domains/organization'

export const organizationReducer = combineReducers({
  organizations: organization
})

export const rootReducer = combineReducers({
  organization: organizationReducer
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
  }
})