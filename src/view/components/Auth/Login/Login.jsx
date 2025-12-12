import { useNavigate } from "react-router-dom";
import {useCallback, useState} from 'react';

import AuthInputBox from '../AuthInputBox.jsx';
import HoverButton from "../HoverButton.jsx";

import {LOGIN_FIELDS} from "../../../../constants/authConstants.js";
import {useAuth} from "../../../../context/AuthContext.jsx";
import {
    getValidationErrorsMap
} from "../../../../utils/errorMapping.js";
import {useValidate} from "../../../../hooks/useValidate.js";

const FORM_CONFIG = {
    email: true,
    password: true,
}

export default function LoginForm() {
    const navigate = useNavigate();

    const validation = useValidate(FORM_CONFIG);
    const { errors, validateForm, addExternalError, resetErrors, validateField, clearError } = validation;

    const [formData, setFormData] = useState({ email: "", password: "" });

    const { login } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm(formData);
        if (!isValid) return;

        try {
            await login(formData);

            navigate("/schedule");
            resetErrors();
            e.target.reset();
        } catch (error) {
            const errors = getValidationErrorsMap(error);
            for (const [key, value] of Object.entries(errors)) {
                await addExternalError(key, value);
            }
            // focusFirstErrorField(errors);
        }
    }

    const handleBlur = (key, value) => {
        if (value !== "")
            validateField(key, value, formData);
        else
            clearError(key)
    }

    const handleChange = useCallback((key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        clearError(key);
    }, [clearError]);

    const handleClear = (key) => {
        handleChange(key, "");
    }

    return (
        <form
            name="login-form"
            noValidate
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-[50px] w-full text-left"
        >
            {LOGIN_FIELDS.map((field, index) => {
                return (
                    <AuthInputBox
                        className="w-full"
                        key={index}
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        name={field.name}
                        value={formData[field.id]}
                        errorText={errors[field.id]}
                        onBlur={(e) => handleBlur(e.target.id, e.target.value)}
                        onChange={(e) => handleChange(e.target.id, e.target.value)}
                        handleClear={() => handleClear(field.id)}
                    />
                );
            })}

            <HoverButton type="submit">
                Увійти
            </HoverButton>
        </form>
    );
}