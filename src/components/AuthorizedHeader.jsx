import UnderlinedButton from "./UnderlinedButton.jsx";

export default function AuthorizedHeader() {
    return (
        <div className="grid grid-cols-3 bg-gray-300/20 w-full h-[70px] items-center content-center">
            <div className="flex items-center pl-[60px]">
                <p className="font-dancing text-accent text-[40px] select-none">S</p>
                <p className="font-dancing text-main-black text-[40px] select-none">osched</p>
            </div>

            <div className="flex justify-center items-center whitespace-nowrap">
                <UnderlinedButton text="Головна" to="/home" />
                <UnderlinedButton text="Розклад" to="/schedule" />
                <UnderlinedButton text="Моя група" to="/group" />
                <UnderlinedButton text="Викладачі" to="/teachers" />
            </div>

            <div className="flex justify-end items-center pr-[60px]">
                <button className="flex gap-[15px] items-center relative group cursor-pointer">
                    <div className="flex flex-col">
                        <p className="font-noto text-main-black/90 group-hover:text-main-black">
                            Цапурда Єгор Дмитрович
                        </p>
                        <div className="flex gap-[10px] justify-end items-center">
                            <p className="font-noto text-second-text text-[14px] group-hover:text-main-black">
                                Студент
                            </p>
                            <p className="border-[2px] text-second-text text-[12px] rounded-[5px] border-second-text px-[5px] group-hover:text-main-black group-hover:border-main-black">
                                11-A
                            </p>
                        </div>
                    </div>
                    <div className="w-[42px] h-[42px] rounded-full bg-gray-400 flex items-center justify-center">
                        {/* Здесь можно вставить иконку пользователя */}
                        <span className="text-white font-bold">U</span>
                    </div>
                </button>
            </div>
        </div>
    )
}