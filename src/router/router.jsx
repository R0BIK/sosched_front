import { createBrowserRouter } from "react-router-dom"

import { Default } from '../pages/index.js'
import AuthPage from "../pages/AuthPage.jsx";
import AuthPanel from "../components/Auth/AuthPanel.jsx";
import Schedule from "../pages/Schedule.jsx";
import AuthorizedLayout from "../pages/AuthorizedLayout.jsx";
import Members from "../pages/SpaceTabs/Members.jsx";
import Profile from "../pages/Profile.jsx";
import Space from "../pages/Space.jsx";
import Roles from "../pages/SpaceTabs/Roles.jsx";
import Tags from "../pages/SpaceTabs/Tags.jsx";
import {AUTH_TYPES} from "../../constants.js";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import {SpaceProvider} from "../context/SpaceContext.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthPage />,
        children: [
            { index: true, element: <AuthPanel type={AUTH_TYPES.LOGIN} /> },
            { path: 'SignUp', element: <AuthPanel type={AUTH_TYPES.REGISTER} /> },
            { path: 'SignIn', element: <AuthPanel type={AUTH_TYPES.LOGIN} /> },
        ],
    },
    {
        element: (
            <PrivateRoute>
                    <AuthorizedLayout />
            </PrivateRoute>),
        children: [
            { path: '/schedule', element: <Schedule /> },
            { path: '/home', element: <Schedule /> },
            {
                path: '/mySpace',
                element: <Space />,
                children: [
                    { path: '/mySpace/roles', element: <Roles /> },
                    { path: '/mySpace/members', element: <Members /> },
                    { path: '/mySpace/tags', element: <Tags /> },
                ],
            },
            { path: '/profile', element: <Profile /> },
        ],
    },
    {
        path: '/Default',
        element: <Default />,
    },
]);