import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">ALOQA</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-subtitle">Do'kon manzillari:</h3>
            <div className="store-addresses">
              <p>Toshkent, Chilonzor tumani, 23</p>
              <p>Toshkent, Yunusobod tumani, 12/1</p>
            </div>
            
            <div className="contact-details">
              <p className="contact-phone">8 (800) 121-20-00</p>
              <p className="contact-email">HELLO@ENERGIYA.UZ</p>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link facebook" aria-label="Facebook"></a>
              <a href="#" className="social-link telegram" aria-label="Telegram"></a>
              <a href="#" className="social-link twitter" aria-label="Twitter"></a>
            </div>
          </div>
          
          <div className="contact-form-container">
            <p className="form-title">Savol berish uchun, iltimos formani to'ldiring</p>
            
            <form className="contact-form">
              <div className="form-group">
                <input type="tel" placeholder="Telefon raqamingiz" className="form-input" />
              </div>
              
              <div className="form-group">
                <textarea placeholder="Savolingiz" className="form-textarea"></textarea>
              </div>
              
              <button type="submit" className="submit-button">Yuborish</button>
              
              <p className="privacy-policy">
                <small>Men <a href="#" className="privacy-link">Maxfiylik siyosati</a> shartlariga roziman</small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 