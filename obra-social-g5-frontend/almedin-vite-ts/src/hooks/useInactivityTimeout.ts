// src/hooks/useInactivityTimeout.ts
import { useEffect } from 'react';

const useInactivityTimeout = (timeout: number, onTimeout: () => void) => {
  useEffect(() => {
    let timeoutId: number;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onTimeout, timeout);
    };

    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('mousedown', resetTimeout);
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('mousedown', resetTimeout);
    };
  }, [timeout, onTimeout]);
};

export default useInactivityTimeout;
