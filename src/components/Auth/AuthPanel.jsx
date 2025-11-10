import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LogoButton from "./LogoButton.jsx";
import { GitHubLogo, GoogleLogo } from "../../img/svg/Icons.jsx";
import AuthForm from "./AuthForm.jsx";

import { getSignFormData } from "../../../constants.js";
import PropTypes from "prop-types";

export default function AuthPanel(props = {}) {
    const { type } = props;
    const { t } = useTranslation();
    const SignFormData = getSignFormData(t);

    const formFields = SignFormData.MAIN[type].fields;

    return (
        <div className="flex flex-col items-center justify-center w-[420px] gap-8 p-10 rounded-[10px] shadow-[0_5px_15px] shadow-black-shadow bg-main-white text-center">
            <h1 className="mb-7 font-noto font-bold text-3xl">{SignFormData.MAIN[type].title}</h1>

            <AuthForm formFields={formFields} type={type} />

            {type === 'SignIn' && (
                <Link className="underline" to={SignFormData.MAIN[type].alternativeLink}>
                    {SignFormData.MAIN[type].additional}
                </Link>
            )}

            <p className="text-second-text">
                {SignFormData.MAIN[type].alternativeText}{" "}
                <Link className="underline text-main-black" to={SignFormData.MAIN[type].alternativeLink}>
                    {SignFormData.MAIN[type].alternative}
                </Link>.
            </p>

            <div className="flex items-center w-full text-main-black text-[16px]">
                <span className="flex-1 border-t-2 rounded-l-full border-second-text"></span>
                <span className="px-2">{t('auth:or')}</span>
                <span className="flex-1 border-t-2 rounded-r-full border-second-text"></span>
            </div>

            <LogoButton Logo={<GoogleLogo />}>
                {SignFormData.MAIN[type].button} {t('auth:withGoogle')}
            </LogoButton>
            <LogoButton Logo={<GitHubLogo />}>
                {SignFormData.MAIN[type].button} {t('auth:withGitHub')}
            </LogoButton>
        </div>
    );
}

AuthPanel.propTypes = {
    type: PropTypes.string.isRequired,
};