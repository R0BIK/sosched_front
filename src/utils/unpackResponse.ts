import { ResultPattern, isResultPattern, ResultError } from "../api/resultPattern";

export interface Paginated<T> {
    items: T[];
    page?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
}

export interface UnpackResult<T> {
    data: T[] | null;
    error: ResultError | null;
    pagination?: Paginated<T>;
}

interface PaginatedPayload<T> {
    items: T[];
    page?: number;
    pageSize?: number;
    totalPages?: number;
    totalCount?: number;
}

export function unpackResponse<T>(response: any): UnpackResult<T> {
    if (isResultPattern(response)) {
        if (!response.isSuccess) {
            return { data: null, error: response.error };
        }

        const payload = response.data;

        // Проверяем, что payload — объект и имеет поле items
        if (
            payload &&
            typeof payload === "object" &&
            "items" in payload &&
            Array.isArray((payload as PaginatedPayload<T>).items)
        ) {
            const { items, page, pageSize, totalPages, totalCount } =
                payload as PaginatedPayload<T>;
            return {
                data: items,
                error: null,
                pagination: { items, page, pageSize, totalPages, totalCount },
            };
        }

        // Если payload — массив
        if (Array.isArray(payload)) {
            return { data: payload, error: null };
        }

        // Если payload — объект, оборачиваем в массив
        return { data: [payload] as T[], error: null };
    }

    return {
        data: null,
        error: new ResultError("Unexpected response format"),
    };
}