import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Default } from './pages/index.js'
import AuthPage from "./pages/AuthPage.jsx";
import AuthPanel from "./components/Auth/AuthPanel.jsx";
import Schedule from "./pages/Schedule.jsx";

import "./i18n/i18n.js";

import './index.css'
import AuthorizedLayout from "./components/AuthorizedLayout.jsx";
import MonthCalendar from "./components/Schedule/MonthCalendar.jsx";
import Teachers from "./pages/Teachers.jsx";

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
        element: <AuthorizedLayout />,
        children: [
            { path: '/schedule', element: <Schedule /> },
            { path: '/home', element: <Schedule /> },
            { path: '/teachers', element: <Teachers /> },
            { path: '/group', element: <Schedule /> },
        ]
    },
    {
        path: '/Default',
        element: <Default />
    },
    {
        path: '/Schedule',
        element: <Schedule />
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)