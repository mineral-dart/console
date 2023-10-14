import { createAsyncThunk } from '@reduxjs/toolkit'
import { useApiClient } from '@console/api-client'


export const editMemberRole = createAsyncThunk(
  'organization/edit-member-role',
  async (payload: { organizationId: string, data: any}, { dispatch }) => {
    try {
      const result: any[] = []
      

      return result
    } catch (error: unknown) {
      // error message
      // TODO toast message
    }
  }
)