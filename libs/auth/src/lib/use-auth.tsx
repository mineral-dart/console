import {useQuery} from 'react-query'
import {useApiClient} from '@console/api-client'
import {IUser} from '@console/interfaces'

export function useAuth () {
  const apiClient = useApiClient()

  function useMe () {
    return useQuery('me', async () => {
      const response = await apiClient.get<IUser>('/authentication/me').build()

      return response.data
    })
  }

  return { useMe }
}