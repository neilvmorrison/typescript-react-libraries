import { useEffect } from 'react';
export function useEventListener(event, callback) {
    useEffect(() => {
        window.addEventListener(event, callback);
        return () => {
            window.removeEventListener(event, callback);
        };
    }, [event, callback]);
}
//# sourceMappingURL=use_event_listener.js.map