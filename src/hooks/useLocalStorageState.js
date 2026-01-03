import { useEffect, useState } from "react";

function useLocalStorageState(key, initialValue) {
  function state() {
    const storedValue = localStorage.getItem(key);

    // console.log("storedValue", storedValue);

    return storedValue ? JSON.parse(storedValue) : initialValue;
  }

  const [value, setValue] = useState(() => state());

  // console.log("value2fromLocal", value);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue };
}

export default useLocalStorageState;
