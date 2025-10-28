import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDisclosure } from './use_disclosure';

describe('useDisclosure', () => {
  it('should return false as initial state', () => {
    const { result } = renderHook(() => useDisclosure());
    const [isOpen] = result.current;

    expect(isOpen).toBe(false);
  });

  it('should have open and close functions', () => {
    const { result } = renderHook(() => useDisclosure());
    const [, controls] = result.current;

    expect(typeof controls.open).toBe('function');
    expect(typeof controls.close).toBe('function');
  });

  it('should set state to true when open is called', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should set state to false when close is called', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1].close();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should handle multiple open and close calls', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current[1].open();
      result.current[1].open();
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1].close();
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should maintain independent state across multiple hook instances', () => {
    const { result: result1 } = renderHook(() => useDisclosure());
    const { result: result2 } = renderHook(() => useDisclosure());

    act(() => {
      result1.current[1].open();
    });

    expect(result1.current[0]).toBe(true);
    expect(result2.current[0]).toBe(false);
  });
});
