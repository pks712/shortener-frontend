import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { BrowserRouter } from 'react-router-dom';
import { UrlProvider } from './coustemHook/useUrl.jsx';

// ✅ QueryClient create karo
const queryClient = new QueryClient();

// ✅ Sab kuch wrap karo
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UrlProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </UrlProvider>
    </BrowserRouter>
  </StrictMode>
);
