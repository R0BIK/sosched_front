import { API_ENDPOINTS } from "../../constants.js";
import {api} from "../api/apiClient.js";

export const getEvents = async (data, domain) => {
    const response = await api.get(`${domain}${API_ENDPOINTS.EVENT}`, {
        params: {
            DateFrom: data.dateFrom,
            DateTo: data.dateTo,
        }
    });

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to get events:" + response.error);
    }

    return response.data;
};

export const createEvent = async (data, domain) => {
    const response = await api.post(`${domain}${API_ENDPOINTS.EVENT}`, data);

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to create event:" + response.error);
    }

    return response.data;
};

