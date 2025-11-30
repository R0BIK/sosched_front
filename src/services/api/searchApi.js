import {api} from "../../api/apiClient.ts";
import {API_ENDPOINTS} from "../../constants/constants.js";

export const getUsersAndTags = async (domain, limit, search) => {
    const response = await api.get(
        `${domain}${API_ENDPOINTS.SEARCH}`,
        {
            params: {
                limit: limit || 10,
                search: search || undefined,
            }
        }
    );

    if (!response.isSuccess || !response.data) {
        throw {message: response.error.message, code: response.error.code, details: response.error.details}
    }

    return response.data;
};