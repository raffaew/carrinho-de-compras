import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home'
import ShoppingCart from './components/shoppingCart/ShoppingCart'
import Header from './components/header/Header'
import { ThemeProvider } from './contexts/theme/ThemeProvider'
import { ShoppingCartProvider } from './contexts/shoppingCart/ShoppingCartProvider'
import './App.scss'


function App() {
  return (
    <div className='app'>
      <Router>
        <ThemeProvider>
          <ShoppingCartProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ShoppingCartProvider>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
