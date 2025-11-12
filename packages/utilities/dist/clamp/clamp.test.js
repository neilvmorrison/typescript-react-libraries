import { describe, it, expect } from 'vitest';
import { clamp } from './clamp';
describe('clamp', () => {
    it('should clamp value between min and max', () => {
        expect(clamp(5, 0, 10)).toBe(5);
        expect(clamp(15, 0, 10)).toBe(10);
        expect(clamp(-5, 0, 10)).toBe(0);
    });
});
//# sourceMappingURL=clamp.test.js.map