import { Link, useNavigate } from "react-router-dom";
import { useValidateForm } from "../../../hooks/SignFormHooks.jsx";
import { useKeyDownEnterHandler } from "../../../hooks/KeyDownHooks.jsx";
import { useRef } from 'react';

import InputBox from '../../InputBox/InputBox.jsx'
import HoverButton from "../../HoverButton/HoverButton.jsx";
import LogoButton from "../../LogoButton/LogoButton.jsx";
import { GitHubLogo, GoogleLogo } from "../../../img/svg/Icons.jsx";

import { SignFormData } from "../../../../data.js";
import PropTypes from "prop-types";

import './SignFormPanel.css'

export default function SignFormPanel(props = {}) {
    const {
        type,
        formFields,
    } = props;

    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const buttonRef = useRef(null);
    const { errors, inputOnBlur, handleSubmit } = useValidateForm( { inputRefs, formFields } );
    const { handleEnterAsTab }  = useKeyDownEnterHandler();

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
        <div className="panel">
            <h1>{ SignFormData.Main[type].text }</h1>

            <form name={ SignFormData.Main[type].name } method="POST" noValidate onSubmit={ onSubmit }>
                {formFields.map((fieldKey, index) => {
                    const form = SignFormData.Fields[fieldKey];
                    return (
                        <InputBox key={form.placeholder}
                                  className="InputBox"
                                  placeholder={form.placeholder}
                                  type={form.type}
                                  autoComplete={form.autoComplete}
                                  name={form.name}
                                  onBlur={(e) => inputOnBlur(e.target.name, e.target.value) }
                                  errorText={errors[form.name]}
                                  onKeyDown={(e) => handleEnterAsTab({e, index, inputRefs, formFields, buttonRef})}
                                  ref={(el) => (inputRefs.current[index] = el)}
                                  isSaving={ form.isSaving }
                                  formName={ SignFormData.Main[type].name }
                        />
                    );
                })}

                <HoverButton type="submit" ref={ buttonRef } style={{marginTop: '60px'}}>{ SignFormData.Main[type].text }</HoverButton>
            </form>

            <p className="alternative">Already have an account?
                {" "}<Link to={ SignFormData.Main[type].alternativeLink }>{ SignFormData.Main[type].alternative }</Link>.
            </p>

            <div className="separator">
                <span>or</span>
            </div>

            <LogoButton Logo={ <GoogleLogo /> }>{SignFormData.Main[type].text} with Google</LogoButton>
            <LogoButton Logo={ <GitHubLogo /> }>{SignFormData.Main[type].text} with GitHub</LogoButton>
        </div>
    )
}

SignFormPanel.propTypes = {
    formFields: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};
