import { useNavigate } from "react-router-dom";
import { useValidateForm } from "../../hooks/SignFormHooks.jsx";
import { useKeyDownEnterHandler } from "../../hooks/KeyDownHooks.jsx";
import { useRef } from 'react';
import { useTranslation } from "react-i18next";

import InputBox from './InputBox.jsx';
import HoverButton from "./HoverButton.jsx";

import { getSignFormData } from "../../../data.js";
import PropTypes from "prop-types";

export default function AuthForm(props = {}) {
    const { type, formFields } = props;
    const { t } = useTranslation();
    const SignFormData = getSignFormData(t);

    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const buttonRef = useRef(null);
    const { errors, inputOnBlur, handleSubmit } = useValidateForm({ inputRefs, formFields });
    const { handleEnterAsTab } = useKeyDownEnterHandler();

    const onSubmit = (e) => {
        const newErrors = handleSubmit(e);
        if (Object.values(newErrors).every(error => error === '')) {
            sessionStorage.removeItem(SignFormData.Main[type].name);
            e.target.reset();
            navigate('/Default');
        } else {
            const firstErrorKey = Object.keys(newErrors).find(key => newErrors[key]);
            if (firstErrorKey) {
                const index = formFields.findIndex(field => SignFormData.Fields[field].name === firstErrorKey);
                if (index !== -1 && inputRefs.current[index]) {
                    inputRefs.current[index].focus();
                }
            }
        }
    }

    return (
        <form
            name={SignFormData.Main[type].name}
            method="POST"
            noValidate
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-[50px] w-full text-left"
        >
            {formFields.map((fieldKey, index) => {
                const form = SignFormData.Fields[fieldKey];
                return (
                    <InputBox
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
                        formName={SignFormData.Main[type].name}
                    />
                );
            })}

            <HoverButton type="submit" ref={buttonRef}>
                {SignFormData.Main[type].button}
            </HoverButton>
        </form>
    );
}

AuthForm.propTypes = {
    formFields: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};