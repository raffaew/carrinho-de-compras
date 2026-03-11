import "./Header.scss";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/theme/UseTheme";
import { useShoppingCart } from "../../contexts/shoppingCart/UseShoppingCart";
import { CiDark } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { cart } = useShoppingCart();

  return (
    <div className="header">
      <div className="title-header">
        <Link to="/">Produtos</Link>
      </div>
      <div className="icons">
        <div className="icon-theme ">
          <button onClick={toggleTheme}>
            {theme === "light" ? <CiDark/> : <MdLightMode/>}
          </button>
        </div>
        <div className="icon-cart">
          <Link to="/cart">
            <HiOutlineShoppingBag className="cart" />
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
