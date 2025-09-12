import { useTranslation } from "react-i18next";
import DropDownMenu from "./DropDownMenu/DropDownMenu.jsx";
import { LOCALES_TEXT } from "../i18n/resources.js";
import logo from '../img/1024.png'

export default function Header() {
    const { i18n, t } = useTranslation();

    const changeLanguage = (key) => {
        i18n.changeLanguage(key)
    }

    return (
        <header className="flex items-center h-[100px] w-full px-5">
            {/* Левая часть */}
            <div className="flex w-full justify-start">
                <img className="h-[70px]" src={logo} alt="logo" />
            </div>

            {/* Правая часть */}
            <div className="flex w-full justify-end pr-5">
                <DropDownMenu
                    onChoose={changeLanguage}
                    options={LOCALES_TEXT}
                    placeholder={t('global:languages:ChooseLang')}
                    keyValue={i18n.language}
                />
            </div>
        </header>
    )
}