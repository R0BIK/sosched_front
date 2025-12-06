import {useCallback, useState} from "react";
import {SPECIAL} from "../constants/constants.js";

const REGEX_PATTERNS = {
    // Название/Заголовок: Буквы, цифры, пробелы и пунктуация: -.,_&()
    name: /^[\p{L}\p{N}\s\-.,_&()]+$/u,

    shortName: /^[\p{L}\p{N}\s\-.,_&()]+$/u,

    location: /^[\p{L}\p{N}\s.,!?'-]*$/u,

    // Имя/Фамилия: Только буквы, апострофы, дефисы и пробелы.
    firstName: /^\p{L}+(?:[\s'-]\p{L}+)*$/u,

    // Адрес: Буквы, цифры, пробелы, '.,#/-()
    Address: /^[\p{L}\p{N}\s'.,#/()\-\s]+$/u,

    // Телефон E.164: +[1-9] и 6-14 цифр
    PhoneE164: /^\+[1-9]\d{6,14}$/,

    // Домен: Поддомены, дефисы, и окончание на 2+ буквы
    domain: /^(?:[\p{L}0-9-]{1,63}\.)+[A-Za-z]{2,}$/u,

    // Описание: Буквы, цифры, пробелы, .,!?'
    description: /^[\p{L}\p{N}\s.,!?'-]*$/u,

    DEFAULT: /^[\p{L}\p{N}\s.,!?'-]*$/u,
};

const ERRORS = {
    // Общая ошибка для пустых полей (если используется в валидаторе)
    EMPTY: "Поле не може бути пустим.",

    // Title: /^[\p{L}\p{N}\s\-.,_&()]+$/u
    name: "Дозволені лише літери, цифри та символи: -.,_&().",

    shortName: "Дозволені лише літери, цифри та символи: -.,_&().",

    // Name: /^\p{L}+(?:[\s'-]\p{L}+)*$/u
    firstName: "Некоректний формат імені. Використовуйте лише літери, пробіл, апостроф або дефіс.",

    // Address: /^[\p{L}\p{N}\s'.,#/()\-\s]+$/u
    Address: "Адреса містить недозволені символи.",

    // Email: /^(?!\.)[A-Za-z0-9._%+-]+(?<!\.)@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/
    Email: "Введіть коректний Email-адресу (наприклад, user@example.com).",

    // Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    Password: "Пароль повинен бути від 8 символів і містити великі літери, малі літери та цифри.",

    // PhoneE164: /^\+[1-9]\d{6,14}$/
    PhoneE164: "Введіть номер у форматі E.164 (+380...), без пробілів.",

    // Domain: /^(?:[\p{L}0-9-]{1,63}\.)+[A-Za-z]{2,}$/u
    domain: "Введіть коректний домен (наприклад, test.com або sub.test.com).",

    // Description: /^[\p{L}\p{N}\s.,!?'-]*$/u
    description: "Опис містить недозволені символи."
};

const initializeErrors = (formConfig) => {
    const defaultErrors = {};

    if (!formConfig) { return defaultErrors }

    Object.keys(formConfig).forEach(key => {
        defaultErrors[key] = SPECIAL.STRING.EMPTY;
    });

    return { ...defaultErrors };
};

export const useValidate = (formConfig) => {
    const [errors, setErrors] = useState(initializeErrors(formConfig));

    const validateField = useCallback((key, value, required) => {
        let error = SPECIAL.STRING.EMPTY;
        let valueTrim = (typeof value === 'string')
            ? value.trim()
            : (value ?? SPECIAL.STRING.EMPTY);
        const regexPattern = REGEX_PATTERNS[key] || REGEX_PATTERNS.DEFAULT;

        if (!valueTrim && required)
            error = ERRORS.EMPTY;

        else if (valueTrim && !regexPattern.test(valueTrim))
            error = ERRORS[key] || SPECIAL.STRING.EMPTY;

        setErrors((prev) => ({ ...prev, [key]: error }));

        return error;

    }, [])

    const addExternalError = useCallback((key, error) => {
        setErrors(prev => ({ ...prev, [key]: error }));
    }, [])

    const clearError = useCallback((key) => {
        setErrors(prev => ({ ...prev, [key]: "" }));
    }, [])

    const resetErrors = useCallback(() => {
        setErrors(initializeErrors(formConfig));
    }, [formConfig])

    // const isValidForm = useCallback(() => {
    //     return (Object.values(errors).every(error => error === SPECIAL.STRING.EMPTY))
    // }, [errors])

    const validateForm = useCallback((formData) => {
        let isValid = true;

        for (const [key, value] of Object.entries(formData)) {


            if (!formConfig || formConfig[key] === undefined || formConfig[key] === null) {
                continue;
            }

            const error = validateField(key, value, formConfig[key]);
            if (error.trim() !== "") isValid = false;
        }

        return isValid;

    }, [validateField, formConfig]);

    return { errors, validateField, validateForm, addExternalError, clearError, resetErrors };
}

// const additionalTest = (key) => {
//
// }