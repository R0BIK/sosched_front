import UnderlinedButton from "../UnderlinedButton.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useUserById} from "../../tanStackQueries/user/useUserById.js";
import {useSpace} from "../../context/SpaceContext.jsx";

export default function AuthorizedHeader() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const { activeSpace } = useSpace()

    const domain = activeSpace?.domain;
    const userId = user?.id;

    const { data: userData, isLoading, error } = useUserById(userId, domain);

    return (
        <header className="fixed top-0 z-50 w-full h-18 items-center content-center grid grid-cols-3 px-9 py-3
        inset-shadow-current/20 backdrop-blur-sm bg-glass-bg inset-shadow-sm border-b-1 border-b-glass-border">
            <div className="flex items-center">
                <p className="font-dancing text-accent text-[40px] select-none">S</p>
                <p className="font-dancing text-main-black text-[40px] select-none">osched</p>
            </div>

            <div className="flex justify-center items-center whitespace-nowrap">
                <UnderlinedButton text="Головна" to="/home" />
                <UnderlinedButton text="Календар" to="/schedule" />
                <UnderlinedButton text="Мій простір" to="/mySpace" />
            </div>

            <div className="flex justify-end items-center">
                <button
                    onClick={() => {navigate("/profile")}}
                    className="flex gap-[15px] items-center relative group cursor-pointer">
                    <div className="flex flex-col text-right">
                        <p className="font-noto text-main-black/90 group-hover:text-main-black">
                            {userData?.lastName} {userData?.firstName} {userData?.patronymic}
                        </p>
                        <div className="flex gap-[10px] justify-end items-center">
                            <p className="font-noto text-second-text text-[14px] group-hover:text-main-black">
                                {userData?.role}
                            </p>
                            {/*<p className="border-[2px] text-second-text text-[12px] rounded-[5px] border-second-text px-[5px] group-hover:text-main-black group-hover:border-main-black">*/}
                            {/*    11-A*/}
                            {/*</p>*/}
                        </div>
                    </div>
                    <div className="min-w-[42px] min-h-[42px] rounded-full bg-gray-400 flex items-center justify-center">
                        {/* Здесь можно вставить иконку пользователя */}
                        <span className="text-white font-bold">U</span>
                    </div>
                </button>
            </div>
        </header>

    )
}