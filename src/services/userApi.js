import { API_ENDPOINTS } from '../../constants.js';
import {api} from "../api/apiClient.js";

export const getUserById = async (userId, domain) => {
    const response = await api.get(`${domain}${API_ENDPOINTS.USER}/${userId}`);

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to get user by id:" + response.error);
    }

    return response.data;
};

// export const getUsers = async (filter, domain) => {
//     try {
//         const response = await api.get(`${domain}${API_ENDPOINTS.USER}`, {
//             params: {
//                 DateFrom: data.dateFrom,
//                 DateTo: data.dateTo,
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching spaces:", error);
//         throw error;
//     }
// }