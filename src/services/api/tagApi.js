import { api } from "../../api/apiClient.ts";
import { API_ENDPOINTS } from "../../constants/constants.js";
import {generateFilterString} from "../filterStringGenerator/generateFilterString.js";

export const getTags = async (domain, params, filterObj) => {
    const filterString = generateFilterString(filterObj);

    const response = await api.get(`${domain}${API_ENDPOINTS.TAG}`,
        {
            params: {
                ...params,
                filter: filterString || undefined,
            }
        }
    );

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};

export const createTag = async (data, domain) => {
    const response = await api.post(`${domain}${API_ENDPOINTS.TAG}`, data);

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};

export const deleteTag = async (id, domain) => {
    const response = await api.delete(`${domain}${API_ENDPOINTS.TAG}/${id}`);

    if (!response.isSuccess) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};

export const updateTag = async (id, domain, tagData) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.TAG}/${id}`,
        tagData
    );

    if (!response.isSuccess) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
}

export const updateTagUsers = async (tagId, data, domain) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.TAG}/${tagId}/users`,
        data
    );

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};