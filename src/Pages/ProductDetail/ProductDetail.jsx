import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';
import { products } from '../../data/products';
import { FaShoppingCart } from 'react-icons/fa';
import backIcon from '../../assets/images/back-icon.svg';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Mahsulot topilmadi!</h2>
        <Link to="/" className="back-link">Asosiy sahifaga qaytish</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-header">
          <Link to="/" className="back-arrow">
            <img src={backIcon} alt="Back" className="back-icon" />
            <span>Asosiy sahifa</span>
          </Link>
        </div>

        <div className="product-detail-content">
          <div className="product-image-container" style={{ width: '400px', height: 'auto' }}>
            <div className="product-category-badge">{product.category}</div>
            {product.power && <div className="product-power-badge">{product.power} kW</div>}
            <img src={product.image} alt={product.title} className="product-detail-image" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>

          <div className="product-info-container">
            <h1 className="product-model">{product.title}</h1>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-price-section">
              <div className="price-row">
                <div className="price-label">Narxi:</div>
                <div className="price-value">{product.price.toLocaleString()} so'm</div>
              </div>
            </div>

            <div className="product-actions">
              <button 
                onClick={handleAddToCart} 
                className="add-to-cart-btn"
              >
                <FaShoppingCart />
                <span>Savatga qo'shish</span>
              </button>
            </div>
          </div>
        </div>

        <div className="technical-specs-section">
          <h2 className="section-title">Texnik xususiyatlar</h2>
          
          {/* Generator Specifications Table */}
          <div className="specs-table">
            <div className="specs-category">
              <h3 className="category-title">GENERATOR</h3>
              
              <div className="specs-row">
                <div className="specs-label">Model nomi</div>
                <div className="specs-value">{product.title}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Maksimal quvvat</div>
                <div className="specs-value">{product.power} kW</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Nominal quvvat</div>
                <div className="specs-value">{Math.round(product.power * 0.9)} kW</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Chastota</div>
                <div className="specs-value">50 Hz</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Kuchlanish</div>
                <div className="specs-value">220V / 380V</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Faza</div>
                <div className="specs-value">Uch fazali</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Quvvat koeffitsienti</div>
                <div className="specs-value">0,8</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Dvigatel</div>
                <div className="specs-value">WEICHAI 12M33D1108E200</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Yoqilg'i sig'imi</div>
                <div className="specs-value">1600L</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">ATS</div>
                <div className="specs-value">Ha</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Boshqaruv paneli</div>
                <div className="specs-value">Ha</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Moy isitgich</div>
                <div className="specs-value">Ha</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Suv isitgich</div>
                <div className="specs-value">Ha</div>
              </div>
            </div>
            
            {/* Engine Specifications Table */}
            <div className="specs-category">
              <h3 className="category-title">DVIGATEL</h3>
              
              <div className="specs-row">
                <div className="specs-label">Dvigatel modeli</div>
                <div className="specs-value">WEICHAI 12M33D1108E200</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Turi</div>
                <div className="specs-value">V shaklidagi 12 silindrli</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Diametr x Yurish (mm)</div>
                <div className="specs-value">150x185</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Hajmi</div>
                <div className="specs-value">39.2L</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Havo olish</div>
                <div className="specs-value">Turbokompressor</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Siqish nisbati</div>
                <div className="specs-value">16.4:1</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Tezlik (ayl/min)</div>
                <div className="specs-value">1500</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Quvvat</div>
                <div className="specs-value">1108KW</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Yoqilg'i turi</div>
                <div className="specs-value">Dizel</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Yoqilg'i sarfi (g.kW/s)</div>
                <div className="specs-value">≤195</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Boshqaruv tizimi</div>
                <div className="specs-value">Elektron</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Ishga tushirish usuli</div>
                <div className="specs-value">24V DC</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Sovutish usuli</div>
                <div className="specs-value">Suv bilan sovutish</div>
              </div>
            </div>
            
            {/* Alternator Specifications Table */}
            <div className="specs-category">
              <h3 className="category-title">GENERATOR (ALTERNATOR)</h3>
              
              <div className="specs-row">
                <div className="specs-label">Chastota</div>
                <div className="specs-value">50HZ</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Quvvat</div>
                <div className="specs-value">1000KW</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Kuchlanish</div>
                <div className="specs-value">400V</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Qo'zg'atish usuli</div>
                <div className="specs-value">100% mis cho'tkasiz</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Izolyatsiya sinfi</div>
                <div className="specs-value">H</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Tezlik (ayl/min)</div>
                <div className="specs-value">1500</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Himoya</div>
                <div className="specs-value">IP23</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Ulanish usuli</div>
                <div className="specs-value">Uch fazali to'rt simli</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Kuchlanish rostlash</div>
                <div className="specs-value">AVR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 