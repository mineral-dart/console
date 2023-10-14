import { createAsyncThunk } from '@reduxjs/toolkit'
import { useApiClient } from '@console/api-client'

const apiClient = useApiClient()

export const editMemberRole = createAsyncThunk(
  'organization/edit-member-role',
  async (payload: { organizationId: string, data: any}, { dispatch }) => {
    try {
      const result = await apiClient.get(`/organizations`).build()

      console.log(result);
      

      return result
    } catch (error: unknown) {
      // error message
      // TODO toast message
    }
  }
)