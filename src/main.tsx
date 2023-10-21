import { Fragment, StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {ApiClient, ApiClientProvider} from '@console/api-client'
import { setupStore } from '@console/state/store'
import {ModalProvider} from "@console/ui";
// import store from './app/store';

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
const store = setupStore()

root.render(
  <div>
    <StrictMode>
    <ApiClientProvider apiClient={apiClient}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
        

          
            <BrowserRouter>
            <TooltipProvider>
              <Fragment>
                <ModalProvider>
                  <App />
                </ModalProvider>

              </Fragment>
            </TooltipProvider>
            </BrowserRouter>
            
          

       
        </QueryClientProvider>
       </Provider>
       </ApiClientProvider>
    </StrictMode>
  </div>
  
);
