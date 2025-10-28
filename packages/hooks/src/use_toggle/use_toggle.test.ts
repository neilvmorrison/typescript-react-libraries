import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToggle } from './use_toggle';

describe('useToggle', () => {
  describe('boolean mode', () => {
    it('should initialize with boolean value', () => {
      const { result } = renderHook(() => useToggle(false));
      const [value] = result.current;

      expect(value).toBe(false);
    });

    it('should toggle from false to true', () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        result.current[1]();
      });

      expect(result.current[0]).toBe(true);
    });

    it('should toggle from true to false', () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        result.current[1]();
      });

      expect(result.current[0]).toBe(false);
    });

    it('should handle multiple toggles', () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(true);

      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(false);

      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(true);
    });

    it('should return a function as second element', () => {
      const { result } = renderHook(() => useToggle(false));
      const [, toggle] = result.current;

      expect(typeof toggle).toBe('function');
    });
  });

  describe('array mode', () => {
    it('should initialize with first array value', () => {
      const { result } = renderHook(() => useToggle(['light', 'dark', 'auto']));
      const [value] = result.current;

      expect(value).toBe('light');
    });

    it('should cycle through array values', () => {
      const { result } = renderHook(() => useToggle(['light', 'dark', 'auto']));

      expect(result.current[0]).toBe('light');

      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe('dark');

      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe('auto');
    });

    it('should wrap around to first value at end of array', () => {
      const { result } = renderHook(() => useToggle(['a', 'b']));

      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe('b');

      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(undefined);
    });

    it('should handle single value array', () => {
      const { result } = renderHook(() => useToggle(['only']));

      expect(result.current[0]).toBe('only');

      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(undefined);
    });

    it('should handle multiple toggles in array mode', () => {
      const values = ['red', 'green', 'blue'];
      const { result } = renderHook(() => useToggle(values));

      act(() => {
        result.current[1]();
        result.current[1]();
        result.current[1]();
        result.current[1]();
      });

      expect(result.current[0]).toBe('red');
    });
  });

  describe('multiple instances', () => {
    it('should maintain independent state across instances', () => {
      const { result: result1 } = renderHook(() => useToggle(false));
      const { result: result2 } = renderHook(() => useToggle(['a', 'b']));

      act(() => {
        result1.current[1]();
      });

      expect(result1.current[0]).toBe(true);
      expect(result2.current[0]).toBe('a');
    });
  });
});
