import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { routes } from './app/router/Routes';
import { store, StoreContext } from './lib/stores/store';
import {ToastContainer} from  'react-toastify'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
        <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer aria-label={undefined} position='bottom-right' hideProgressBar theme='colored' />
    </QueryClientProvider>
    </StoreContext.Provider>


  </StrictMode>,
)
