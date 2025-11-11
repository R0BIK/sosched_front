import api from "../api/axios.js";
import { API_ENDPOINTS } from "../../constants.js";

export const createSpace = async (data) => {
    try {
        const response = await api.post(API_ENDPOINTS.SPACE, data);
        return response.data; // данные созданного спейса
    } catch (error) {
        console.error("Error creating space:", error);
        throw error;
    }
};