import { useEventListener } from '../use_event_listener/use_event_listener';
export function useKeyboardShortcut(options) {
    function handleKeyDown(event) {
        if (event.key.toLowerCase() !== options.key.toLowerCase()) {
            return;
        }
        if (options.modifiers && options.modifiers.length > 0) {
            const allModifiersPressed = options.modifiers.every((modifier) => {
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
            if (!allModifiersPressed) {
                return;
            }
        }
        if (options.preventDefault !== false) {
            event.preventDefault();
        }
        options.onPress();
    }
    useEventListener('keydown', handleKeyDown);
}
//# sourceMappingURL=use_keyboard_shortcut.js.map