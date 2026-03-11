import "./ShoppingCart.scss";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../contexts/shoppingCart/UseShoppingCart";
import type { ItemsType } from "../../contexts/shoppingCart/ShoppingCartType";
import "./ShoppingCart.scss";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";

const ShoppingCart = () => {
  const { cart, handleClearCart, handleUpdateItem, handleDeleteItem, handleFormatPrice } =
    useShoppingCart();

  const [newCart, setNewCart] = useState<ItemsType[]>([]);

  const initialQuantities = cart.items
    ? Object.fromEntries(cart.items.map((item) => [item.id, 1]))
    : {};

  const [quantityItems, setQuantityItems] = useState<{ [key: string]: number }>(
    initialQuantities,
  );

  useEffect(() => {
    if (cart.items) {
      setNewCart(cart.items);
      setQuantityItems(
        Object.fromEntries(
          cart.items.map((item) => [item.id, item.quantity ?? 1]),
        ),
      );
    }
  }, []);

  useEffect(() => {
    newCart.forEach((item) => {
      if (item.quantity === 0) {
        handleDeleteItem(item.id);
      }
    });
    handleUpdateItem(newCart);
  }, [newCart]);

  const handleQuantityChange = (
    id: number,
    action: "increase" | "decrease",
  ) => {
    setQuantityItems((prev) => {
      const newQuantity = action === "increase" ? prev[id] + 1 : prev[id] - 1;

      setNewCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );

      return {
        ...prev,
        [id]: newQuantity,
      };
    });
  };

  return (
    <div className="shoppingCart">
    {(cart.items?.length !== 0) ? (
      <>
      <ul>
          {cart.items?.map((item) => (
            <li className="cardItem" key={item.id}>
              <h3>{item.title}</h3>
              <p>Quantidade: {quantityItems[item.id]}</p>
              <img src={item.image} alt={item.title} />
               <p className="price" >{handleFormatPrice(item.price)}</p>

              <div className="addOrDelItems">
                <IoRemove
                  className="removeIcon"
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                />
                <span className="quantity">{quantityItems[item.id]}</span>
                <IoMdAdd
                  className="addIcon"
                  onClick={() => handleQuantityChange(item.id, "increase")}
                />
              </div>

              <div className="subTotal">
                Subtotal: {handleFormatPrice(item.quantity * item.price)}
              </div>
            </li>
          ))}
      </ul>

      <div className="total">
          <span>Total:  {cart.sum ? handleFormatPrice(cart.sum) : "R$ 0,00"}</span>
           <button onClick={handleClearCart}>Esvaziar Carrinho</button>
        </div>
        
      </>
    ) : (
     <>
     <p className="linkForHome"> Você ainda não adicionou nenhum item, clique <Link to="/" className="toHome">aqui</Link> para adicionar produtos!</p>
     
     </>
    )}

    </div>
  );
};

export default ShoppingCart;
