import { describe, it, expect } from 'vitest';
import { try_catch } from './try_catch';
describe('try_catch', () => {
    it('should return success result when function succeeds', async () => {
        const result = await try_catch(() => {
            return Promise.resolve('success');
        });
        expect(result.data).toBe('success');
        expect(result.error).toBeNull();
    });
    it('should return error result when function throws', async () => {
        const error_message = 'Something went wrong';
        const result = await try_catch(() => {
            throw new Error(error_message);
        });
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error?.message).toBe(error_message);
    });
    it('should handle async operations', async () => {
        const result = await try_catch(async () => {
            await new Promise((resolve) => setTimeout(resolve, 10));
            return 42;
        });
        expect(result.data).toBe(42);
        expect(result.error).toBeNull();
    });
    it('should preserve error type', async () => {
        class CustomError extends Error {
            constructor(message, code) {
                super(message);
                Object.defineProperty(this, "code", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                this.code = code;
            }
        }
        const result = await try_catch(() => {
            throw new CustomError('Custom error', 'ERR_CUSTOM');
        });
        expect(result.data).toBeNull();
        expect(result.error).toBeInstanceOf(CustomError);
        expect(result.error?.code).toBe('ERR_CUSTOM');
    });
});
//# sourceMappingURL=try_catch.test.js.map