import { useState, useCallback, useEffect } from 'react';

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

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): IUseLocalStorageReturn<T> {
  const [value, setValueState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (new_value: T | ((current: T) => T)) => {
      try {
        const value_to_store =
          new_value instanceof Function ? new_value(value) : new_value;
        setValueState(value_to_store);
        window.localStorage.setItem(key, JSON.stringify(value_to_store));
      } catch (error) {
        console.error('Failed to set localStorage:', error);
      }
    },
    [key, value]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setValueState(initialValue);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handle_storage_change = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          setValueState(JSON.parse(event.newValue) as T);
        } catch {
          // Silently fail on invalid JSON
        }
      }
    };

    window.addEventListener('storage', handle_storage_change);
    return () => {
      window.removeEventListener('storage', handle_storage_change);
    };
  }, [key]);

  return { value, setValue, removeValue };
}
