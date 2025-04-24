import { Link, useNavigate } from "react-router-dom";
import { useSessionStForm, useValidateForm } from "../hooks/Hooks.jsx";
import { useRef } from 'react';


import Header from '../components/Header/Header.jsx'
import InputBox from '../components/InputBox/InputBox.jsx'
import HoverButton from "../components/HoverButton/HoverButton.jsx";
import LogoButton from "../components/LogoButton/LogoButton.jsx";

import GoogleLogo from "../img/Google_logo.svg";
import GitHubLogo from "../img/GitHub_logo.svg";

import { SignForm } from "../../data.js";

import './css/SignForm.css'


export default function SignUp() {
    const navigate = useNavigate();
    const formFields = ['Name', 'LastName', 'Email', 'NewPassword'];

    const { errors, validateField, handleSubmit } = useValidateForm();

    const inputRefs = useRef([]);
    const buttonRef = useRef(null);

    const { values, handleChange } = useSessionStForm(
        'signUpForm',
        { name: '', lastName: '', email: '', newPassword: '' },
        [SignForm.NewPassword.name]
    );

    const onSubmit = (e) => {
        const isValid = handleSubmit(e, values);

        if (isValid) {
            navigate('/Default')
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (index < formFields.length - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                document.activeElement.blur();
                buttonRef.current?.classList.add('isActive');
                setTimeout(() => {
                    buttonRef.current?.classList.remove('isActive');
                    buttonRef.current?.click();
                }, 250);
            }
        }
    };

    const onClick = (e, index) => {
        e.preventDefault();

        inputRefs.current[index].value = '';
    }

    return (
    <>
        <Header />
        <div className="content">
            <div className="panel">
                <h1>Sign Up</h1>

                <form name="sign-up-form" method="POST" noValidate onSubmit={ onSubmit }>
                    {formFields.map((fieldKey, index) => {
                        const form = SignForm[fieldKey];
                        return (
                            <InputBox key={form.placeholder}
                                      placeholder={form.placeholder}
                                      type={form.type}
                                      autoComplete={form.autoComplete}
                                      name={form.name}
                                      onChange={ handleChange }
                                      value={values[form.name] || ''}
                                      onBlur={(e) => validateField(e.target.name, e.target.value) }
                                      errorText={errors[form.name]}
                                      onKeyDown={(e) => handleKeyDown(e, index)}
                                      onClick={ (e) => onClick(e, index) }
                                      ref={(el) => (inputRefs.current[index] = el)}
                            />
                        );
                    })}

                    <HoverButton type="submit" ref={ buttonRef }>Sign Up</HoverButton>
                </form>

                <p className="alternative">Already have an account?
                    {" "}<Link to="/SignIn">Sign In</Link>.
                </p>

                <div className="separator">
                    <span>or</span>
                </div>

                <LogoButton logo={ GoogleLogo }>Sign up with Google</LogoButton>
                <LogoButton logo={ GitHubLogo }>Sign up with GitHub</LogoButton>
            </div>
        </div>
    </>
  )
}
