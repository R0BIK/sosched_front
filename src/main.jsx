import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Default } from './pages/index.js'
import AuthPage from "./pages/AuthPage.jsx";
import AuthPanel from "./components/Auth/AuthPanel.jsx";
import Schedule from "./pages/Schedule.jsx";
import AuthorizedLayout from "./components/AuthorizedLayout.jsx";
import Members from "./pages/SpaceConfigurationTabs/Members.jsx";
import Profile from "./pages/Profile.jsx";
import SpaceConfiguration from "./pages/SpaceConfiguration.jsx";

import "./i18n/i18n.js";

import './index.css'
import General from "./pages/SpaceConfigurationTabs/General.jsx";
import Roles from "./pages/SpaceConfigurationTabs/Roles.jsx";
import Tags from "./pages/SpaceConfigurationTabs/Tags.jsx";


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
            { path: '/mySpace',
                element: <SpaceConfiguration />,
                children: [
                    { path: '/mySpace/general', element: <General /> },
                    { path: '/mySpace/roles', element: <Roles /> },
                    { path: '/mySpace/members', element: <Members /> },
                    { path: '/mySpace/tags', element: <Tags /> },
                ]
            },
            { path: '/profile', element: <Profile /> },
        ]
    },
    {
        path: '/Default',
        element: <Default />
    },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)