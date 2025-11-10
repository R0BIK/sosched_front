import api from "./axios.js";
import {API_ENDPOINTS} from "../../constants.js";

export const login = async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
};

export const register = async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
};

export const checkAuth = async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.CHECK_AUTH);
    return response.data;
};