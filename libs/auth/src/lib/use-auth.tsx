import {useQuery} from 'react-query'
import { apiClient } from '@console/api-client'
import {IUser} from '@console/interfaces'
import { useCallback } from 'react'

export function useAuth () {
  function useMe () {
    return useQuery('me', async () => {
      const response = await apiClient.get<IUser>('/authentication/me').build()

      return response.data
    })
  }

  // const checkIsAuthenticated = useCallback(() => {
  //   return isAuthenticated
  // }, [isAuthenticated])()

  return { useMe }
}