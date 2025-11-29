import {Outlet} from "react-router-dom";

import UnAuthorizedHeader from "../components/Headers/UnAuthorizedHeader.jsx";

export default function AuthPage() {
    return (
        <div className="min-h-screen h-screen flex flex-col overflow-hidden">
            <UnAuthorizedHeader />
            <div className="flex flex-col mt-18 flex-grow items-center justify-center bg-main-white overflow-hidden">
                <Outlet />
            </div>
        </div>
    )
}