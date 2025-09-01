import { createContext } from "react";
import type { ShoppingCartContextType } from "./ShoppingCartType";

export const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);