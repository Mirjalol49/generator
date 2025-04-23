import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';
import { useCart } from '../../context/CartContext';
import fallbackImage from '../../assets/images/product1.png'; // Import fallback image
import { useLanguage } from '../../context/LanguageContext';
import CartModal from '../CartModal/CartModal';

const ProductCard = ({ 
  id,
  image,
  title,
  power,
  price,
  category,
  description
}) => {
  const [imgError, setImgError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quantity] = useState(1);
  const { addToCart } = useCart();
  const { translate } = useLanguage();

  const handleMouseEnter = () => {
    // Keep the function for future use
  };

  const handleMouseLeave = () => {
    // Keep the function for future use
  };

  const handleImageError = () => {
    setImgError(true);
  };
  
  const handleAddToCart = () => {
    // First add to cart
    addToCart({ id, image, title, price, quantity });
    
    // Then show confirmation modal
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-card-image-container">
        <img 
          src={imgError ? fallbackImage : image} 
          alt={title} 
          className="product-card-image" 
          onError={handleImageError}
        />
        
        <div className="product-badges">
          <span className="product-badge">{category}</span>
        </div>
        
        {power && <span className="power-badge">{power}</span>}
      </div>
      
      <div className="product-card-info">
        <h3 className="product-card-title">{title}</h3>
        
        <div className="product-card-description">
          {description && <p>{description.substring(0, 60)}...</p>}
        </div>
        
        <div className="product-card-footer">
          <div className="price-row">
            <span className="price-label">{translate('products.price')}:</span>
            <span className="product-card-price">{price.toLocaleString()} so'm</span>
          </div>
          
          <div className="buttons-wrapper">
            <div className="buttons-container">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                aria-label={translate('common.addToCart')}
              >
                <FaShoppingCart />
                <span>{translate('products.addToCart')}</span>
              </button>
              
              <Link to={`/product/${id}`} className="detail-btn-fixed">
                {translate('products.details')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cart confirmation modal */}
      <CartModal 
        isOpen={showModal}
        onClose={closeModal}
        product={{ id, image, title, price }}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductCard; 