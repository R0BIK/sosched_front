import {useCallback, useState} from "react";

const REGEX_PATTERNS = {
    // Название/Заголовок: Буквы, цифры, пробелы и пунктуация: -.,_&()
    Title: /^[\p{L}\p{N}\s\-.,_&()]+$/u, // \p{L}, \p{N} требуют флага 'u' в JS

    // Имя/Фамилия: Только буквы, апострофы, дефисы и пробелы.
    Name: /^\p{L}+(?:[\s'-]\p{L}+)*$/u,

    // Адрес: Буквы, цифры, пробелы, '.,#/-()
    Address: /^[\p{L}\p{N}\s'.,#/()\-\s]+$/u,

    // Телефон E.164: +[1-9] и 6-14 цифр
    PhoneE164: /^\+[1-9]\d{6,14}$/,

    // Домен: Поддомены, дефисы, и окончание на 2+ буквы
    Domain: /^(?:[\p{L}0-9-]{1,63}\.)+[A-Za-z]{2,}$/u,

    // Описание: Буквы, цифры, пробелы, .,!?'
    Description: /^[\p{L}\p{N}\s.,!?'-]*$/u,
};

const ERRORS = {
    // Общая ошибка для пустых полей (если используется в валидаторе)
    EMPTY: "Поле не може бути пустим.",

    // --- Ошибки, соответствующие REGEX_PATTERNS ---

    // Title: /^[\p{L}\p{N}\s\-.,_&()]+$/u
    Title: "Дозволені лише літери, цифри та символи: -.,_&().",

    // Name: /^\p{L}+(?:[\s'-]\p{L}+)*$/u
    Name: "Некоректний формат імені. Використовуйте лише літери, пробіл, апостроф або дефіс.",

    // Address: /^[\p{L}\p{N}\s'.,#/()\-\s]+$/u
    Address: "Адреса містить недозволені символи.",

    // Email: /^(?!\.)[A-Za-z0-9._%+-]+(?<!\.)@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/
    Email: "Введіть коректний Email-адресу (наприклад, user@example.com).",

    // Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    Password: "Пароль повинен бути від 8 символів і містити великі літери, малі літери та цифри.",

    // PhoneE164: /^\+[1-9]\d{6,14}$/
    PhoneE164: "Введіть номер у форматі E.164 (+380...), без пробілів.",

    // Domain: /^(?:[\p{L}0-9-]{1,63}\.)+[A-Za-z]{2,}$/u
    Domain: "Введіть коректний домен (наприклад, test.com або sub.test.com).",

    // Description: /^[\p{L}\p{N}\s.,!?'-]*$/u
    Description: "Опис містить недозволені символи."
};

export const useValidate = ({initialErrors = {}, formConfig}) => {
    const [errors, setErrors] = useState(initialErrors);

    const validateField = useCallback((id, value, required) => {
        let error = "";
        let valueTrim = value ? value.trim() : '';

        if (!valueTrim && required) {
            error[id] = ERRORS.EMPTY;
        }

        if (valueTrim && !REGEX_PATTERNS[id]?.test(valueTrim)) {
            error = ERRORS[id];
        }

        setErrors((prev) => ({ ...prev, [id]: error }));

    }, [])

    const addExternalError = useCallback((key, error) => {
        setErrors(prev => ({ ...prev, [key]: error }));
    }, [])

    const clearError = useCallback((key) => {
        setErrors(prev => ({ ...prev, [key]: "" }));
    }, [])

    const validateForm = useCallback((formData) => {
        for (const {key, value} of formData) {
            if (formConfig[key]) {
                validateField(key, value, formConfig[key]);
            }
        }

    }, [validateField, formConfig]);

    return { errors, validateField, validateForm, addExternalError, clearError };
}