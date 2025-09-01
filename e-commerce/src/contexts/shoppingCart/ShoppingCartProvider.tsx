import { useState } from "react";
import type { ReactNode } from "react";
import type {
  ShoppingCartContextType,
  ShoppingCart,
  ItemsType,
} from "./ShoppingCartType";
import { ShoppingCartContext } from "./ShoppingCartContext";

type ShoppingProviderProps = { children: ReactNode };

export const ShoppingCartProvider = ({ children }: ShoppingProviderProps) => {
  const [cart, setCart] = useState<ShoppingCartContextType["cart"]>({
    items: [],
    sum: 0,
    total: 0,
  });

  console.log("Carrinho ", cart);

  const handleAddItem = (item: ShoppingCart) => {
    if (
      item.items &&
      cart.items &&
      item.items.some((newItem) =>
        cart.items?.some((cartItem) => cartItem.id === newItem.id)
      )
    ) {
      alert("Item ja adicionado no carrinho");
    } else {
      setCart((prevCart) => ({
        items: [...(prevCart.items || []), ...(item.items || [])],
        sum: (prevCart.sum ?? 0) + (item.sum ?? 0),
        total: (prevCart.total ?? 0) + (item.total ?? 0),
      }));
    }
  };

  const handleUpdateItem = (newItems: ItemsType[]) => {
    setCart((prevCart) => ({
      ...prevCart,
      items:
        prevCart.items?.map((item) =>
          newItems.some((ni) => ni.id === item.id) // verifica se existe com mesmo id
            ? { ...item, ...newItems.find((ni) => ni.id === item.id) } // mescla
            : item
        ) ?? [],
      sum: newItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
      // ...código existente...,
      total: newItems.reduce((acc, item) => acc + item.quantity, 0),
    }));
  };

  const handleDeleteItem = (itemId: number) => {
    setCart((prevCart) => {
      const updateItem =
        prevCart.items?.filter((item) => item.id !== itemId) ?? [];
      return {
        ...prevCart,
        items: updateItem,
        sum: prevCart.sum,
        total: prevCart.total,
      };
    });
  };

  const handleClearCart = () => {
    setCart({ items: [], sum: 0, total: 0 });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        handleAddItem,
        handleUpdateItem,
        handleDeleteItem,
        handleClearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
