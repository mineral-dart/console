import React, { createContext, ReactNode } from 'react'
import { ApiClient } from './api-client'

export const ApiClientContext = createContext<ApiClient | null>(null)

export const ApiClientProvider: React.FC<{ apiClient: ApiClient, children: ReactNode }> = ({ apiClient, children }) => {
  return (
    <ApiClientContext.Provider value={apiClient}>
      { children }
    </ApiClientContext.Provider>
  )
}
