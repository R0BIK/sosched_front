// Кастомные сообщения для кодов ошибок API
const FRIENDLY_ERROR_MESSAGES = {
    // Коды для авторизации/пользователей
    INVALID_LOGIN: "Користувача з таким Email не існує.",
    INVALID_PASSWORD: "Пароль не правильний.",

    PASSWORD_CONTAINS_INVALID_CHARACTERS: "Не правильний формат паролю.",

    USER_NOT_FOUND: "Користувача з таким Email не знайдено.",
    USER_ALREADY_EXISTS: "Користувач з таким Email вже існує.",

    // Общие или сетевые ошибки (если API их возвращает)
    NO_INTERNET: "Відсутнє з'єднання з мережею.",
    UNAUTHORIZED: "Ви не авторизовані. Будь ласка, увійдіть.",

    // Fallback для всех остальных
    DEFAULT: "Невідома помилка. Будь ласка, спробуйте пізніше.",
};

const API_ERROR_FIELD_MAP = {
    // Если учетные данные неверны, логично сфокусироваться на поле пароля
    INVALID_PASSWORD: 'PASSWORD',

    // Если пользователь не найден (хотя API может вернуть INVALID_CREDENTIALS)
    INVALID_EMAIL: 'EMAIL',

    // Если ошибка сетевая или не связана с конкретным полем
    DEFAULT: null,
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

    // 2. Если .code отсутствует, пытаемся извлечь его из строки error.message
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