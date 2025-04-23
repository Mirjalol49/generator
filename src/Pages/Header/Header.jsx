import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import CartSidebar from '../../Components/CartSidebar/CartSidebar'
import LanguageSwitcher from '../../Components/LanguageSwitcher/LanguageSwitcher'
import './Header.css'

const Header = () => {
  const { cartItems } = useCart();
  const { translate } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Close mobile menu on window resize (if screen gets larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isCartOpen]);

  return (
    <header className='header'>
      <div className="container">
        <div className="header-wrapper">
          <Link className='header-logo' to="/">
            <img src="/src/assets/images/logo.png" alt="Logotip" />
          </Link>
          
          {/* Mobile menu overlay */}
          <div 
            className={`header-overlay ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={closeMobileMenu}
          ></div>
          
          <nav className={`header-nav ${mobileMenuOpen ? 'active' : ''}`}>
            {/* Language switcher in mobile menu */}
            <div className="mobile-language-switcher">
              <LanguageSwitcher />
            </div>
            <Link to="/" onClick={closeMobileMenu}>{translate('header.home')}</Link>
            <Link to="/products" onClick={closeMobileMenu}>{translate('header.products')}</Link>
            <Link to="/about" onClick={closeMobileMenu}>{translate('header.about')}</Link>
            <Link to="/contact" onClick={closeMobileMenu}>{translate('header.contact')}</Link>
          </nav>
          
          <div className="header-actions">
            <div className="desktop-language-switcher">
              <LanguageSwitcher />
            </div>
            <div className="cart-link" onClick={toggleCart}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 17a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </div>
            
            <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />
    </header>
  )
}

export default Header
