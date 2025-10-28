import { useState } from 'react';
import { throttle } from '@libraries/utilities';
import { useEventListener } from '../use_event_listener/use_event_listener';

const MOBILE_WIDTH = 768;

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEventListener('resize', () => {
    throttle(() => {
      setIsMobile(window.innerWidth < MOBILE_WIDTH);
    }, 500);
  });

  return isMobile;
}
