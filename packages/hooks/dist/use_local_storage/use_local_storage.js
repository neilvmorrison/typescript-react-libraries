import { useState, useCallback, useEffect } from 'react';
export function useLocalStorage(key, initialValue) {
    const [value, setValueState] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch {
            return initialValue;
        }
    });
    const setValue = useCallback((new_value) => {
        try {
            const value_to_store = new_value instanceof Function ? new_value(value) : new_value;
            setValueState(value_to_store);
            window.localStorage.setItem(key, JSON.stringify(value_to_store));
        }
        catch (error) {
            console.error('Failed to set localStorage:', error);
        }
    }, [key, value]);
    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setValueState(initialValue);
        }
        catch (error) {
            console.error('Failed to remove from localStorage:', error);
        }
    }, [key, initialValue]);
    useEffect(() => {
        const handle_storage_change = (event) => {
            if (event.key === key && event.newValue) {
                try {
                    setValueState(JSON.parse(event.newValue));
                }
                catch {
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
//# sourceMappingURL=use_local_storage.js.map