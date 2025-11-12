import { IResult } from '../try_catch/try_catch';
/**
 * Standardized fetch utility that wraps HTTP requests with consistent error handling.
 *
 * @param url - The URL to fetch from
 * @param options - Optional fetch configuration
 * @returns A promise that resolves to either a success or error result object
 *
 * @example
 * ```typescript
 * const result = await api_fetch<User>('/api/users/1');
 *
 * if (result.error) {
 *   console.error('Request failed:', result.error);
 * } else {
 *   console.log('User data:', result.data);
 * }
 * ```
 */
export interface IApiError {
    status: number;
    statusText: string;
    message: string;
    url: string;
}
export declare class ApiError extends Error implements IApiError {
    status: number;
    statusText: string;
    url: string;
    constructor(status: number, statusText: string, message: string, url: string);
}
export interface IApiFetchOptions extends Omit<RequestInit, 'body'> {
    body?: unknown;
    parseResponse?: boolean;
}
export declare function api_fetch<T>(url: string, options?: IApiFetchOptions): Promise<IResult<T, IApiError>>;
export declare function api_get<T>(url: string, options?: Omit<IApiFetchOptions, 'method' | 'body'>): Promise<IResult<T, IApiError>>;
export declare function api_post<T>(url: string, body?: unknown, options?: Omit<IApiFetchOptions, 'method' | 'body'>): Promise<IResult<T, IApiError>>;
export declare function api_put<T>(url: string, body?: unknown, options?: Omit<IApiFetchOptions, 'method' | 'body'>): Promise<IResult<T, IApiError>>;
export declare function api_patch<T>(url: string, body?: unknown, options?: Omit<IApiFetchOptions, 'method' | 'body'>): Promise<IResult<T, IApiError>>;
export declare function api_delete<T>(url: string, options?: Omit<IApiFetchOptions, 'method' | 'body'>): Promise<IResult<T, IApiError>>;
//# sourceMappingURL=api_fetch.d.ts.map