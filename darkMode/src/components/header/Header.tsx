import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/theme/UseTheme';
import './Header.scss';

import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='header'>
      <div className="title-header">
          <Link to="/">Header</Link>
      </div>
    <div className="icon-theme">
       <button onClick={toggleTheme}>{theme === "light" ?  <MdDarkMode /> : <MdLightMode />}</button>
    </div>
      <div className="links-header">
        <Link to="/cart">Shopping Cart</Link>
      </div>
    </div>
   
  )
}

export default Header