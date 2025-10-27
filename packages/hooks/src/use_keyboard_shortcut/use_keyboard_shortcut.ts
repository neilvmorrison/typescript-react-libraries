import { useEffect } from 'react';

/**
 * Registers a keyboard shortcut with optional modifiers (ctrl, shift, alt, meta).
 *
 * @param options - Configuration object for the keyboard shortcut
 *
 * @example
 * ```typescript
 * useKeyboardShortcut({
 *   key: 's',
 *   modifiers: ['ctrl'],
 *   onPress: () => {
 *     saveDocument();
 *   },
 * });
 * ```
 */

export type KeyModifier = 'ctrl' | 'shift' | 'alt' | 'meta';

export interface IUseKeyboardShortcutOptions {
  key: string;
  modifiers?: KeyModifier[];
  onPress: () => void;
  preventDefault?: boolean;
}

export function useKeyboardShortcut(
  options: IUseKeyboardShortcutOptions
): void {
  useEffect(() => {
    const handle_key_press = (event: KeyboardEvent): void => {
      const modifiers_match =
        !options.modifiers ||
        options.modifiers.every((modifier) => {
          switch (modifier) {
            case 'ctrl':
              return event.ctrlKey || event.metaKey;
            case 'shift':
              return event.shiftKey;
            case 'alt':
              return event.altKey;
            case 'meta':
              return event.metaKey;
            default:
              return false;
          }
        });

      if (
        modifiers_match &&
        event.key.toLowerCase() === options.key.toLowerCase()
      ) {
        if (options.preventDefault ?? true) {
          event.preventDefault();
        }
        options.onPress();
      }
    };

    window.addEventListener('keydown', handle_key_press);
    return () => {
      window.removeEventListener('keydown', handle_key_press);
    };
  }, [options]);
}
