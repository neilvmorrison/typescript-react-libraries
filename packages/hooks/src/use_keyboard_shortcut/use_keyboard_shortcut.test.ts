import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboardShortcut } from './use_keyboard_shortcut';

describe('useKeyboardShortcut', () => {
  it('should call onPress when key is pressed', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 's',
        onPress,
      })
    );

    const event = new KeyboardEvent('keydown', { key: 's' });
    window.dispatchEvent(event);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should work with ctrl modifier', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 's',
        modifiers: ['ctrl'],
        onPress,
      })
    );

    const eventWithoutCtrl = new KeyboardEvent('keydown', { key: 's' });
    window.dispatchEvent(eventWithoutCtrl);
    expect(onPress).not.toHaveBeenCalled();

    const eventWithCtrl = new KeyboardEvent('keydown', {
      key: 's',
      ctrlKey: true,
    });
    window.dispatchEvent(eventWithCtrl);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should work with meta key as ctrl modifier', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 's',
        modifiers: ['ctrl'],
        onPress,
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 's',
      metaKey: true,
    });
    window.dispatchEvent(event);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should work with shift modifier', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 'A',
        modifiers: ['shift'],
        onPress,
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'A',
      shiftKey: true,
    });
    window.dispatchEvent(event);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should work with alt modifier', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 'F',
        modifiers: ['alt'],
        onPress,
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'F',
      altKey: true,
    });
    window.dispatchEvent(event);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should work with multiple modifiers', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 'K',
        modifiers: ['ctrl', 'shift'],
        onPress,
      })
    );

    const eventWithOnlyCtrl = new KeyboardEvent('keydown', {
      key: 'K',
      ctrlKey: true,
    });
    window.dispatchEvent(eventWithOnlyCtrl);
    expect(onPress).not.toHaveBeenCalled();

    const eventWithBoth = new KeyboardEvent('keydown', {
      key: 'K',
      ctrlKey: true,
      shiftKey: true,
    });
    window.dispatchEvent(eventWithBoth);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should be case insensitive', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 'S',
        onPress,
      })
    );

    const event = new KeyboardEvent('keydown', { key: 's' });
    window.dispatchEvent(event);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should prevent default by default', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 's',
        modifiers: ['ctrl'],
        onPress,
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 's',
      ctrlKey: true,
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not prevent default when preventDefault is false', () => {
    const onPress = vi.fn();
    renderHook(() =>
      useKeyboardShortcut({
        key: 's',
        onPress,
        preventDefault: false,
      })
    );

    const event = new KeyboardEvent('keydown', { key: 's' });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should cleanup event listener on unmount', () => {
    const onPress = vi.fn();
    const { unmount } = renderHook(() =>
      useKeyboardShortcut({
        key: 's',
        onPress,
      })
    );

    unmount();

    const event = new KeyboardEvent('keydown', { key: 's' });
    window.dispatchEvent(event);

    expect(onPress).not.toHaveBeenCalled();
  });
});
