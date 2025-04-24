import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import { SignIn, SignUp, Default } from './pages'


const router = createBrowserRouter([
    {
        path: '/SignIn',
        element: <SignIn />
    },
    {
        path: '/SignUp',
        element: <SignUp />
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