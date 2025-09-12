import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LogoButton from "./LogoButton.jsx";
import { GitHubLogo, GoogleLogo } from "../img/svg/Icons.jsx";
import AnimatedForm from "./AnimatedForm.jsx";

import { getSignFormData } from "../../data.js";
import PropTypes from "prop-types";

export default function AuthPanel(props = {}) {
    const { type } = props;
    const { t } = useTranslation();
    const SignFormData = getSignFormData(t);

    const formFields = SignFormData.Main[type].fields;

    return (
        <div className="flex flex-col items-center justify-center w-[420px] gap-8 p-10 rounded-[10px] shadow-[0_5px_15px_var(--black-shadow)] bg-mainWhite text-center">
            <h1 className="mb-7 font-bold text-3xl">{SignFormData.Main[type].title}</h1>

            <AnimatedForm formFields={formFields} type={type} />

            {type === 'SignIn' && (
                <Link className="underline" to={SignFormData.Main[type].alternativeLink}>
                    {SignFormData.Main[type].additional}
                </Link>
            )}

            <p className="text-secondText">
                {SignFormData.Main[type].alternativeText}{" "}
                <Link className="underline text-mainBlack" to={SignFormData.Main[type].alternativeLink}>
                    {SignFormData.Main[type].alternative}
                </Link>.
            </p>

            <div className="flex items-center w-full text-mainBlack text-[16px]">
                <span className="flex-1 border-t-2 rounded-l-full border-secondText"></span>
                <span className="px-2">{t('auth:or')}</span>
                <span className="flex-1 border-t-2 rounded-r-full border-secondText"></span>
            </div>

            <LogoButton Logo={<GoogleLogo />}>
                {SignFormData.Main[type].button} {t('auth:withGoogle')}
            </LogoButton>
            <LogoButton Logo={<GitHubLogo />}>
                {SignFormData.Main[type].button} {t('auth:withGitHub')}
            </LogoButton>
        </div>
    );
}

AuthPanel.propTypes = {
    type: PropTypes.string.isRequired,
};