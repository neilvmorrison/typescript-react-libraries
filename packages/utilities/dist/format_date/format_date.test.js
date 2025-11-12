import { describe, it, expect } from 'vitest';
import { format_date } from './format_date';
describe('format_date', () => {
    it('should format date in short format', () => {
        const date = new Date(2024, 0, 15);
        expect(format_date(date, 'short')).toBe('15/01/2024');
    });
    it('should format date in long format', () => {
        const date = new Date(2024, 0, 15);
        const formatted = format_date(date, 'long');
        expect(formatted).toContain('January');
        expect(formatted).toContain('2024');
    });
    it('should handle string dates', () => {
        expect(format_date('2024-01-15T12:00:00', 'short')).toBe('15/01/2024');
    });
    it('should throw on invalid date', () => {
        expect(() => format_date('invalid')).toThrow('Invalid date');
    });
});
//# sourceMappingURL=format_date.test.js.map