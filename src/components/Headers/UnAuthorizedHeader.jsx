import UnderlinedButton from "../UnderlinedButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";

export default function UnAuthorizedHeader() {
    const navigate = useNavigate();
    const location = useLocation();

    const isLogin = location.pathname === "/login";

    return (
        <header className="fixed top-0 z-50 w-full h-18 items-center content-center grid grid-cols-3 px-9 py-3
        inset-shadow-current/20 backdrop-blur-sm bg-glass-bg inset-shadow-sm border-b-1 border-b-glass-border">
            <div className="flex items-center">
                <p className="font-dancing text-accent text-[40px] select-none">S</p>
                <p className="font-dancing text-main-black text-[40px] select-none">osched</p>
            </div>

            <div className="flex justify-center items-center whitespace-nowrap">
                <UnderlinedButton text="Головна" to="/home" />
                <UnderlinedButton text="Про нас" to="/about" />
            </div>

            <div className="flex justify-end items-center">
                <a href={!isLogin ? "/login" : "/register"}>
                    {!isLogin ? "Увійти" : "Зареєструватись"}
                </a>
            </div>
        </header>
    )
}