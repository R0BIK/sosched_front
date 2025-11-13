import { API_ENDPOINTS } from '../../constants.js';
import {api} from "../api/apiClient.js";

export const getUserById = async (userId, domain) => {
    try {
        const response = await api.get(`${domain}${API_ENDPOINTS.USER}/${userId}`);
        return response.data; // данные пользователя
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};