import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEventListener } from './use_event_listener';

describe('useEventListener', () => {
  beforeEach(() => {
    vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should add event listener on mount', () => {
    const callback = vi.fn();

    renderHook(() => {
      useEventListener('click', callback);
    });

    expect(window.addEventListener).toHaveBeenCalledWith('click', callback);
  });

  it('should remove event listener on unmount', () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => {
      useEventListener('click', callback);
    });
    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('click', callback);
  });

  it('should handle different event types', () => {
    const callback = vi.fn();

    renderHook(() => {
      useEventListener('scroll', callback);
    });

    expect(window.addEventListener).toHaveBeenCalledWith('scroll', callback);
  });

  it('should remove and re-add listener when callback changes', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { rerender } = renderHook(
      ({
        event,
        callback,
      }: {
        event: string;
        callback: (event: Event) => void;
      }) => {
        useEventListener(event, callback);
      },
      {
        initialProps: { event: 'click', callback: callback1 },
      }
    );

    expect(window.addEventListener).toHaveBeenCalledWith('click', callback1);

    rerender({ event: 'click', callback: callback2 });

    expect(window.removeEventListener).toHaveBeenCalledWith('click', callback1);
    expect(window.addEventListener).toHaveBeenCalledWith('click', callback2);
  });

  it('should handle event when listener is triggered', () => {
    const callback = vi.fn();

    renderHook(() => {
      useEventListener('click', callback);
    });

    const clickEvent = new MouseEvent('click');
    window.dispatchEvent(clickEvent);

    expect(callback).toHaveBeenCalledWith(clickEvent);
  });

  it('should remove and re-add listener when event type changes', () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({
        event,
        callback,
      }: {
        event: string;
        callback: (event: Event) => void;
      }) => {
        useEventListener(event, callback);
      },
      {
        initialProps: { event: 'click', callback },
      }
    );

    expect(window.addEventListener).toHaveBeenCalledWith('click', callback);

    rerender({ event: 'scroll', callback });

    expect(window.removeEventListener).toHaveBeenCalledWith('click', callback);
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', callback);
  });
});
