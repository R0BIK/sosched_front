import { API_ENDPOINTS } from "../../constants.js";
import {api} from "../api/apiClient.js";

export const getEvents = async (data, domain) => {
    try {
        const response = await api.get(`${domain}${API_ENDPOINTS.EVENT}`, {
            params: {
                DateFrom: data.dateFrom,
                DateTo: data.dateTo,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching spaces:", error);
        throw error;
    }
};

export const createEvent = async (data, domain) => {
    try {
        const response = await api.post(`${domain}${API_ENDPOINTS.EVENT}`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

