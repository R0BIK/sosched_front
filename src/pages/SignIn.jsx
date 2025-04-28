import { Link, useNavigate } from "react-router-dom";
import { useValidateForm } from "../hooks/SignFormHooks.jsx";
import { useRef } from 'react';


import Header from '../components/Header/Header.jsx'
import InputBox from '../components/InputBox/InputBox.jsx'
import HoverButton from "../components/HoverButton/HoverButton.jsx";
import LogoButton from "../components/LogoButton/LogoButton.jsx";
import {GitHubLogo, GoogleLogo} from "../img/svg/Icons.jsx";

import { SignFormData, SignFormNames } from "../../data.js";

import './css/SignForm.css'
import {useKeyDownEnterHandler} from "../hooks/KeyDownHooks.jsx";


export default function SignIn() {
    const formFields = ['Email', 'Password'];

    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const buttonRef = useRef(null);
    const { errors, inputOnBlur, handleSubmit } = useValidateForm( { inputRefs, formFields } );
    const { handleEnterAsTab }  = useKeyDownEnterHandler();

    const onSubmit = (e) => {
        const newErrors = handleSubmit(e);
        if (Object.values(newErrors).every(error => error === '')) {
            sessionStorage.removeItem(SignFormNames.SignUp.name);
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
    <>
        <Header />
        <div className="content">
            <div className="panel">
                <h1>Sign In</h1>

                <form name={ SignFormNames.SignIn.name } method="POST" noValidate onSubmit={ onSubmit }>
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

                    <HoverButton type="submit" ref={ buttonRef }>{ SignFormNames.SignIn.text }</HoverButton>
                </form>

                <Link className={"forgotPassword"} to="/SignUp">Forgot password?</Link>

                <p className="alternative">Don&apos;t have an account?
                    {" "}<Link to="/SignUp">{ SignFormNames.SignUp.text }</Link>.
                </p>

                <div className="separator">
                    <span>or</span>
                </div>

                <LogoButton Logo={ <GoogleLogo /> }>Sign in with Google</LogoButton>
                <LogoButton Logo={ <GitHubLogo /> }>Sign in with GitHub</LogoButton>
            </div>
        </div>
    </>
    )
}
