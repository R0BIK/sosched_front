// Кастомные сообщения для кодов ошибок API
const FRIENDLY_ERROR_MESSAGES = {
    // Коды для авторизации/пользователей
    INVALID_LOGIN: "Користувача з таким Email не існує.",
    INVALID_PASSWORD: "Пароль не правильний.",

    PASSWORD_CONTAINS_INVALID_CHARACTERS: "Не правильний формат паролю.",

    EMAIL_ALREADY_EXISTS: "Користувач з таким Email вже існує.",
    INVALID_NAME: "Не правильний формат.",

    // Общие или сетевые ошибки (если API их возвращает)
    NO_INTERNET: "Відсутнє з'єднання з мережею.",
    UNAUTHORIZED: "Ви не авторизовані. Будь ласка, увійдіть.",

    // Fallback для всех остальных
    DEFAULT: "Невідома помилка. Будь ласка, спробуйте пізніше.",
};

const API_ERROR_FIELD_MAP = {
    INVALID_PASSWORD: 'PASSWORD',
    INVALID_EMAIL: 'EMAIL',
    DEFAULT: null,
};

const API_FIELD_KEYS = {
    FirstName: 'FIRST_NAME',
    LastName: 'LAST_NAME',
    Email: 'EMAIL',
    Password: 'PASSWORD',
}

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
 * Преобразует объект ошибки API в понятное для пользователя сообщение.
 * @param {object | Error} error - Объект ошибки (стандартный JS Error или структурированный объект).
 * @returns {string} Локализованное сообщение об ошибке.
 */
export const getFriendlyErrorMessage = (error) => {
    // 1. Попытка получить .code напрямую (для structured errors)
    let errorCode = error?.code;

    // 2. Если .code отсутствует, пытаемся извлечь его из строки error.message
    if (!errorCode && error?.message) {
        errorCode = extractErrorCode(error.message);
    }

    if (error?.code === 400 && error?.details?.errors) {
        const errorsList = error.details.errors;
        const firstFieldKey = Object.keys(errorsList)[0];

        if (firstFieldKey) {
            return FRIENDLY_ERROR_MESSAGES[errorsList[firstFieldKey][0]]
        }
        return FRIENDLY_ERROR_MESSAGES.DEFAULT;
    }

    // 3. Используем полученный код или DEFAULT
    const finalCode = errorCode || 'DEFAULT';

    return FRIENDLY_ERROR_MESSAGES[finalCode] || FRIENDLY_ERROR_MESSAGES.DEFAULT;
};

export const getFieldKey = (error) => {
    let errorCode = error?.code;

    if (!errorCode && error?.message) {
        errorCode = extractErrorCode(error.message);
    }

    if (error?.code === 400 && error?.details?.errors) {
        const errorsList = error.details.errors;
        const firstFieldKey = Object.keys(errorsList)[0];

        if (firstFieldKey) {
            return firstFieldKey.toUpperCase();
        }
    }

    // 3. Используем полученный код или DEFAULT
    const finalCode = errorCode || 'DEFAULT';

    return API_ERROR_FIELD_MAP[finalCode] || API_ERROR_FIELD_MAP.DEFAULT;
}

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
                const fieldName = API_FIELD_KEYS[fieldKey];

                // Проверяем, существует ли сообщение с кодом ошибки в нашем словаре.
                // NOTE: errors[field][0] может быть либо кодом ошибки, либо просто сообщением.
                const rawErrorMessage = messages[0];

                // Если сообщение соответствует ключу в FRIENDLY_ERROR_MESSAGES, используем его.
                errorsMap[fieldName] = FRIENDLY_ERROR_MESSAGES[rawErrorMessage] || rawErrorMessage;
            }
        });

        // Если Problem Details был, но ошибок полей не нашли (редкий случай),
        // возвращаем общую ошибку.
        if (Object.keys(errorsMap).length > 0) {
            return errorsMap;
        }
    }

    // --- 2. Обработка БИЗНЕС-ошибок (не 400) ---

    let errorCode = error?.code;
    if (!errorCode && error?.message) {
        errorCode = extractErrorCode(error.message);
    }
    const finalCode = errorCode || 'DEFAULT';

    // 2c. Для вывода под формой используем ключ 'api'
    errorsMap.api = FRIENDLY_ERROR_MESSAGES[finalCode] || FRIENDLY_ERROR_MESSAGES.DEFAULT;
    return errorsMap;
};