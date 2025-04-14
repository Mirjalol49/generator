import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, toggleCart }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  // Calculate shipping threshold
  const shippingThreshold = 45;
  const currentTotal = getTotalPrice();
  const remainingForFreeShipping = Math.max(0, shippingThreshold - currentTotal);
  
  const handleCheckout = () => {
    toggleCart(); // Close the cart sidebar
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2 className="cart-title">SAVATINGIZ</h2>
        <button className="cart-close" onClick={toggleCart}>✕</button>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Savatingiz bo'sh</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="cart-item-image" 
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">{item.price.toLocaleString()} so'm</p>
                  <div className="quantity-control">
                    <button 
                      className="quantity-btn minus" 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <div className="quantity-value">{item.quantity}</div>
                    <button 
                      className="quantity-btn plus"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          <div className="shipping-msg">
            {remainingForFreeShipping > 0 ? (
              <p>Bepul yetkazib berish uchun yana <span className="shipping-highlight">{remainingForFreeShipping.toLocaleString()} so'm</span> kerak!</p>
            ) : (
              <p>Siz <span className="shipping-highlight">BEPUL yetkazib berish</span> uchun haqli bo'ldingiz!</p>
            )}
          </div>
          
          <div className="cart-footer">
            <div className="subtotal">
              <span>JAMI</span>
              <span>{getTotalPrice().toLocaleString()} so'm</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              BUYURTMA BERISH
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar; 