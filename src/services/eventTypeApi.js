import { API_ENDPOINTS } from "../../constants.js";
import {api} from "../api/apiClient.js";

export const getEventTypes = async () => {
    const response = await api.get(API_ENDPOINTS.EVENT_TYPE);

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to get event types:" + response.error);
    }

    return response.data;
};