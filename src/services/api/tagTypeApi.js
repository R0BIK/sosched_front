import {api} from "../../api/apiClient.ts";
import {API_ENDPOINTS} from "../../constants/constants.js";

export const getTagTypes = async (domain, params) => {
    const response = await api.get(`${domain}${API_ENDPOINTS.TAG_TYPE}`,
        { params });

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};

export const createTagType = async (data, domain) => {
    const response = await api.post(`${domain}${API_ENDPOINTS.TAG_TYPE}`, data);

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};

export const deleteTagType = async (id, domain) => {
    const response = await api.delete(`${domain}${API_ENDPOINTS.TAG_TYPE}/${id}`);

    if (!response.isSuccess) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data
};

export const updateTagType = async (id, domain, data) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.TAG_TYPE}/${id}`,
        data
    );

    if (!response.isSuccess) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
}