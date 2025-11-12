import { describe, it, expect } from 'vitest';
import { debounce } from './debounce';
describe('debounce', () => {
    it('should debounce function calls', async () => {
        let call_count = 0;
        const increment = debounce(() => {
            call_count++;
        }, 10);
        increment();
        increment();
        increment();
        expect(call_count).toBe(0);
        await new Promise((resolve) => setTimeout(resolve, 15));
        expect(call_count).toBe(1);
    });
});
//# sourceMappingURL=debounce.test.js.map