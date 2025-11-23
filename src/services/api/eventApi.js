import { API_ENDPOINTS } from "../../constants/constants.js";
import {api} from "../../api/apiClient.ts";

export const getEvents = async (data, domain, isPaged, pagination) => {

    const params = {
        DateFrom: data?.dateFrom,
        DateTo: data?.dateTo,

        IsPaged: isPaged,

        ...(isPaged && {
            Page: pagination?.page,
            PageSize: pagination?.pageSize,
        })
    };

    const response = await api.get(`${domain}${API_ENDPOINTS.EVENT}`, {
        params: params
    });

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to get events:" + response.error);
    }

    return response.data;
};

export const createEvent = async (data, domain) => {
    const response = await api.post(`${domain}${API_ENDPOINTS.EVENT}`, data);

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to create event:" + response.error);
    }

    return response.data;
};

export const deleteEvent = async (id, domain) => {
    const response = await api.delete(`${domain}${API_ENDPOINTS.EVENT}/${id}`);

    if (!response.isSuccess) {
        throw Error("Failed to delete event: " + response.error);
    }

    return response.data;
};

export const updateEvent = async (id, domain, eventData) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.EVENT}/${id}`,
        eventData
    );

    if (!response.isSuccess) {
        throw Error("Failed to update event: " + response.error);
    }

    return response.data;
}

export const updateEventUsers = async (eventId, data, domain) => {
    const response = await api.patch(
        `${domain}${API_ENDPOINTS.EVENT}/${eventId}/users`,
        data
    );

    if (!response.isSuccess || !response.data) {
        throw Error("Failed to update event users: " + response.error);
    }

    return response.data;
};

