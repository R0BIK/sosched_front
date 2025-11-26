import { API_ENDPOINTS } from "../../constants/constants.js";
import { api } from "../../api/apiClient.ts";

/**
 * Проверяет статус аутентификации пользователя.
 * Возвращает объект пользователя или null.
 */
export const checkAuth = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.AUTH.CHECK_AUTH);
        // Если запрос успешен (HTTP 200) и вернул данные, возвращаем пользователя.
        // Если, например, api.get возвращает { isSuccess: false, status: 401 } при отсутствии сессии,
        // мы возвращаем null, чтобы useQuery корректно установил user: null.
        if (response.isSuccess) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Выполняет вход пользователя.
 */
export const login = async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
        // console.log(response.error);
        // throw Error(response.error);}
    }

    return response.data;
};

/**
 * Выполняет регистрацию пользователя.
 */
export const register = async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
        // throw Error("Failed to register: " + response.error);
    }

    return response.data;
};

/**
 * Выполняет выход пользователя.
 */
export const logout = async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);

    if (!response.isSuccess) {
        throw Error("Failed to log out: " + response.error);
    }

    return response.data;
};