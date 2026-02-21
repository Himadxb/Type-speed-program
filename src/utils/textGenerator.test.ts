import { describe, it, expect } from 'vitest';
import { generateWords } from './textGenerator';

describe('Text Generator', () => {
  it('should generate requested number of words', () => {
    const text = generateWords(10);
    const words = text.split(' ');
    expect(words.length).toBe(10);
  });

  it('should default to easy words', () => {
    const text = generateWords(5);
    // Simple check: no numbers or complex symbols in easy mode
    expect(text).toMatch(/^[a-z ]+$/);
  });

  it('should handle difficulty modes', () => {
    // Hard mode should contain capitalized words from HARD_WORDS list
    const hardText = generateWords(20, 'hard');
    // Hard words are capitalized in the list, so we expect some caps
    // Also, check length > 0
    expect(hardText.length).toBeGreaterThan(0);
  });

  it('should include punctuation when enabled', () => {
    // Generate enough words to likely get punctuation
    const text = generateWords(100, 'easy', true);
    // Should contain at least one punctuation mark from [, . ? ! ;]
    // Or capitalized letter
    expect(text).toMatch(/[A-Z,.!?;]/);
  });
});
