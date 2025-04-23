import React, { useEffect, useRef } from 'react';
import './CartModal.css';
import { useLanguage } from '../../context/LanguageContext';

const CartModal = ({ isOpen, onClose, product, quantity = 1, onQuantityChange, onViewCart }) => {
  const { translate } = useLanguage();
  const modalRef = useRef(null);

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close modal with escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!product) return null;

  const totalPrice = product.price * quantity;

  return (
    <div className={`cart-modal ${isOpen ? 'active' : ''}`}>
      <div className="cart-modal-content" ref={modalRef}>
        <button className="cart-modal-close" onClick={onClose}>×</button>
        
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">{translate('cart.addedToCart')}</h2>
        </div>
        
        <p className="cart-modal-subtitle">{translate('cart.productAddedMessage')}</p>
        
        <div className="cart-divider"></div>
        
        <div className="cart-product">
          <img 
            src={product.image} 
            alt={product.name} 
            className="cart-product-image"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          <div className="cart-product-details">
            <h3 className="cart-product-title">{product.name}</h3>
            <p className="cart-product-price">{product.price.toLocaleString()} UZS</p>
          </div>
        </div>
        
        <div className="cart-quantity">
          <span className="cart-quantity-label">{translate('cart.quantity')}</span>
          <div className="quantity-controls">
            <button 
              className="quantity-btn"
              onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="text"
              className="quantity-input"
              value={quantity}
              readOnly
            />
            <button 
              className="quantity-btn"
              onClick={() => onQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="cart-total">
          <span>{translate('cart.total')}</span>
          <span>{totalPrice.toLocaleString()} UZS</span>
        </div>
        
        <button className="cart-button" onClick={onViewCart}>
          {translate('cart.viewCart')}
        </button>
      </div>
    </div>
  );
};

export default CartModal; 