import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import {failure, isResultPattern, ResultError, ResultPattern, success} from "./resultPattern";
import {API_BASE_URL} from "../constants/constants.js";


// --- Error messages ---
const errorMessages: Record<number | string, string> = {
    401: "Unauthorized.",
    403: "Forbidden.",
    404: "Not found.",
    422: "Validation failed.",
    500: "Internal server error.",
    network: "No internet connection.",
    timeout: "Request timed out.",
    default: "Unexpected error occurred.",
};

// --- Typed API Interface ---
export interface TypedApi {
    get<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<ResultPattern<T>>;
    post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<ResultPattern<T>>;
    put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<ResultPattern<T>>;
    patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<ResultPattern<T>>;
    delete<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<ResultPattern<T>>;
    // downloadFile(
    //     url: string,
    //     config?: AxiosRequestConfig,
    // ): Promise<ResultPattern<Blob>>;
    // downloadFileWithMetadata(
    //     url: string,
    //     config?: AxiosRequestConfig,
    // ): Promise<ResultPattern<{ blob: Blob; headers: Record<string, string> }>>;
}

// --- Create Axios Instance ---
function createApi(): TypedApi {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });

    const api: TypedApi = {
        async get<T = any>(
            url: string,
            config?: AxiosRequestConfig,
        ): Promise<ResultPattern<T>> {
            try {
                const response = await instance.get(url, config);
                return handleSuccess(response);
            } catch (error) {
                // console.error("API GET Error:", error);
                return handleError(error as AxiosError);
            }
        },

        async post<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig,
        ): Promise<ResultPattern<T>> {
            try {
                const response = await instance.post(url, data, config);
                return handleSuccess(response);
            } catch (error) {
                return handleError(error as AxiosError);
            }
        },

        async put<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig,
        ): Promise<ResultPattern<T>> {
            try {
                const response = await instance.put(url, data, config);
                return handleSuccess(response);
            } catch (error) {
                return handleError(error as AxiosError);
            }
        },

        async patch<T = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig,
        ): Promise<ResultPattern<T>> {
            try {
                const response = await instance.patch(url, data, config);
                return handleSuccess(response);
            } catch (error) {
                return handleError(error as AxiosError);
            }
        },

        async delete<T = any>(
            url: string,
            config?: AxiosRequestConfig,
        ): Promise<ResultPattern<T>> {
            try {
                const response = await instance.delete(url, config);
                return handleSuccess(response);
            } catch (error) {
                return handleError(error as AxiosError);
            }
        },

        // async downloadFile(
        //     url: string,
        //     config: AxiosRequestConfig = {},
        // ): Promise<ResultPattern<Blob>> {
        //     try {
        //         const response = await axios.get(url, {
        //             ...config,
        //             baseURL: API_BASE_URL,
        //             withCredentials: true,
        //             responseType: "blob",
        //         });
        //         return success(response.data);
        //     } catch (error) {
        //         return handleError(error as AxiosError);
        //     }
        // },

        // async downloadFileWithMetadata(
        //     url: string,
        //     config: AxiosRequestConfig = {},
        // ): Promise<ResultPattern<{ blob: Blob; headers: Record<string, string> }>> {
        //     try {
        //         const response = await axios.get(url, {
        //             ...config,
        //             baseURL: API_BASE_URL,
        //             withCredentials: true,
        //             responseType: "blob",
        //         });
        //
        //         return success({
        //             blob: response.data,
        //             headers: response.headers as Record<string, string>,
        //         });
        //     } catch (error) {
        //         return handleError(error as AxiosError);
        //     }
        // },
    };

    return api;
}

// --- Success Response Handler ---
function handleSuccess(response: AxiosResponse): ResultPattern<any> {
    const data = response.data;

    if (!isResultPattern(data)) {
        return success(data);
    }

    return data.isSuccess ? success(data.data) : failure(data.error);
}

// --- Error Response Handler ---
function handleError(error: AxiosError): ResultPattern<any> {
    const status = error.response?.status;
    const responseData = error.response?.data;

    if (status === 401) {
        try {
            // Dispatch custom event for unauthorized access
            window.dispatchEvent(new CustomEvent("auth:unauthorized"));
        } catch (e) {
            console.warn("Failed to dispatch unauthorized event:", e);
        }
    }

    if (responseData && isResultPattern(responseData)) {
        return failure(responseData.error || { message: errorMessages.default });
    }

    const fallbackMessage =
        (status && errorMessages[status]) ||
        (error.code === "ECONNABORTED" && errorMessages.timeout) ||
        (error.request && errorMessages.network) ||
        errorMessages.default;

    const errorObject: ResultError = {
        message: fallbackMessage,
        code: status ?? error.code,
        details: responseData,
    };

    return failure(errorObject);
}

// --- Export shared instance ---
export const api = createApi();
