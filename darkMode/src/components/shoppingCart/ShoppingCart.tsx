import "./ShoppingCart.scss";
import { useShoppingCart } from "../../contexts/shoppingCart/UseShoppingCart";
import type { ItemsType, ShoppingCartContextType } from "../../contexts/shoppingCart/ShoppingCartType";
import "./ShoppingCart.scss";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";

const ShoppingCart = () => {
  const { cart, handleClearCart, handleUpdateItem } = useShoppingCart();

  const [newCart, setNewCart] = useState<ShoppingCartContextType["cart"]>({
    items: [],
    sum: 0,
    total: 0,
  });

  console.log(newCart);

  const initialQuantities = cart.items
    ? Object.fromEntries(cart.items.map((item) => [item.id, 1]))
    : {};

  const [quantityItems, setQuantityItems] = useState<{ [key: string]: number }>(
    initialQuantities
  );

  useEffect(() => {
    setNewCart(cart);
  }, []);

    
const handleQuantityChange = (id: number, action: "increase" | "decrease") => {
  setQuantityItems((prev) => {
    const newQuantity = action === "increase" ? prev[id] + 1 : prev[id] - 1;

    // Atualiza o carrinho com a nova quantidade
    setNewCart((prevCart) => ({
      ...prevCart,
      items: (prevCart.items ?? []).map((item: ItemsType) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
      sum: null, 
      total: null,
    }));

    return {
      ...prev,
      [id]: newQuantity,
    };
  });
};
  return (
    <div className="shoppingCart">
      <h1>Carrinho</h1>

      <button onClick={handleClearCart}>Esvaziar Carrinho</button>

      <ul>
        <li>
          {cart.items ? (
            cart.items?.map((item) => (
              <div className="cardItem" key={item.id}>
                <h3>{item.title}</h3>
                <p>Preço: ${item.price?.toFixed(2)}</p>
                <p>Quantidade: {quantityItems[item.id] || 1}</p>
                <img src={item.image} alt={item.title} />

                <div className="addOrDelItems">
                  <IoRemove
                    className="removeIcon"
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                  />
                  <span>{quantityItems[item.id] || 1}</span>
                  <IoMdAdd
                    className="addIcon"
                    onClick={() => handleQuantityChange(item.id, "increase")}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>nao tem</p>
          )}
        </li>
        <li>
          <span>Total: ${cart.sum?.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  );
};

export default ShoppingCart;
