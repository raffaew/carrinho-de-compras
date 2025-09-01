import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import type { Theme } from "../theme/ThemeType.ts";

type ThemeProviderProps = { children: ReactNode };

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
