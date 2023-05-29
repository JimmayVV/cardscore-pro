import * as React from "react";
import useLocalStorageState from "use-local-storage-state";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorageState<boolean>("darkMode", {
    defaultValue: false,
  });

  React.useEffect(() => {
    if (window === undefined) return;
    const root = window.document.documentElement;
    root.classList.remove(darkMode ? "light" : "dark");
    root.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}
