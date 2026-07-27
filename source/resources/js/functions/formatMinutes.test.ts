import { describe, expect, it } from 'vitest';
import formatMinutes from './formatMinutes';

describe('formatMinutes', () => {
    it('formats zero minutes', () => {
        expect(formatMinutes(0)).toBe('0h 0m');
    });

    it('formats full hour', () => {
        expect(formatMinutes(60)).toBe('1h 0m');
    });

    it('formats hours and minutes', () => {
        expect(formatMinutes(90)).toBe('1h 30m');
    });

    it('formats eight hours', () => {
        expect(formatMinutes(480)).toBe('8h 0m');
    });
});
