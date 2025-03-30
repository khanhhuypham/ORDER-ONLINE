import { useState } from "react";
// Define a generic type T for the elements of the array
export default function useArray<T>(defaultValue: T[]) {
  // State to hold the array, initialized with the default value
  const [array, setArray] = useState<T[]>(defaultValue);

  // Function to push a new element to last of the array
  function push(element: T) {
    setArray((a) => [...a, element]);
  }

  // Function to push a new element to first of the array
  function unshift(element: T) {
    setArray((a) => [element, ...a]);
  }

  // Function to insert an element at a specific index
  function insert(index: number, element: T) {
    setArray((a) => [
      ...a.slice(0, index),
      element,
      ...a.slice(index, a.length),
    ]);
  }

  // Function to filter the array based on a callback function
  function filter(callback: (value: T, index: number, array: T[]) => boolean) {
    setArray((a) => a.filter(callback));
  }

  // Function to update an element at a specific index
  function update(index: number, newElement: T) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  // Function to remove an element at a specific index
  function remove(index: number) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  // Function to clear the array
  function clear() {
    setArray([]);
  }

  // Return the array and all manipulation functions
  return {
    array,
    setNewArray: setArray,
    push,
    unshift,
    insert,
    filter,
    update,
    remove,
    clear,
  };
}
