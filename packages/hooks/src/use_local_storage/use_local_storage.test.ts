import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './use_local_storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('initial');
  });

  it('should return stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('stored');
  });

  it('should update localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current.setValue('updated');
    });

    expect(result.current.value).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  it('should support function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 5));

    act(() => {
      result.current.setValue((current) => current + 1);
    });

    expect(result.current.value).toBe(6);
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(6));
  });

  it('should work with objects', () => {
    const initialValue = { name: 'John', age: 30 };
    const { result } = renderHook(() => useLocalStorage('user', initialValue));

    expect(result.current.value).toEqual(initialValue);

    act(() => {
      result.current.setValue({ name: 'Jane', age: 25 });
    });

    expect(result.current.value).toEqual({ name: 'Jane', age: 25 });
    expect(JSON.parse(localStorage.getItem('user') || '')).toEqual({
      name: 'Jane',
      age: 25,
    });
  });

  it('should work with arrays', () => {
    const { result } = renderHook(() => useLocalStorage('items', [1, 2, 3]));

    expect(result.current.value).toEqual([1, 2, 3]);

    act(() => {
      result.current.setValue([4, 5, 6]);
    });

    expect(result.current.value).toEqual([4, 5, 6]);
  });

  it('should remove value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('stored');

    act(() => {
      result.current.removeValue();
    });

    expect(result.current.value).toBe('initial');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('should handle invalid JSON in localStorage', () => {
    localStorage.setItem('test-key', 'invalid json');

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'fallback')
    );

    expect(result.current.value).toBe('fallback');
  });

  it('should handle localStorage errors gracefully', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage full');
    });

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current.setValue('new value');
    });

    expect(consoleError).toHaveBeenCalledWith(
      'Failed to set localStorage:',
      expect.any(Error)
    );

    consoleError.mockRestore();
  });

  it('should sync across storage events', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('initial');

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'test-key',
        newValue: JSON.stringify('synced'),
      });
      window.dispatchEvent(event);
    });

    expect(result.current.value).toBe('synced');
  });

  it('should ignore storage events for different keys', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'other-key',
        newValue: JSON.stringify('other value'),
      });
      window.dispatchEvent(event);
    });

    expect(result.current.value).toBe('initial');
  });

  it('should handle storage events with null newValue', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'test-key',
        newValue: null,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.value).toBe('initial');
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'storage',
      expect.any(Function)
    );
  });
});
