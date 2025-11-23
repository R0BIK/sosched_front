import { useNavigate } from "react-router-dom";
import { useValidateForm } from "../../../hooks/authHooks.js";
import { useKeyDownEnterHandler } from "../../../hooks/KeyDownHooks.js";
import { useRef } from 'react';

import AuthInputBox from './../AuthInputBox.jsx';
import HoverButton from "./../HoverButton.jsx";

import {LOGIN_FIELDS, REGISTER_FIELDS} from "../../../constants/authConstants.js";
import {useAuth} from "../../../context/AuthContext.jsx";
import {SPECIAL} from "../../../constants/constants.js";
import {
    getFieldKey,
    getFriendlyErrorMessage,
    getValidationErrorsMap
} from "../../../services/errorMaping/errorMapping.js";
import {useSpace} from "../../../context/SpaceContext.jsx";
import {login} from "../../../services/api/authApi.js";

export default function RegisterForm() {
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const buttonRef = useRef(null);
    const { errors, inputOnBlur, handleSubmit, addError } = useValidateForm({inputRefs});
    const { handleEnterAsTab } = useKeyDownEnterHandler();

    const { register } = useAuth();
    const { createSpace } = useSpace();

    const getDomain = (email) => {
        if (!email || typeof email !== "string") return "";
        const [name, domain] = email.split("@");
        if (!name || !domain) return "";
        return `${name}.${domain}`;
    }

    const onSubmit = async (e) => {
        const newErrors =  handleSubmit(e);
        if (Object.values(newErrors).every(error => error === SPECIAL.STRING.EMPTY)) {
            sessionStorage.removeItem("register-form");

            const formData = Object.fromEntries(new FormData(e.target));

            try {
                const registerResult = await register(formData);
                const userId = registerResult?.id;

                if (userId) {
                    await createSpace({
                        name: "MySpace",
                        domain: getDomain(formData.email),
                    });

                    await login(formData);
                }

                navigate("/schedule");
                e.target.reset();
            } catch (error) {
                console.log(error.details);
                console.log(getValidationErrorsMap(error));
                // const message = getFriendlyErrorMessage(error)
                // const key = getFieldKey(error)
                // const inputRef = getRef(key);
                // await addError(key, message, inputRef);
                // focusFirstErrorField(errors, inputRef);
            }
        } else {
            focusFirstErrorField(newErrors);
        }
    }

    const getRef = (key) => {
        if (key) {
            const index = LOGIN_FIELDS.findIndex(fieldKey =>
                fieldKey.key === key
            );

            if (index !== -1 && inputRefs.current[index]) {
                return inputRefs.current[index]
            }
        }
    }

    const focusFirstErrorField = (newErrors, inputRef=null) => {
        if (!inputRef) {
            const firstErrorKey = Object.keys(newErrors).find(key => newErrors[key]);
            inputRef = getRef(firstErrorKey);
        }

        inputRef?.focus();
    }

    return (
        <form
            name="register-form"
            method="POST"
            noValidate
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-[50px] w-full text-left"
        >
            {REGISTER_FIELDS.map((field, index) => {
                const autoComplete = field.name === "password" ? "new-password" : field.autoComplete;
                return (
                    <AuthInputBox
                        key={index}
                        id={field.key}
                        className="w-full"
                        placeholder={field.placeholder}
                        type={field.type}
                        autoComplete={autoComplete}
                        name={field.name}
                        onBlur={(e) => inputOnBlur(e.target)}
                        errorText={errors[field.key]}
                        onKeyDown={(e) =>
                            handleEnterAsTab({ e, index, formFields: REGISTER_FIELDS, inputRefs, buttonRef })
                        }
                        isSaving={field.isSaving}
                        formName="register-form"
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                );
            })}

            <HoverButton type="submit" ref={buttonRef}>
                Зареєструватись
            </HoverButton>
        </form>
    );
}