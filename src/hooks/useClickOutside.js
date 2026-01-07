import { useEffect, useRef } from "react";

function useClickOutside(handler) {
  const ref = useRef();

  useEffect(() => {
    function handlerClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // setFloatMenu(false);
        handler(false);
      }
    }

    document.addEventListener("click", handlerClick);

    return () => {
      document.removeEventListener("click", handlerClick);
    };
  }, [handler]);

  return ref;
}

export default useClickOutside;
