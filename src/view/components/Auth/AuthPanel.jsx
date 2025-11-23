import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import LoginForm from "./Login/Login.jsx";
import RegisterForm from "./Register/Register.jsx";

export default function AuthPanel() {
    const location = useLocation();
    const type = location.pathname === "/login" ? "login" : location.pathname === "/register" ? "register" : "login";

    const title = type === "login" ? "Авторизація" : "Реєстрація";
    const alternativePath = type === "login" ? "/register" : "/login";
    const alternativeButton = type === "login" ? "Зареєструватись" : "Увійти";


    return (
        <div className="flex h-full flex-col overflow-auto w-full items-center p-10">
            <div className="flex flex-col items-center justify-center w-[420px] gap-8 p-10 rounded-[10px] shadow-[0_5px_15px] shadow-black-shadow bg-main-white text-center">
                <h1 className="mb-7 font-noto font-bold text-3xl">{title}</h1>

                {type === "login" && (
                    <LoginForm />
                )}
                {type === "register" && (
                    <RegisterForm />
                )}

                {type === 'login' && (
                    <Link className="underline" to={"/register"}>
                        Забули пароль?
                    </Link>
                )}

                <p className="text-second-text">
                    {type === "login" ? "Немає акаунта? " : "Вже маєте акаунт? "}
                    <Link className="underline text-main-black" to={alternativePath}>
                        {alternativeButton}
                    </Link>.
                </p>

                {/*<div className="flex items-center w-full text-main-black text-[16px]">*/}
                {/*    <span className="flex-1 border-t-2 rounded-l-full border-second-text"></span>*/}
                {/*    <span className="px-2">{t('auth:or')}</span>*/}
                {/*    <span className="flex-1 border-t-2 rounded-r-full border-second-text"></span>*/}
                {/*</div>*/}

                {/*<LogoButton Logo={<GoogleLogo />}>*/}
                {/*    {t('auth:withGoogle')}*/}
                {/*</LogoButton>*/}
                {/*<LogoButton Logo={<GitHubLogo />}>*/}
                {/*    {t('auth:withGitHub')}*/}
                {/*</LogoButton>*/}
            </div>
        </div>
    );
}

AuthPanel.propTypes = {
    type: PropTypes.string.isRequired,
};