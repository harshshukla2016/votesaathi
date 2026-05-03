// @ts-nocheck
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../src/hooks/useDebounce';

describe('useDebounce hook', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 }
    });

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 500 });
    
    // Value should not be updated immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should now be updated
    expect(result.current).toBe('updated');
  });
});
