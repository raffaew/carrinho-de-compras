import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/theme/UseTheme";
import { IoCart } from "react-icons/io5";
import { useShoppingCart } from "../../contexts/shoppingCart/UseShoppingCart";

import "./Header.scss";

import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { cart } = useShoppingCart();

  return (
    <div className="header">
      <div className="title-header">
        <Link to="/">Header</Link>
      </div>
      <div className="icons">
        <div className="icon-theme">
          <button onClick={toggleTheme}>
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </div>
        <div className="icon-cart">
          <Link to="/cart">
            <IoCart className="cart" />
          </Link>
          {cart.total != 0 &&  
          <div className="notification">
            <span>{cart.total}</span>
          </div> }
          
        </div>
      </div>
    </div>
  );
};

export default Header;
