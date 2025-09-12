import { useState, useEffect, useCallback } from 'react';
import { getSignFormData } from "../../data.js";
import { SignFormCheck } from '../Regex/regexPatterns.js'
import { useTranslation } from "react-i18next";

export function useSessionStorage(groupKey, valueKey, isSaving, initialValue="") {
    const [values, setValue] = useState(() => {
        const saved = sessionStorage.getItem(groupKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed[valueKey] || initialValue;
        }
        return initialValue;
    });

    useEffect(() => {
        const savedFormData = sessionStorage.getItem(groupKey);
        const newValues = savedFormData ? JSON.parse(savedFormData) : {};

        newValues[valueKey] = isSaving ? values : "";

        sessionStorage.setItem(groupKey, JSON.stringify(newValues));
    }, [groupKey, valueKey, values, isSaving]);

    const handleChange = (e) => {
        const { value } = e.target;
        setValue(value);
    }

    return { values, handleChange }
}

export function useValidateForm( props = {} ) {
    const {
        initialErrors = {},
        inputRefs,
        formFields
    } = props;

    const { t } = useTranslation();
    const SignFormData = getSignFormData(t);

    const [errors, setErrors] = useState(initialErrors);

    const validateField = useCallback((name, value) => {
        let error = "";
        let isError = false;

        Object.entries(SignFormData.Fields).forEach(([key, values]) => {
            if (name === values.name && value) {
                if (!SignFormCheck[key]?.test(value.trim())) {
                    error = SignFormData.Errors[key];
                    isError = true;
                }
            }
        })

        return { error, isError };
    }, [SignFormData.Errors, SignFormData.Fields])

    const activateError = useCallback((name, isError) => {
        formFields.forEach((fieldKey, index) => {
            if (SignFormData.Fields[fieldKey].name === name) {
                const input = inputRefs.current[index];

                if (isError) input.classList.add('error');
                else input.classList.remove('error');
            }
        });
    }, [SignFormData.Fields, formFields, inputRefs])

    const inputOnBlur = useCallback((name, value) => {
        const { error, isError } = validateField(name, value);

        activateError(name, isError);
        if (isError) setErrors(prev => ({ ...prev, [name]: error }));

    }, [validateField, activateError])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        document.activeElement.blur();
        let newErrors = {};

        formFields.forEach((fieldKey, index) => {
            const inputElement = inputRefs.current[index];
            if (inputElement) {
                if (!inputElement.value.trim()) {
                    newErrors[inputElement.name] = "Field is empty";
                    activateError(inputElement.name, true);
                } else {
                    const { error, isError} = validateField(inputElement.name, inputElement.value);
                    newErrors[inputElement.name] = error;
                    activateError(inputElement.name, isError);
                }
            }
        });

        setErrors(newErrors);

        return newErrors;
    }, [formFields, inputRefs, validateField, activateError])

    return { errors, inputOnBlur, handleSubmit };
}
