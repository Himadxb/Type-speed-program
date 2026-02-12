import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTypingEngine } from '../hooks/useTypingEngine';

describe('useTypingEngine', () => {
  const TEST_TEXT = "hello world";

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useTypingEngine(TEST_TEXT));
    
    expect(result.current.userInput).toBe('');
    expect(result.current.currIndex).toBe(0);
    expect(result.current.phase).toBe('start');
    expect(result.current.wpm).toBe(0);
    expect(result.current.accuracy).toBe(100);
  });

  it('should start timer on first keypress', () => {
    const { result } = renderHook(() => useTypingEngine(TEST_TEXT));
    
    act(() => {
      result.current.handleKey('h');
    });

    expect(result.current.phase).toBe('typing');
    expect(result.current.userInput).toBe('h');
  });

  it('should handle correct typing', () => {
    const { result } = renderHook(() => useTypingEngine(TEST_TEXT));
    
    act(() => { result.current.handleKey('h'); });
    act(() => { result.current.handleKey('e'); });
    act(() => { result.current.handleKey('l'); });
    act(() => { result.current.handleKey('l'); });
    act(() => { result.current.handleKey('o'); });

    expect(result.current.userInput).toBe('hello');
    expect(result.current.currIndex).toBe(5);
  });

  it('should handle backspace', () => {
    const { result } = renderHook(() => useTypingEngine(TEST_TEXT));
    
    act(() => { result.current.handleKey('h'); });
    act(() => { result.current.handleKey('e'); });
    act(() => { result.current.handleKey('Backspace'); });

    expect(result.current.userInput).toBe('h');
    expect(result.current.currIndex).toBe(1);
  });

  it('should calculate WPM correctly', () => {
    // Mock Date.now to control time elapsed
    // Our hook uses Date.now() inside.
    const startTime = 1000;
    vi.setSystemTime(startTime);
    
    const { result } = renderHook(() => useTypingEngine(TEST_TEXT));
    
    // Start typing
    act(() => { result.current.handleKey('h'); });
    
    vi.setSystemTime(startTime + 12000); // +12s

    // Type remaining chars 'ello'
    act(() => { result.current.handleKey('e'); });
    act(() => { result.current.handleKey('l'); });
    act(() => { result.current.handleKey('l'); });
    act(() => { result.current.handleKey('o'); });

    // Check stats. Note: our hook calculates stats on keypress based on NOW.
    // So current WPM should reflect the time elapsed since start.
    expect(result.current.wpm).toBe(5);
  });

  it('should finish when text is complete', () => {
    const { result } = renderHook(() => useTypingEngine("hi"));
    
    act(() => { result.current.handleKey('h'); });
    act(() => { result.current.handleKey('i'); });

    expect(result.current.phase).toBe('finished');
  });
});
