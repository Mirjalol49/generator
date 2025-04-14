import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';
import { useCart } from '../../Context/CartContext';
import fallbackImage from '../../assets/images/product1.jpg'; // Import fallback image

const ProductCard = ({ 
  id,
  image,
  title,
  power,
  price,
  category,
  description
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageError = () => {
    setImgError(true);
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
            <span className="price-label">Narxi:</span>
            <span className="product-card-price">{price.toLocaleString()} so'm</span>
          </div>
          
          <div className="buttons-wrapper">
            <div className="buttons-container">
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart({ id, image, title, price, quantity: 1 })}
                aria-label="Savatga qo'shish"
              >
                <FaShoppingCart />
                <span>SAVATGA</span>
              </button>
              
              <Link to={`/product/${id}`} className="detail-btn-fixed">
                Batafsil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 