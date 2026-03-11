import axios from "axios";
import "./Home.scss";
import { useEffect, useState } from "react";
import type { ItemsType } from "../../contexts/shoppingCart/ShoppingCartType";
import { useShoppingCart } from "../../contexts/shoppingCart/UseShoppingCart";

export const Home = () => {
  const [items, setItems] = useState<ItemsType[]>([]);
  const { handleAddItem, handleFormatPrice } = useShoppingCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get<ItemsType[]>("/data/products.json");
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="home">
      <ul>
          {items &&
            items.map((item) => (
              <li className="cardItem" key={item.id}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
                <div className="infoPrice">
                  <p>{item.description}</p>
                  <p className="price">{handleFormatPrice(item.price)}</p>

                  <button
                    onClick={() =>
                      handleAddItem({
                        items: [{ ...item, quantity: 1 }],
                        sum: item.price,
                        total: 1,
                      })
                    }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </li>
            ))}
     
      </ul>
    </div>
  );
};

export default Home;
