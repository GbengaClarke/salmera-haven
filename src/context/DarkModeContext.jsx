import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const prefaresDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // console.log("prfaresDark", prefaresDark);

  const { value, setValue } = useLocalStorageState("darkMode", prefaresDark);

  // console.log("value", value);

  const [isDarkMode, setIsDarkMode] = useState(value);

  const theme = isDarkMode ? "dark-mode" : "light-mode";

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
    setValue(!isDarkMode);
  }

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.remove("light-mode", "dark-mode");
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("light-mode", "dark-mode");
      root.classList.add("light-mode");
    }
  }, [isDarkMode, prefaresDark]);

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, setIsDarkMode, toggleTheme, theme }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkModeContext() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("used outside of dark mode provider");

  return context;
}

export { DarkModeProvider, useDarkModeContext };
