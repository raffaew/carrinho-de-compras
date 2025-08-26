export type ItemsType  = {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    quantity: number;
}

export type ShoppingCart = {
    items: ItemsType[] | null;
    sum: number | null;
    total: number | null;
}

export type ShoppingCartContextType = {
  cart: ShoppingCart;
  handleUpdateItem: (item: ShoppingCart) => void;
  handleClearCart: () => void;
};