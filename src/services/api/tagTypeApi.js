import {api} from "../../api/apiClient.ts";
import {API_ENDPOINTS} from "../../constants/constants.js";

export const getTagTypes = async (domain, params) => {
    const response = await api.get(`${domain}${API_ENDPOINTS.TAG_TYPE}`,
        { params });

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to get event types:" + response.error);
    }

    return response.data;
};

export const createTagType = async (data, domain) => {
    const response = await api.post(`${domain}${API_ENDPOINTS.TAG_TYPE}`, data);

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to create tag type:" + response.error);
    }

    return response.data;
};

export const deleteTagType = async (id, domain) => {
    const response = await api.delete(`${domain}${API_ENDPOINTS.TAG_TYPE}/${id}`);

    if (!response.isSuccess) {
        throw Error("Failed to delete tag type: " + response.error);
    }

    return response.data
};