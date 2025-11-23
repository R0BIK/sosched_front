// Кастомные сообщения для кодов ошибок API
const FRIENDLY_ERROR_MESSAGES = {
    // Коды для авторизации/пользователей
    INVALID_LOGIN: {
        MESSAGE: "Користувача з таким Email не існує.",
        FIELD_KEY: "Email"
    },
    EMAIL_ALREADY_EXISTS: {
        MESSAGE: "Користувач з таким Email вже існує.",
        FIELD_KEY: "Email"
    },
    INVALID_PASSWORD:
    {
        MESSAGE: "Пароль не правильний.",
        FIELD_KEY: "Password"
    },
    PASSWORD_CONTAINS_INVALID_CHARACTERS: {
        MESSAGE: "Не правильний формат паролю.",
        FIELD_KEY: "Password"
    },
    INVALID_NAME: {
        MESSAGE: "Не правильний формат.",
    },

    NO_INTERNET: {
        MESSAGE: "Відсутнє з'єднання з мережею."
    },
    UNAUTHORIZED: "Ви не авторизовані. Будь ласка, увійдіть.",

    DEFAULT: {
        MESSAGE: "Невідома помилка. Будь ласка, спробуйте пізніше."
    },
};

/**
 * Извлекает код ошибки (например, INVALID_CREDENTIALS) из строки сообщения.
 * @param {string} message - Полное сообщение ошибки (error.message).
 * @returns {string | null} Извлеченный код или null.
 */
const extractErrorCode = (message) => {
    if (!message || typeof message !== 'string') {
        return null;
    }
    // Регулярное выражение для поиска (Code: XXXXX)
    const match = message.match(/\(Code: ([A-Z_]+)\)/);
    return match ? match[1] : null;
};

/**
 * Обрабатывает объект ошибки от API, возвращая словарь ошибок.
 * Если это HTTP 400 Problem Details, возвращает { fieldName: message }.
 * Если это бизнес-ошибка, возвращает { api: message } для вывода под формой.
 * * @param {object} error - Структурированный объект ошибки { code, details, message }.
 * @returns {{ [key: string]: string }} Словарь ошибок, где ключ — имя поля.
 */
export const getValidationErrorsMap = (error) => {
    const errorsMap = {};

    const statusCode = error?.code;
    const details = error?.details;

    // --- 1. Обработка ошибок валидации (HTTP 400 Problem Details) ---
    if (statusCode === 400 && details?.errors) {

        // Перебираем ошибки, привязанные к полям
        Object.entries(details.errors).forEach(([fieldKey, messages]) => {
            if (messages && messages.length > 0) {
                // const fieldName = API_FIELD_KEYS[fieldKey];

                // Проверяем, существует ли сообщение с кодом ошибки в нашем словаре.
                // NOTE: errors[field][0] может быть либо кодом ошибки, либо просто сообщением.
                const rawErrorMessage = messages[0];

                // Если сообщение соответствует ключу в FRIENDLY_ERROR_MESSAGES, используем его.
                errorsMap[fieldKey] = FRIENDLY_ERROR_MESSAGES[rawErrorMessage] || rawErrorMessage;
            }
        });

        // Если Problem Details был, но ошибок полей не нашли (редкий случай),
        // возвращаем общую ошибку.
        if (Object.keys(errorsMap).length > 0) {
            return errorsMap;
        }
    }

    let errorCode = error?.code;
    if (!errorCode && error?.message) {
        errorCode = extractErrorCode(error.message);
    }
    const finalCode = errorCode || 'DEFAULT';

    errorsMap[FRIENDLY_ERROR_MESSAGES[finalCode].FIELD_KEY] = FRIENDLY_ERROR_MESSAGES[finalCode].MESSAGE || FRIENDLY_ERROR_MESSAGES.DEFAULT.MESSAGE;
    return errorsMap;
};