import "./ShoppingCart.scss";
import { useShoppingCart } from "../../contexts/shoppingCart/UseShoppingCart";
import type { ItemsType } from "../../contexts/shoppingCart/ShoppingCartType";
import "./ShoppingCart.scss";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";

const ShoppingCart = () => {
  const { cart, handleClearCart, handleUpdateItem, handleDeleteItem } = useShoppingCart();

  const [newCart, setNewCart] = useState<ItemsType[]>([]);

  const initialQuantities = cart.items
    ? Object.fromEntries(cart.items.map((item) => [item.id, 1]))
    : {};

  const [quantityItems, setQuantityItems] = useState<{ [key: string]: number }>(
    initialQuantities
  );

  useEffect(() => {
    if (cart.items) {
      setNewCart(cart.items);
      setQuantityItems(
        Object.fromEntries(
          cart.items.map((item) => [item.id, item.quantity ?? 1])
        )
      );
    }
  }, []);

useEffect(() => {
  newCart.forEach((item) => {
    if (item.quantity === 0) {
      handleDeleteItem(item.id);
    }
  })
   handleUpdateItem(newCart);
}, [newCart]);

  const handleQuantityChange = (
    id: number,
    action: "increase" | "decrease"
  ) => {
    setQuantityItems((prev) => {
      const newQuantity = action === "increase" ? prev[id] + 1 : prev[id] - 1;

      setNewCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity  } : item
        )
      );

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
                <p>Quantidade: {quantityItems[item.id]}</p>
                <img src={item.image} alt={item.title} />

                <div className="addOrDelItems">
                  <IoRemove
                    className="removeIcon"
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                  />
                  <span>{quantityItems[item.id]}</span>
                  <IoMdAdd
                    className="addIcon"
                    onClick={() => handleQuantityChange(item.id, "increase")}
                  />
                </div>
                <div className="subTotal">
                  Subtotal: {(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <p>Não há items no carrinho</p>
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
