import {api} from "../../api/apiClient.js";
import {API_ENDPOINTS} from "../../constants/constants.js";

export const getRoles = async (domain, params) => {
    const response = await api.get(`${domain}${API_ENDPOINTS.ROLE}`, { params });

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};

export const updateRoleUsers = async (roleId, data, domain) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.ROLE}/${roleId}/users`,
        data
    );

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};