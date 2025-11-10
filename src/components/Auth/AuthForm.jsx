import { useNavigate } from "react-router-dom";
import { useValidateForm } from "../../hooks/SignFormHooks.js";
import { useKeyDownEnterHandler } from "../../hooks/KeyDownHooks.js";
import { useRef } from 'react';
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

import AuthInputBox from './AuthInputBox.jsx';
import HoverButton from "./HoverButton.jsx";

import {AUTH_TYPES, getSignFormData, SPECIAL} from "../../../constants.js";
import PropTypes from "prop-types";
import {useAuth} from "../../context/AuthContext.jsx";

export default function AuthForm(props = {}) {
    const { type, formFields } = props;
    const { t } = useTranslation();
    const SignFormData = getSignFormData(t);

    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const buttonRef = useRef(null);
    const { errors, inputOnBlur, handleSubmit } = useValidateForm({ inputRefs, formFields });
    const { handleEnterAsTab } = useKeyDownEnterHandler();

    const { login, register } = useAuth();

    const mutation = useMutation({
        mutationFn: type === AUTH_TYPES.LOGIN ? login : register,
        onSuccess: () => {
            navigate("/schedule");
        },
        onError: (error) => {
            console.error("Auth error:", error);
            alert("Login failed");
        },
    });

    const onSubmit = (e) => {
        const newErrors = handleSubmit(e);
        if (Object.values(newErrors).every(error => error === SPECIAL.STRING.EMPTY)) {
            sessionStorage.removeItem(SignFormData.MAIN[type].name);

            const formData = Object.fromEntries(new FormData(e.target));

            mutation.mutate(formData)
            e.target.reset();
        } else {
            const firstErrorKey = Object.keys(newErrors).find(key => newErrors[key]);
            if (firstErrorKey) {
                const index = formFields.findIndex(field => SignFormData.FIELDS[field].name === firstErrorKey);
                if (index !== -1 && inputRefs.current[index]) {
                    inputRefs.current[index].focus();
                }
            }
        }
    }

    return (
        <form
            name={SignFormData.MAIN[type].name}
            method="POST"
            noValidate
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-[50px] w-full text-left"
        >
            {formFields.map((fieldKey, index) => {
                const form = SignFormData.FIELDS[fieldKey];
                return (
                    <AuthInputBox
                        key={form.placeholder}
                        className="InputBox w-full"
                        placeholder={form.placeholder}
                        type={form.type}
                        autoComplete={form.autoComplete}
                        name={form.name}
                        onBlur={(e) => inputOnBlur(e.target.name, e.target.value)}
                        errorText={errors[form.name]}
                        onKeyDown={(e) =>
                            handleEnterAsTab({ e, index, inputRefs, formFields, buttonRef })
                        }
                        ref={(el) => (inputRefs.current[index] = el)}
                        isSaving={form.isSaving}
                        formName={SignFormData.MAIN[type].name}
                    />
                );
            })}

            <HoverButton type="submit" ref={buttonRef}>
                {SignFormData.MAIN[type].button}
            </HoverButton>
        </form>
    );
}

AuthForm.propTypes = {
    formFields: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};