import AuthorizedHeader from "../components/AuthorizedHeader.jsx";
import { Outlet } from "react-router-dom";

export default function AuthorizedLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthorizedHeader />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}