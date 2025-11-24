import UnderlinedButton from "../UnderlinedButton.jsx";
import {useLocation, Link, useNavigate} from "react-router-dom";

export default function UnAuthorizedHeader() {
    const location = useLocation();
    const navigate = useNavigate();

    const getIsActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    const handleNavigationClick = (path) => () => {
        navigate(path);
    };

    const isLogin = location.pathname === "/login";

    return (
        <header className="fixed top-0 z-50 w-full h-18 items-center content-center grid grid-cols-3 px-9 py-3
        inset-shadow-current/20 backdrop-blur-sm bg-glass-bg inset-shadow-sm border-b-1 border-b-glass-border">
            <div className="flex items-center">
                <p className="font-dancing text-accent text-[40px] select-none">S</p>
                <p className="font-dancing text-main-black text-[40px] select-none">osched</p>
            </div>

            <div className="flex justify-center items-center whitespace-nowrap">
                <UnderlinedButton text="Головна" onClick={handleNavigationClick("/home")} isActive={getIsActive("/home")} />
                <UnderlinedButton text="Про нас" onClick={handleNavigationClick("/about")} isActive={getIsActive("/about")} />
            </div>

            <div className="flex justify-end items-center">
                <Link to={!isLogin ? "/login" : "/register"}>
                    {!isLogin ? "Увійти" : "Зареєструватись"}
                </Link>
            </div>
        </header>
    )
}