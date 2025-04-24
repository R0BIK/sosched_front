import {Link, useNavigate} from "react-router-dom";
import { useSessionStForm, useValidateForm } from "../hooks/Hooks.jsx";

import Header from '../components/Header/Header.jsx'
import InputBox from '../components/InputBox/InputBox.jsx'
import HoverButton from "../components/HoverButton/HoverButton.jsx";
import LogoButton from "../components/LogoButton/LogoButton.jsx";

import GoogleLogo from "../img/Google_logo.svg";
import GitHubLogo from "../img/GitHub_logo.svg";

import { SignForm } from "../../data.js";

import './css/SignForm.css'
import {useRef} from "react";


export default function SignIn() {
    const navigate = useNavigate();
    const formFields = ['Email', 'Password'];

    const { errors, validateField, handleSubmit } = useValidateForm();

    const inputRefs = useRef([]);
    const buttonRef = useRef(null);

    const { values, handleChange } = useSessionStForm(
        'signInForm',
        { email: '', password: '' },
        [SignForm.Password.name]
    );

    const onSubmit = (e) => {
        const isValid = handleSubmit(e, values);
        console.log(isValid)

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

    return (
    <>
        <Header />
        <div className="content">
            <div className="panel">
                <h1>Sign In</h1>

                <form name="sign-in-form" method="POST" noValidate onSubmit={ onSubmit }>
                    {formFields.map((fieldKey, index) => {
                        const form = SignForm[fieldKey];
                        return (
                            <InputBox key={form.placeholder}
                                      placeholder={form.placeholder}
                                      type={form.type}
                                      autoComplete={form.autoComplete}
                                      name={form.name}
                                      onChange={handleChange}
                                      value={values[form.name] || ''}
                                      onBlur={(e) => validateField(e.target.name, e.target.value) }
                                      errorText={errors[form.name]}
                                      onKeyDown={(e) => handleKeyDown(e, index)}
                                      ref={(el) => (inputRefs.current[index] = el)}
                            />
                        );
                    })}

                    <HoverButton type="submit" ref={ buttonRef }>Sign In</HoverButton>
                </form>

                <p className="alternative">Don&apos;t have an account?
                    {" "}<Link to="/SignUp">Sign Up</Link>.
                </p>

                <div className="separator">
                    <span>or</span>
                </div>

                <LogoButton logo={ GoogleLogo }>Sign in with Google</LogoButton>
                <LogoButton logo={ GitHubLogo }>Sign in with GitHub</LogoButton>
            </div>
        </div>
    </>
    )
}
