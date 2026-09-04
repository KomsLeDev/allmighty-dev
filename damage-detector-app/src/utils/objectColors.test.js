import { describe, it, expect } from 'vitest';
import { colorForIndex } from './objectColors';

describe('colorForIndex', () => {
  it('returns a color for a given index', () => {
    expect(colorForIndex(0)).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('cycles back to the start once past the palette length', () => {
    const first = colorForIndex(0);
    const wrapped = colorForIndex(10);
    expect(wrapped).toBe(first);
  });
});
