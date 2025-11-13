import { API_ENDPOINTS } from "../../constants.js";
import {api} from "../api/apiClient.js";

export const getEventTypes = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.EVENT_TYPE);
        return response.data;
    } catch (error) {
        console.error("Error fetching event types:", error);
        throw error;
    }
};