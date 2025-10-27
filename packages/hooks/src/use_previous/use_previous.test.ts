import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrevious } from './use_previous';

describe('usePrevious', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBeUndefined();
  });

  it('should return previous value after rerender', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 1 });
    expect(result.current).toBe(0);

    rerender({ value: 2 });
    expect(result.current).toBe(1);
  });

  it('should work with strings', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    rerender({ value: 'third' });
    expect(result.current).toBe('second');
  });

  it('should work with objects', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: { count: 0 } },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: { count: 1 } });
    expect(result.current).toEqual({ count: 0 });

    rerender({ value: { count: 2 } });
    expect(result.current).toEqual({ count: 1 });
  });

  it('should work with arrays', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: [1, 2, 3] },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: [4, 5, 6] });
    expect(result.current).toEqual([1, 2, 3]);
  });

  it('should work with boolean', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: false },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: true });
    expect(result.current).toBe(false);

    rerender({ value: false });
    expect(result.current).toBe(true);
  });

  it('should work with null and undefined', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: null as null | string },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 'value' });
    expect(result.current).toBeNull();

    rerender({ value: null });
    expect(result.current).toBe('value');
  });

  it('should handle rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    for (let i = 1; i <= 10; i++) {
      rerender({ value: i });
      expect(result.current).toBe(i - 1);
    }
  });

  it('should not update if value does not change', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'constant' },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 'constant' });
    expect(result.current).toBe('constant');

    rerender({ value: 'constant' });
    expect(result.current).toBe('constant');
  });
});
