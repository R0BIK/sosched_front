import { API_ENDPOINTS } from '../../constants/constants.js';
import {api} from "../../api/apiClient.ts";
import {generateFilterString} from "../filterStringGenerator/generateFilterString.js";

export const getUserById = async (userId, domain) => {
    const response = await api.get(`${domain}${API_ENDPOINTS.USER}/${userId}`);

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to get user by id:" + response.error);
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
        console.error(response.error);
        throw Error("Failed to get users: " + response.error);
    }

    return response.data;
};