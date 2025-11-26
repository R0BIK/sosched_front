import { API_ENDPOINTS } from "../../constants/constants.js";
import { api } from "../../api/apiClient.js";

/**
 * Получает список пространств (с пагинацией).
 * @param {number} page - Номер страницы.
 * @param {number} pageSize - Размер страницы.
 */
export const getSpaces = async ({ page = 1, pageSize = 5 }) => {
    const response = await api.get(API_ENDPOINTS.SPACE, {
        params: {
            page: page,
            pageSize: pageSize,
        }
    });

    if (!response.isSuccess || !response.data) {
        // Используем вашу структуру ошибки
        throw {
            message: response.error?.message || "Failed to fetch spaces",
            code: response.error?.code,
            details: response.error?.details
        };
    }

    return response.data;
};

/**
 * Создает новое пространство.
 * @param {object} data - Данные пространства (name, domain и т.д.).
 */
export const createSpace = async (data) => {
    const response = await api.post(API_ENDPOINTS.SPACE, data);

    if (!response.isSuccess || !response.data) {
        throw {
            message: response.error?.message || "Failed to create space",
            code: response.error?.code,
            details: response.error?.details
        };
    }

    return response.data;
};

export const joinSpace = async (data) => {
    const response = await api.post(API_ENDPOINTS.SPACE + "/join", data);

    if (!response.isSuccess || !response.data) {
        throw {
            message: response.error?.message || "Failed to join space",
            code: response.error?.code,
            details: response.error?.details
        };
    }

    return response.data;
}

export const updateSpace = async (id, data) => {
    console.log(id, data);
    const response = await api.patch(`${API_ENDPOINTS.SPACE}/${id}`, data);

    if (!response.isSuccess || !response.data) {
        throw {
            message: response.error?.message || "Failed to edit space",
            code: response.error?.code,
            details: response.error?.details
        };
    }

    return response.data;
}