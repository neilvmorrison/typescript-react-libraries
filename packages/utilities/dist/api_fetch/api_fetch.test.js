import { describe, it, expect, beforeEach, vi } from 'vitest';
import { api_fetch, api_get, api_post, api_put, api_patch, api_delete, ApiError, } from './api_fetch';
const mockFetch = vi.fn();
global.fetch = mockFetch;
describe('api_fetch', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });
    describe('api_fetch', () => {
        it('should return success result for successful request', async () => {
            const mockData = { id: 1, name: 'Test' };
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockData),
            });
            const result = await api_fetch('/api/test');
            expect(result.error).toBeNull();
            expect(result.data).toEqual(mockData);
        });
        it('should return error result for failed request', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found',
                text: () => Promise.resolve('Resource not found'),
            });
            const result = await api_fetch('/api/test');
            expect(result.data).toBeNull();
            expect(result.error).toMatchObject({
                status: 404,
                statusText: 'Not Found',
                message: 'Resource not found',
                url: '/api/test',
            });
        });
        it('should include custom headers', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ id: 1 }),
            });
            await api_fetch('/api/test', {
                headers: {
                    Authorization: 'Bearer token123',
                },
            });
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch.mock.calls[0]?.[0]).toBe('/api/test');
            const callArgs = mockFetch.mock.calls[0];
            const headers = callArgs[1].headers;
            expect(headers.get('Content-Type')).toBe('application/json');
            expect(headers.get('Authorization')).toBe('Bearer token123');
        });
        it('should stringify body when provided', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            });
            const body = { name: 'test' };
            await api_fetch('/api/test', { method: 'POST', body });
            expect(mockFetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
                body: JSON.stringify(body),
            }));
        });
        it('should skip response parsing when parseResponse is false', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
            });
            const result = await api_fetch('/api/test', { parseResponse: false });
            expect(result.error).toBeNull();
            expect(result.data).toBeUndefined();
        });
        it('should handle network errors', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));
            const result = await api_fetch('/api/test');
            expect(result.data).toBeNull();
            expect(result.error).toBeDefined();
        });
        it('should return ApiError instance for HTTP errors', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                text: () => Promise.resolve('Server error occurred'),
            });
            const result = await api_fetch('/api/test');
            expect(result.data).toBeNull();
            expect(result.error).toBeInstanceOf(ApiError);
            expect(result.error).toMatchObject({
                status: 500,
                statusText: 'Internal Server Error',
                message: 'Server error occurred',
                url: '/api/test',
            });
        });
        it('should be type-safe when accessing error properties', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 403,
                statusText: 'Forbidden',
                text: () => Promise.resolve('Access denied'),
            });
            const result = await api_fetch('/api/test');
            if (result.error) {
                expect(result.error.status).toBe(403);
                expect(result.error.statusText).toBe('Forbidden');
                expect(result.error.message).toBe('Access denied');
                expect(result.error.url).toBe('/api/test');
            }
        });
    });
    describe('api_get', () => {
        it('should make GET request', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ id: 1 }),
            });
            await api_get('/api/test');
            expect(mockFetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({ method: 'GET' }));
        });
    });
    describe('api_post', () => {
        it('should make POST request with body', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ id: 1 }),
            });
            const body = { name: 'test' };
            await api_post('/api/test', body);
            expect(mockFetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(body),
            }));
        });
    });
    describe('api_put', () => {
        it('should make PUT request with body', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ id: 1 }),
            });
            const body = { name: 'updated' };
            await api_put('/api/test/1', body);
            expect(mockFetch).toHaveBeenCalledWith('/api/test/1', expect.objectContaining({
                method: 'PUT',
                body: JSON.stringify(body),
            }));
        });
    });
    describe('api_patch', () => {
        it('should make PATCH request with body', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ id: 1 }),
            });
            const body = { name: 'patched' };
            await api_patch('/api/test/1', body);
            expect(mockFetch).toHaveBeenCalledWith('/api/test/1', expect.objectContaining({
                method: 'PATCH',
                body: JSON.stringify(body),
            }));
        });
    });
    describe('api_delete', () => {
        it('should make DELETE request', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            });
            await api_delete('/api/test/1');
            expect(mockFetch).toHaveBeenCalledWith('/api/test/1', expect.objectContaining({ method: 'DELETE' }));
        });
    });
});
//# sourceMappingURL=api_fetch.test.js.map