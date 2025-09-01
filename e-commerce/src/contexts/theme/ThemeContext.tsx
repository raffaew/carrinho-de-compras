import { createContext } from "react";
import type { ThemeContextType } from "../theme/ThemeType";

export const ThemeContext = createContext<ThemeContextType | null>(null);
