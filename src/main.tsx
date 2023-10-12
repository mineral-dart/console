import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import {Provider} from "react-redux";
import store from "./app/store";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {ApiClient, ApiClientProvider} from '@console/api-client'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      onError: (error: any) => {
        console.log('ERROR', error)
        if (error.response.status === 401) {
          window.location.href = '/login'
        }
      }
    }
  }
})

const apiClient = new ApiClient('http://localhost:4444')

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />

          <ApiClientProvider apiClient={apiClient}>
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </ApiClientProvider>


        </QueryClientProvider>

      </BrowserRouter>
    </Provider>
  </StrictMode>
);
