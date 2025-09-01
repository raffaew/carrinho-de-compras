import axios from "axios";
import "./Home.scss";
import { useEffect, useState } from "react";
import type { ItemsType } from "../../contexts/shoppingCart/ShoppingCartType";
import { useShoppingCart } from "../../contexts/shoppingCart/UseShoppingCart";

export const Home = () => {
  const [items, setItems] = useState<ItemsType[]>([]);
  const { handleAddItem } = useShoppingCart();

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
      <h1>Produtos Esportivos</h1>
      <ul>
        <li>
          {items &&
            items.map((item) => (
              <div className="cardItem" key={item.id}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
                <p>{item.description}</p>
                <p>R$: {item.price.toFixed(2)}</p>

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
            ))}
        </li>
      </ul>
    </div>
  );
};

export default Home;
