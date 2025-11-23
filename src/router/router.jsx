import {createBrowserRouter, Navigate} from "react-router-dom"

import AuthPage from "../pages/AuthPage.jsx";
import AuthPanel from "../components/Auth/AuthPanel.jsx";
import Schedule from "../pages/AuthorizedLayout/Schedule.jsx";
import AuthorizedLayout from "../pages/AuthorizedLayout/AuthorizedLayout.jsx";
import Members from "../pages/AuthorizedLayout/Space/SpaceTabs/Members.jsx";
import Profile from "../pages/AuthorizedLayout/Profile.jsx";
import Space from "../pages/AuthorizedLayout/Space/Space.jsx";
import Roles from "../pages/AuthorizedLayout/Space/SpaceTabs/Roles.jsx";
import Tags from "../pages/AuthorizedLayout/Space/SpaceTabs/Tags.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import TagTypes from "../pages/AuthorizedLayout/Space/SpaceTabs/TagTypes.jsx";
import Events from "../pages/AuthorizedLayout/Space/SpaceTabs/Events.jsx";
import AuthRedirect from "./routes/AuthRedirect.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthPage />,
        children: [
            { path: '', element: <Navigate to="login" replace /> },
            { path: 'register', element: <AuthPanel /> },
            { path: 'login', element:
                    (
                        <AuthRedirect>
                            <AuthPanel />
                        </AuthRedirect>
                    )
            },
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
                    { path: '', element: <Navigate to="members" replace /> },
                    { path: '/mySpace/roles', element: <Roles /> },
                    { path: '/mySpace/members', element: <Members /> },
                    { path: '/mySpace/tags', element: <Tags /> },
                    { path: '/mySpace/tagTypes', element: <TagTypes /> },
                    { path: '/mySpace/events', element: <Events /> },
                ],
            },
            { path: '/profile', element: <Profile isEdit={false} isOwner={true} /> },
            { path: '/profile/edit', element: <Profile isEdit={true} isOwner={true} /> },
            { path: '/users/:id', element: <Profile isEdit={false} isOwner={false} /> },
        ],
    }
]);