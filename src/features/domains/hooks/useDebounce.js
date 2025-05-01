import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 * Only updates the returned debounced value after a specified delay
 * once the input value stops changing.
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
