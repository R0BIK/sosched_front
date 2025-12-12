import { useNavigate } from "react-router-dom";
import {useCallback, useState} from 'react';

import AuthInputBox from '../AuthInputBox.jsx';
import HoverButton from "../HoverButton.jsx";

import {REGISTER_FIELDS} from "../../../../constants/authConstants.js";
import {useAuth} from "../../../../context/AuthContext.jsx";
import { getValidationErrorsMap } from "../../../../utils/errorMapping.js";
import {useCreateSpace} from "../../../../tanStackQueries/space/useCreateSpace.js";
import {useValidate} from "../../../../hooks/useValidate.js";

const FORM_CONFIG = {
    firstName: true,
    lastName: true,
    email: true,
    password: true,
}

export default function RegisterForm() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { mutateAsync: createSpace } = useCreateSpace();

    const validation = useValidate(FORM_CONFIG);
    const { errors, validateForm, addExternalError, resetErrors, validateField, clearError } = validation;

    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

    const getDomain = (email) => {
        if (!email || typeof email !== "string") return "";
        const [name, domain] = email.split("@");
        if (!name || !domain) return "";
        return `${name}.${domain}`;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm(formData);
        if (!isValid) return;

        try {
            const registerResult = await register(formData);
            const userId = registerResult?.id;

            if (userId) {
                await createSpace({
                    name: "Мій простір",
                    domain: getDomain(formData.email),
                    isPublic: false,
                });
            }

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
            name="register-form"
            noValidate
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-13 w-full text-left"
        >
            {REGISTER_FIELDS.map((field, index) => {
                const autoComplete = field.name === "password" ? "new-password" : field.autoComplete;
                return (
                    <AuthInputBox
                        className="w-full"
                        key={index}
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={autoComplete}
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
                Зареєструватись
            </HoverButton>
        </form>
    );
}