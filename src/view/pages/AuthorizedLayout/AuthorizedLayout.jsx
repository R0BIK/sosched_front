import AuthorizedHeader from "../../components/Headers/AuthorizedHeader.jsx";
import { Outlet } from "react-router-dom";

export default function AuthorizedLayout() {
    return (
        <div className="min-h-screen h-screen flex flex-col overflow-hidden">
            <AuthorizedHeader />
            <div className="mt-18 h-full overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}