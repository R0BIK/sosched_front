import { useState, useEffect, useCallback } from 'react';
import { ERRORS } from '../constants/authConstants.js';
import { AUTH_FORM_CHECK } from '../Regex/regexPatterns.js'

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
    const {initialErrors = {}, inputRefs } = props;
    const [errors, setErrors] = useState(initialErrors);

    const validateField = useCallback((id, value) => {
        let error = "";
        let isError = false;

        if (value && !AUTH_FORM_CHECK[id]?.test(value.trim())) {
            error = ERRORS[id]
            isError = true;
        }

        return { error, isError };
    }, [])

    const activateError = useCallback((e, isError) => {
        e.toggleAttribute("data-error", isError);
    }, [])

    const inputOnBlur = useCallback((target) => {
        const value = target.value;
        const id = target.id;
        const { error, isError } = validateField(id, value);

        activateError(target, isError);

        if (isError) setErrors(prev => ({ ...prev, [id]: error }));

    }, [validateField, activateError])

    const addError = useCallback((key, error, ref) => {
        setErrors(prev => ({ ...prev, [key]: error }));
        activateError(ref, true);
    }, [activateError])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        document.activeElement.blur();
        let newErrors = {};

        for (const inputElement of inputRefs.current) {
            if (!inputElement) continue;

            if (!inputElement.value.trim()) {
                newErrors[inputElement.id] = "Поле не може бути пустим.";
                activateError(inputElement, true);
            } else {
                const { error, isError} = validateField(inputElement.id, inputElement.value);
                console.log(error)
                newErrors[inputElement.id] = error;
                activateError(inputElement, isError);
            }
        }

        setErrors(newErrors);

        return newErrors;
    }, [inputRefs, validateField, activateError])

    return { errors, inputOnBlur, handleSubmit, addError };
}
