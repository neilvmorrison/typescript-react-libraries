import { describe, it, expect } from 'vitest';
import { get_user_initials } from './get_user_initials';

describe('get_user_initials', () => {
  it('should return initials from full name', () => {
    expect(get_user_initials('John Doe')).toBe('JD');
    expect(get_user_initials('Jane Smith')).toBe('JS');
  });

  it('should handle single name', () => {
    expect(get_user_initials('Madonna')).toBe('M');
  });

  it('should handle multiple names and return first two initials', () => {
    expect(get_user_initials('Mary Jane Watson')).toBe('MJ');
  });
});
