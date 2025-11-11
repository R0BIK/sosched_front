export class ResultError {
    message: string;
    code?: string | number;
    details?: any;

    constructor(message: string, code?: string | number, details?: any) {
        this.message = message;
        this.code = code;
        this.details = details;
    }

    toString(): string {
        let result = `Error: ${this.message}`;
        if (this.code !== undefined) {
            result += ` (Code: ${this.code})`;
        }
        if (this.details !== undefined) {
            result += ` | Details: ${JSON.stringify(this.details)}`;
        }
        return result;
    }
}

export interface ResultPatternSuccess<T> {
    isSuccess: true;
    data: T;
    error: null;
}

export interface ResultPatternFailure {
    isSuccess: false;
    data: null;
    error: ResultError;
}

export type ResultPattern<T> = ResultPatternSuccess<T> | ResultPatternFailure;

// --- Success Factory ---
export function success<T>(data: T): ResultPattern<T> {
    return {
        isSuccess: true,
        data,
        error: null,
    };
}

// --- Failure Factory ---
export function failure<T = unknown>(
    error: string | ResultError,
): ResultPattern<T> {
    const err: ResultError =
        typeof error === "string"
            ? new ResultError(error)
            : new ResultError(error.message, error.code, error.details);

    return {
        isSuccess: false,
        data: null,
        error: err,
    };
}

// --- Type Guard ---
export function isResultPattern<T = unknown>(
    result: unknown,
): result is ResultPattern<T> {
    return (
        typeof result === "object" &&
        result !== null &&
        "isSuccess" in result &&
        typeof (result as any).isSuccess === "boolean"
    );
}
