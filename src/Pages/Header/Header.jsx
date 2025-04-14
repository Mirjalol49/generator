import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartSidebar from '../../Components/CartSidebar/CartSidebar'
import './Header.css'

const Header = () => {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className='header'>
      <div className="container">
        <div className="header-wrapper">
          <Link className='header-logo' to="/">
            <img src="/src/assets/images/logo.png" alt="Logotip" />
          </Link>
          <nav className='header-nav'>
            <Link to="/">Asosiy</Link>
            <Link to="/products">Mahsulotlar</Link>
            <Link to="/about">Biz haqimizda</Link>
            <Link to="/contact">Aloqa</Link>
            <div className="cart-link" onClick={toggleCart}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 17a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </div>
          </nav>
        </div>
      </div>
      
      <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />
    </header>
  )
}

export default Header
