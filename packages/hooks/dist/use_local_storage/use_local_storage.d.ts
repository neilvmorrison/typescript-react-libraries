/**
 * Syncs state with localStorage with automatic serialization and cross-tab synchronization.
 *
 * @param key - The localStorage key to use
 * @param initialValue - The initial value if no value exists in localStorage
 * @returns Object with value, setValue, and removeValue
 *
 * @example
 * ```typescript
 * const { value, setValue, removeValue } = useLocalStorage('theme', 'light');
 *
 * setValue('dark'); // Updates both state and localStorage
 * removeValue(); // Removes from localStorage and resets to initial value
 * ```
 */
export interface IUseLocalStorageReturn<T> {
    value: T;
    setValue: (value: T | ((current: T) => T)) => void;
    removeValue: () => void;
}
export declare function useLocalStorage<T>(key: string, initialValue: T): IUseLocalStorageReturn<T>;
//# sourceMappingURL=use_local_storage.d.ts.map