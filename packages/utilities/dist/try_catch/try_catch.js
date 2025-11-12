/**
 * Wraps an async function in a try-catch block and returns a result object.
 *
 * @param fn - The async function to execute
 * @returns A promise that resolves to either a success or error result object
 *
 * @example
 * ```typescript
 * const result = await try_catch(async () => {
 *   return await fetch('/api/data').then(res => res.json());
 * });
 *
 * if (result.error) {
 *   console.error('Request failed:', result.error);
 * } else {
 *   console.log('Data:', result.data);
 * }
 * ```
 */
export async function try_catch(fn) {
    try {
        const data = await fn();
        return { data, error: null };
    }
    catch (error) {
        return { data: null, error: error };
    }
}
//# sourceMappingURL=try_catch.js.map