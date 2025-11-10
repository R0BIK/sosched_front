import api from '../api/axios.js';
import { API_ENDPOINTS } from '../../constants.js';

export const getUserById = async (userId) => {
    try {
        const response = await api.get(`${API_ENDPOINTS.USER}/${userId}`);
        return response.data; // данные пользователя
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};