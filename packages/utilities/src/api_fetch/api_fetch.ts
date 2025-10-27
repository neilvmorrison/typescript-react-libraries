import { try_catch, IResult } from '../try_catch/try_catch';

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

export class ApiError extends Error implements IApiError {
  status: number;
  statusText: string;
  url: string;

  constructor(
    status: number,
    statusText: string,
    message: string,
    url: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export interface IApiFetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  parseResponse?: boolean;
}

export async function api_fetch<T>(
  url: string,
  options?: IApiFetchOptions
): Promise<IResult<T, IApiError>> {
  const { body, parseResponse = true, ...fetchOptions } = options ?? {};

  return try_catch<T, IApiError>(async () => {
    const requestOptions: RequestInit = {
      ...fetchOptions,
      headers: new Headers({
        'Content-Type': 'application/json',
        ...(fetchOptions.headers
          ? Object.fromEntries(new Headers(fetchOptions.headers).entries())
          : {}),
      }),
    };

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorMessage = await response
        .text()
        .catch(() => response.statusText);
      throw new ApiError(
        response.status,
        response.statusText,
        errorMessage,
        url
      );
    }

    if (!parseResponse) {
      return undefined as T;
    }

    const data: T = (await response.json()) as T;
    return data;
  });
}

export async function api_get<T>(
  url: string,
  options?: Omit<IApiFetchOptions, 'method' | 'body'>
): Promise<IResult<T, IApiError>> {
  return api_fetch<T>(url, { ...options, method: 'GET' });
}

export async function api_post<T>(
  url: string,
  body?: unknown,
  options?: Omit<IApiFetchOptions, 'method' | 'body'>
): Promise<IResult<T, IApiError>> {
  return api_fetch<T>(url, { ...options, method: 'POST', body });
}

export async function api_put<T>(
  url: string,
  body?: unknown,
  options?: Omit<IApiFetchOptions, 'method' | 'body'>
): Promise<IResult<T, IApiError>> {
  return api_fetch<T>(url, { ...options, method: 'PUT', body });
}

export async function api_patch<T>(
  url: string,
  body?: unknown,
  options?: Omit<IApiFetchOptions, 'method' | 'body'>
): Promise<IResult<T, IApiError>> {
  return api_fetch<T>(url, { ...options, method: 'PATCH', body });
}

export async function api_delete<T>(
  url: string,
  options?: Omit<IApiFetchOptions, 'method' | 'body'>
): Promise<IResult<T, IApiError>> {
  return api_fetch<T>(url, { ...options, method: 'DELETE' });
}
