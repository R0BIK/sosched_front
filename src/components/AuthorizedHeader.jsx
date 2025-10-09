import UnderlinedButton from "./UnderlinedButton.jsx";

export default function AuthorizedHeader() {
    return (
        <div className="bg-gray-300/20 w-full h-[70px] flex justify-center">
            <div>

            </div>
            <div className="flex justify-center items-center">
                <UnderlinedButton text={"Головна"} to={"/home"}/>
                <UnderlinedButton text={"Розклад"} to={"/schedule"}/>
                <UnderlinedButton text={"Моя група"} to={"/group"}/>
                <UnderlinedButton text={"Викладачі"} to={"/teachers"}/>
            </div>
            <div className="flex justify-end items-center">
                <div>
                    
                </div>
            </div>
        </div>
    )
}