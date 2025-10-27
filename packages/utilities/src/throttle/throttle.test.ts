import { describe, it, expect } from 'vitest';
import { throttle } from './throttle';

describe('throttle', () => {
  it('should throttle function calls', () => {
    let call_count = 0;
    const increment = throttle(() => {
      call_count++;
    }, 10);

    increment();
    increment();
    increment();

    expect(call_count).toBe(1);
  });
});
