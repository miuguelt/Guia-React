import { useState, useEffect } from 'react';

/**
 * Custom Hook useDebounce
 * Retrasa la actualización de un valor hasta que el usuario pausa la escritura.
 * Ideal para búsquedas en tiempo real contra Spring Boot.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
