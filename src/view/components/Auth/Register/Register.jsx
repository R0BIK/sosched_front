import { useNavigate } from "react-router-dom";
import { useValidateForm } from "../../../../hooks/authHooks.js";
import { useKeyDownEnterHandler } from "../../../../hooks/KeyDownHooks.js";
import { useRef } from 'react';

import AuthInputBox from '../AuthInputBox.jsx';
import HoverButton from "../HoverButton.jsx";

import {REGISTER_FIELDS} from "../../../../constants/authConstants.js";
import {useAuth} from "../../../../context/AuthContext.jsx";
import {SPECIAL} from "../../../../constants/constants.js";
import { getValidationErrorsMap } from "../../../../utils/errorMapping.js";
import {useSpace} from "../../../../context/SpaceContext.jsx";
import {login} from "../../../../services/api/authApi.js";

export default function RegisterForm() {
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const buttonRef = useRef(null);
    const { errors, inputOnBlur, handleSubmit, addError } = useValidateForm({inputRefs});
    const { handleEnterAsTab } = useKeyDownEnterHandler();

    const { register, user } = useAuth();
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
                        name: "Мій простір",
                        domain: getDomain(formData.email),
                        isPublic: false,
                    });
                }

                console.log(user);

                navigate("/schedule");
                e.target.reset();
            } catch (error) {
                const errors = getValidationErrorsMap(error);
                for (const [key, value] of Object.entries(errors)) {
                    const inputRef = getRef(key);
                    await addError(key, value, inputRef);
                }
                focusFirstErrorField(errors);
            }
        } else {
            focusFirstErrorField(newErrors);
        }
    }

    const getRef = (id) => {
        if (id) {
            const index = REGISTER_FIELDS.findIndex(fieldKey =>
                fieldKey.id === id
            );

            if (index !== -1 && inputRefs.current[index]) {
                return inputRefs.current[index]
            }
        }
    }

    const focusFirstErrorField = (newErrors, inputRef=null) => {
        if (!inputRef) {
            const firstErrorKey = Object.keys(newErrors).find(id => newErrors[id]);
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
            className="flex flex-col items-center justify-center gap-13 w-full text-left"
        >
            {REGISTER_FIELDS.map((field, index) => {
                const autoComplete = field.name === "password" ? "new-password" : field.autoComplete;
                return (
                    <AuthInputBox
                        key={index}
                        id={field.id}
                        className="w-full"
                        placeholder={field.placeholder}
                        type={field.type}
                        autoComplete={autoComplete}
                        name={field.name}
                        onBlur={(e) => inputOnBlur(e.target)}
                        errorText={errors[field.id]}
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