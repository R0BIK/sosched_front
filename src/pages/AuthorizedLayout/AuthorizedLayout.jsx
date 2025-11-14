import AuthorizedHeader from "../../components/Headers/AuthorizedHeader.jsx";
import { Outlet } from "react-router-dom";

export default function AuthorizedLayout() {
    return (
        <div className="min-h-screen h-screen flex flex-col">
            <AuthorizedHeader />
            <div className="pt-18 h-full">
                <Outlet />
            </div>
        </div>
    );
}