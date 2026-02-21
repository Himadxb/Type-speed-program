
/**
 * Calculates Gross WPM based on total characters typed.
 * Standard definition: (all typed entries / 5) / time (min)
 */
export const calculateGrossWPM = (totalChars: number, timeElapsedSeconds: number): number => {
  if (timeElapsedSeconds === 0) return 0;
  const words = totalChars / 5;
  const minutes = timeElapsedSeconds / 60;
  return Math.round(words / minutes);
};

/**
 * Calculates Net WPM based on correct characters typed.
 * Net WPM = ((all typed entries / 5) - uncorrected errors) / time (min)
 * For simplicity in this app, we might just use (correct entries / 5) / time (min)
 * or stick to the standard formula if we track uncorrected errors separately.
 * Here we use a simplified Net WPM: (correctChars / 5) / time (min)
 */
export const calculateNetWPM = (correctChars: number, timeElapsedSeconds: number): number => {
  if (timeElapsedSeconds === 0) return 0;
  const words = correctChars / 5;
  const minutes = timeElapsedSeconds / 60;
  return Math.round(words / minutes);
};

/**
 * Calculates accuracy percentage.
 * Accuracy = (correct chars / total chars) * 100
 */
export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};
