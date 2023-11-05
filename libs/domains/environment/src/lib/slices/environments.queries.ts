import { type QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { apiClient } from '@console/api-client'
import { Environment } from '@console/interfaces'

export const useFetchEnvironments = (
  projectId: string,
  select?: (data: any) => any
) => {
  const queryClient = useQueryClient()

  return useQuery(
    ['project', projectId, 'environments'],
    async () => {
      const response = await apiClient.get(``).build()
      return response.data
    }, 
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['environmentsStatus', projectId])
      },
      //onError: (err) => toastError(err as Error),
      select,
      enabled: projectId !== '',
    }
  )
}

export const useFetchEnvironment = (projectId: string, environmentId: string) =>
  useFetchEnvironments(projectId, (environments) =>
    environments.find((environment: Environment) => environment.id === environmentId)
  )


export const useCreateEnvironment = (
  onSuccessCallback?: (result: any) => void,
  onSettledCallback?: () => void
) => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ projectId, data }: { projectId: string, data: any}) => {
      const response = await apiClient
        .post(`/environments/${projectId}`)
        .payload({
          name: data.name,
          project_id: projectId,
          mode: 'automatic'
        })
        .build()
      return response.data
    }, {
      onSuccess: (result, variables) => {
        queryClient.setQueryData<Environment[] | undefined>(['project', variables.projectId, 'environments'], (old) => {
          return old ? [...old, result] : old
        })

        // toast(ToastEnum.SUCCESS, 'Your environment has been successfully created')
        onSuccessCallback && onSuccessCallback(result)
      },
      //onError: (err) => toastError(err as Error);
      onSettled: () => onSettledCallback && onSettledCallback(),
    }
  )
}