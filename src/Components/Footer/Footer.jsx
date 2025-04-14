import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>ENERGIYA</h3>
            <p>Ishonchli energiya yechimlari</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Kompaniya</h4>
              <ul>
                <li><a href="#about">Biz haqimizda</a></li>
                <li><a href="#products">Mahsulotlar</a></li>
                <li><a href="#contact">Bog'lanish</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Mahsulotlar</h4>
              <ul>
                <li><a href="#ups">UPS qurilmalari</a></li>
                <li><a href="#generators">Generatorlar</a></li>
                <li><a href="#stabilizers">Stabilizatorlar</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Aloqa</h4>
              <ul>
                <li>Tel: +998 90 123 45 67</li>
                <li>Email: info@energiya.uz</li>
                <li>Manzil: Toshkent sh.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Energiya. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 