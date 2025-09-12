import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Default } from './pages/index.js'
import AuthPage from "./pages/AuthPage.jsx";
import AuthPanel from "./components/AuthPanel.jsx";

import "./i18n/i18n.js";

import './index.css'


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthPage />,
        children: [
            {
                index: true,
                element: <AuthPanel type={"SignIn"} />
            },
            {
                path: 'SignUp',
                element: <AuthPanel type={"SignUp"} />
            },
            {
                path: 'SignIn',
                element: <AuthPanel type={"SignIn"} />
            }
        ]
    },
    {
        path: '/Default',
        element: <Default />
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)