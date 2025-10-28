import { useEffect } from 'react';

export function useEventListener(
  event: string,
  callback: (event: Event) => void
) {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => {
      window.removeEventListener(event, callback);
    };
  }, [event, callback]);
}
