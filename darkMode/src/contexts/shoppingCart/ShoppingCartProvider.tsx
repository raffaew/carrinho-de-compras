import { useState } from "react";
import type { ReactNode } from "react";
import type { ShoppingCartContextType, ShoppingCart } from "./ShoppingCartType";
import { ShoppingCartContext } from "./ShoppingCartContext";

type ShoppingProviderProps = { children: ReactNode };

export const ShoppingCartProvider = ({ children }: ShoppingProviderProps) => {
  const [cart, setCart] = useState<ShoppingCartContextType["cart"]>({
    items: [],
    sum: 0,
    total: 0,
  });


  const handleUpdateItem = (item: ShoppingCart) => {
    setCart((prevCart) => ({
      items: [...prevCart.items || [], ...item.items || []],
      sum: (prevCart.sum ?? 0) + (item.sum ?? 0),
      total: (prevCart.total ?? 0) + (item.total ?? 0),
    }));
  };


  const handleClearCart = () => {
    setCart({ items: [], sum: 0, total: 0 });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, handleUpdateItem, handleClearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
