import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './router/router.jsx'

import "./i18n/i18n.js";
import './index.css'
import {AuthProvider} from "./context/AuthContext.jsx";
import {SpaceProvider} from "./context/SpaceContext.jsx";
import {ToastProvider} from "./context/Toast/ToastContext.jsx";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <ToastProvider>
              <AuthProvider>
                  <SpaceProvider>
                      <RouterProvider router={router} />
                  </SpaceProvider>
              </AuthProvider>
          </ToastProvider>
      </QueryClientProvider>
  </StrictMode>,
)