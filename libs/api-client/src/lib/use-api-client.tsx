import {ApiClient} from './api-client'
import {useContext} from 'react'
import {ApiClientContext} from './api-client-context'

export const useApiClient = (): ApiClient => {
  const apiClient = useContext(ApiClientContext)

  if (!apiClient) {
    throw new Error("Le contexte de l'ApiClient doit être utilisé à l'intérieur d'un ApiClientProvider")
  }
  return apiClient
}