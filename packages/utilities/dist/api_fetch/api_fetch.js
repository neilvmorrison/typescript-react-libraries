import { try_catch } from '../try_catch/try_catch';
export class ApiError extends Error {
    constructor(status, statusText, message, url) {
        super(message);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "statusText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'ApiError';
        this.status = status;
        this.statusText = statusText;
        this.url = url;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
export async function api_fetch(url, options) {
    const { body, parseResponse = true, ...fetchOptions } = options ?? {};
    return try_catch(async () => {
        const requestOptions = {
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
            throw new ApiError(response.status, response.statusText, errorMessage, url);
        }
        if (!parseResponse) {
            return undefined;
        }
        const data = (await response.json());
        return data;
    });
}
export async function api_get(url, options) {
    return api_fetch(url, { ...options, method: 'GET' });
}
export async function api_post(url, body, options) {
    return api_fetch(url, { ...options, method: 'POST', body });
}
export async function api_put(url, body, options) {
    return api_fetch(url, { ...options, method: 'PUT', body });
}
export async function api_patch(url, body, options) {
    return api_fetch(url, { ...options, method: 'PATCH', body });
}
export async function api_delete(url, options) {
    return api_fetch(url, { ...options, method: 'DELETE' });
}
//# sourceMappingURL=api_fetch.js.map