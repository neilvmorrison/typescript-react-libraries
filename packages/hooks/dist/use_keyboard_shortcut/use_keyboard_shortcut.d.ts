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
export declare function useKeyboardShortcut(options: IUseKeyboardShortcutOptions): void;
//# sourceMappingURL=use_keyboard_shortcut.d.ts.map