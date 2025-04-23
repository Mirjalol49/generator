import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, toggleCart }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { translate } = useLanguage();
  const navigate = useNavigate();
  
  // Calculate shipping threshold
  const shippingThreshold = 45000; // Increased to a realistic amount for so'm
  const currentTotal = getTotalPrice();
  const remainingForFreeShipping = Math.max(0, shippingThreshold - currentTotal);
  
  // Effect to toggle body scroll
  useEffect(() => {
    if (isOpen) {
      // Disable body scrolling when sidebar is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Re-enable body scrolling when sidebar is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    // Cleanup function to ensure scrolling is enabled when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);
  
  const handleCheckout = () => {
    toggleCart(); // Close the cart sidebar
    navigate('/checkout'); // Navigate to checkout page
  };

  // Format currency with commas for thousands separators
  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US');
  };

  return (
    <>
      {/* Overlay background */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={toggleCart}
      ></div>
      
      {/* Sidebar content */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">{translate('cart.yourCart')}</h2>
          <button className="cart-close" onClick={toggleCart}>✕</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>{translate('checkout.cartEmpty')}</p>
          </div>
        ) : (
          <>
            <div className="shipping-status">
              <p>{translate('cart.freeShipping')}</p>
              <div className="shipping-progress-bar">
                <div className="shipping-progress-fill" style={{ width: '100%' }}></div>
              </div>
              <p className="shipping-congrats">{translate('cart.congratulations')} {translate('cart.freeShipping')}</p>
            </div>
            
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="cart-item-image" 
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn minus" 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, Math.max(1, item.quantity - 1));
                        }}
                      >
                        −
                      </button>
                      <span className="quantity-value">{translate('cart.qty')}: {item.quantity}</span>
                      <button 
                        className="quantity-btn plus"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                      >
                        +
                      </button>
                      <span className="item-price">{item.price.toLocaleString()} so'm</span>
                      <button 
                        className="cart-item-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }}
                        aria-label="Remove item"
                      >
                        <svg width="16" height="18" viewBox="0 0 448 512" className="trash-icon">
                          <path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row total">
                <span>{translate('cart.total')}</span>
                <span>{getTotalPrice().toLocaleString()} so'm</span>
              </div>
              
              <button 
                className="checkout-button" 
                onClick={handleCheckout}
              >
                {translate('cart.checkout')}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar; 