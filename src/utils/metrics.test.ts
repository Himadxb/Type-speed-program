import { describe, it, expect } from 'vitest';
import { calculateGrossWPM, calculateAccuracy } from './metrics';

describe('Metrics Utils', () => {
  describe('calculateGrossWPM', () => {
    it('should calculate 0 WPM for 0 time', () => {
      expect(calculateGrossWPM(100, 0)).toBe(0);
    });

    it('should calculate correct WPM', () => {
      // 5 chars = 1 word. 60 seconds = 1 min.
      // 5 chars in 60s -> 1 WPM.
      expect(calculateGrossWPM(5, 60)).toBe(1);
      
      // 25 chars in 60s -> 5 WPM
      expect(calculateGrossWPM(25, 60)).toBe(5);

      // 25 chars in 30s -> 10 WPM (25/5 = 5 words. 0.5 min. 5/0.5 = 10)
      expect(calculateGrossWPM(25, 30)).toBe(10);
    });

    it('should round result', () => {
      // 26 chars in 60s -> 5.2 words -> 5 WPM
      expect(calculateGrossWPM(26, 60)).toBe(5);
      
      // 28 chars in 60s -> 5.6 words -> 6 WPM
      expect(calculateGrossWPM(28, 60)).toBe(6);
    });
  });

  describe('calculateAccuracy', () => {
    it('should be 100% if no chars typed', () => {
      // Arguable, but usually starting accuracy is 100% or 0%
      // Current impl returns 100.
      expect(calculateAccuracy(0, 0)).toBe(100);
    });

    it('should calculate correct accuracy', () => {
      expect(calculateAccuracy(50, 50)).toBe(100);
      expect(calculateAccuracy(25, 50)).toBe(50);
      expect(calculateAccuracy(0, 50)).toBe(0);
    });

    it('should round result', () => {
      // 1/3 = 33.33 -> 33
      expect(calculateAccuracy(1, 3)).toBe(33);
      // 2/3 = 66.66 -> 67
      expect(calculateAccuracy(2, 3)).toBe(67);
    });
  });
});
