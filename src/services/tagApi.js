import { api } from "../api/apiClient.js";
import { API_ENDPOINTS } from "../../constants.js";

export const getTags = async (domain, params) => {
    const response = await api.get(`${domain}${API_ENDPOINTS.TAG}`, { params });

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to get tags: " + response.error);
    }

    return response.data;
};

export const createTag = async (data, domain) => {
    const response = await api.post(`${domain}${API_ENDPOINTS.TAG}`, data);

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to create tag: " + response.error);
    }

    return response.data;
};

export const deleteTag = async (id, domain) => {
    const response = await api.delete(`${domain}${API_ENDPOINTS.TAG}/${id}`);

    if (!response.isSuccess) {
        throw Error("Failed to delete tag: " + response.error);
    }

    return response.data;
};

export const updateTag = async (id, domain, tagData) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.TAG}/${id}`,
        tagData
    );

    if (!response.isSuccess) {
        throw Error("Failed to update tag: " + response.error);
    }

    return response.data;
}

export const updateUsers = async (tagId, data, domain) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.TAG}/${tagId}/users`,
        data
    );

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to update tag users: " + response.error);
    }

    return response.data;
};