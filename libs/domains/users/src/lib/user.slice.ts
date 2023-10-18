import { apiClient } from "@console/api-client"
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction
} from "@reduxjs/toolkit";
import {IUser, UserState} from "@console/interfaces";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {RootState} from "@console/state/store";

export const USER_KEY = 'user'

export const userAdapter = createEntityAdapter<IUser>()

export const fetchUser = createAsyncThunk('user/fetch', async (): Promise<UserState> => {
  const response = await apiClient.get<IUser>('/authentication/me').build()

  console.log("fetchUser:", response.data);
  
  return {
    ...response.data,
    isLoading: false,
    isAuthenticated: true
  }
})

export const initialUserState: UserState = {
  isAuthenticated: false,
  isLoading: false,
}

export const userSlice = createSlice({
  name: USER_KEY,
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log("fetchUser.fulfilled:", action.payload, state);
        state.avatar_url = action.payload.avatar_url
        state.email = action.payload.email
        state.id = action.payload.id
        state.username = action.payload.username
        state.isLoading = false
        state.isAuthenticated = !!action.payload.id
      })
  }
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const getUserState = (root: RootState) => root[USER_KEY]

export const selectUser = createSelector(getUserState, (state) => state)

