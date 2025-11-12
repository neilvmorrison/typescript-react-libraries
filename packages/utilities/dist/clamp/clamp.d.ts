/**
 * Constrains a numeric value to stay within a specified minimum and maximum range.
 *
 * @param value - The value to clamp
 * @param min - The minimum boundary
 * @param max - The maximum boundary
 * @returns The clamped value, constrained between min and max
 *
 * @example
 * ```typescript
 * clamp(5, 0, 10);   // 5
 * clamp(15, 0, 10);  // 10
 * clamp(-5, 0, 10);  // 0
 * ```
 */
export declare function clamp(value: number, min: number, max: number): number;
//# sourceMappingURL=clamp.d.ts.map