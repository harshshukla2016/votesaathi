import { useState, useCallback } from 'react';

/**
 * Custom hook for type-safe localStorage access with SSR safety.
 * Prevents hydration mismatches and provides error-safe persistence.
 *
 * @template T
 * @param {string} key - The localStorage key.
 * @param {T} initialValue - The fallback value when no stored value exists.
 * @returns {[T, (value: T | ((prev: T) => T)) => void]} A stateful value and setter.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: Error reading key "${key}"`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`useLocalStorage: Error setting key "${key}"`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
