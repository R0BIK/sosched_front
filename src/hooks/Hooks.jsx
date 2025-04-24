import { useState, useEffect } from 'react';
import { SignForm } from "../../data.js";
import { SignFormCheck } from '../Regex/regexPatterns.js'

export function useSessionStorage(groupKey, valueKey, initialValue) {
    const [values, setValue] = useState(() => {
        const saved = sessionStorage.getItem(groupKey);
        return saved ? JSON.parse(saved).valueKey : initialValue;
    });

    useEffect(() => {
        sessionStorage.setItem(groupKey, values);
    }, [groupKey, values]);

    const handleChange = (e) => {
        const { value } = e.target;
        setValue(prev => [...prev, valueKey, value]);
    }

    return { values, handleChange }
}

export function useSessionStForm(formKey, initialState = {}, exclude = []) {
    const [values, setValues] = useState(() => {
        const saved = sessionStorage.getItem(formKey);
        return saved ? JSON.parse(saved) : initialState;
    });

    useEffect(() => {
        const valuesToSave = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
                key,
                exclude.includes(key) ? "" : value
            ])
        );

        sessionStorage.setItem(formKey, JSON.stringify(valuesToSave));
    }, [formKey, values, exclude]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    }

    return { values, handleChange, setValues };
}

export function useValidateForm(initialErrors = {}) {
    const [errors, setErrors] = useState(initialErrors);

    const validateField = (name, value) => {
        let error = "";

        if (name === SignForm.Name.name && value) {
            if (!SignFormCheck.Name.test(value.trim())) error = "Name is required";
        }

        if (name === SignForm.LastName.name && value) {
            if (!SignFormCheck.LastName.test(value.trim())) error = "Last name is required";
        }

        if (name === SignForm.Email.name && value) {
            if (!SignFormCheck.Email.test(value.trim())) error = "Email is required";
        }

        if (name === SignForm.Password.name && value) {
            if (!SignFormCheck.Password.test(value.trim())) error = "Password is required";
        }

        if (name === SignForm.NewPassword.name && value) {
            if (!SignFormCheck.Password.test(value.trim())) error = "Password is required";
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    }

    const handleSubmit = (e, values) => {
        e.preventDefault();
        document.activeElement.blur();
        let isValid = true;

        isValid = Object.values(errors).every(error => error === '');

        Object.entries(values).forEach(([key, value]) => {
            validateField(key, value)
            if (!value.trim()) {
                isValid = false;
                setErrors(prev => ({ ...prev, [key]: "Field is empty" }));
            }
        })

        return isValid;
    }

    return { errors, validateField, handleSubmit }
}