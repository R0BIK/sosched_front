import Header from "../components/Header/Header.jsx";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}