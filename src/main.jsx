import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Default } from './pages/index.js'
import { NewSignIn, NewSignUp } from './components/SignFormContent'
import AuthPage from "./pages/AuthPage.jsx";

import './index.css'


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthPage />,
        children: [
            {
                index: true,
                element: <NewSignIn />
            },
            {
                path: 'SignUp',
                element: <NewSignUp />
            },
            {
                path: 'SignIn',
                element: <NewSignIn />
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