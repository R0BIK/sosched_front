import { Link, useNavigate } from "react-router-dom";
import { useValidateForm } from "../../hooks/SignFormHooks.jsx";
import { useKeyDownEnterHandler } from "../../hooks/KeyDownHooks.jsx";
import { useRef } from 'react';

import InputBox from '../../components/InputBox/InputBox.jsx'
import HoverButton from "../../components/HoverButton/HoverButton.jsx";
import LogoButton from "../../components/LogoButton/LogoButton.jsx";
import { GitHubLogo, GoogleLogo } from "../../img/svg/Icons.jsx";

import { SignFormData, SignFormNames } from "../../../data.js";

import './css/SignForm.css'
import PropTypes from "prop-types";

export default function SignForm(props = {}) {
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
                const index = formFields.findIndex(field => SignFormData[field].name === firstErrorKey);
                if (index !== -1 && inputRefs.current[index]) {
                    inputRefs.current[index].focus();
                }
            }
        }
    }

    return (
        <div className="panel">
            <h1>Sign Up</h1>

            <form name={ SignFormNames.SignUp.name } method="POST" noValidate onSubmit={ onSubmit }>
                {formFields.map((fieldKey, index) => {
                    const form = SignFormData[fieldKey];
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
                                  formName={ SignFormNames.SignUp.name }
                        />
                    );
                })}

                <HoverButton type="submit" ref={ buttonRef } style={{marginTop: '60px'}}>{ SignFormNames.SignUp.text }</HoverButton>
            </form>

            <p className="alternative">Already have an account?
                {" "}<Link to="/SignIn">{ SignFormNames.SignIn.text }</Link>.
            </p>

            <div className="separator">
                <span>or</span>
            </div>

            <LogoButton Logo={ <GoogleLogo /> }>Sign up with Google</LogoButton>
            <LogoButton Logo={ <GitHubLogo /> }>Sign up with GitHub</LogoButton>
        </div>
    )
}

SignForm.propTypes = {
    formFields: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};
