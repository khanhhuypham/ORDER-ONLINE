import { useCallback, useEffect, useRef } from 'react';

// Define the type for the hook's return value
interface UseTimeoutReturn {
  reset: () => void;
  clear: () => void;
}

// Define the hook with appropriate types for the parameters
export default function useTimeout(callback: () => void, delay: number): UseTimeoutReturn {
  // Create a ref to hold the latest callback function
  const callbackRef = useRef(callback);
  
  // Create a ref to hold the timeout ID
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update the callback ref whenever the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Define a function to set the timeout
  const set = useCallback(() => {
    // Use setTimeout and store the ID in the ref
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  // Define a function to clear the timeout
  const clear = useCallback(() => {
    // Clear the timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Set up the timeout when the component mounts and clean it up when it unmounts
  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  // Define a function to reset the timeout
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  // Return the reset and clear functions
  return { reset, clear };
}
