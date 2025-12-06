import { API_ENDPOINTS } from '../../constants/constants.js';
import {api} from "../../api/apiClient.ts";
import {generateFilterString} from "../../utils/generateFilterString.js";

export const getUserById = async (userId, domain) => {
    const response = await api.get(`${domain}${API_ENDPOINTS.USER}/${userId}`);

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};

export const getUsers = async (domain, paging, filterObj, search) => {
    const filterString = generateFilterString(filterObj);

    const response = await api.get(
        `${domain}${API_ENDPOINTS.USER}`,
        {
            params: {
                page: paging.page,
                pageSize: paging.pageSize,
                filter: filterString || undefined,
                search: search || undefined,
            }
        }
    );

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};

export const updateUser = async (data, domain) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.USER}`,
        data
    );

    if (!response.isSuccess) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};