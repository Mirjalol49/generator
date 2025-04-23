import React, { memo, useCallback } from 'react'
import './HeroSection.css'
import { useLanguage } from '../../context/LanguageContext'

// Import the image directly with correct case
import heroImage from '../../assets/Images/product1.png'

const HeroSection = memo(() => {
  const { translate } = useLanguage();
  
  // Smooth scroll to products section
  const scrollToProducts = useCallback(() => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);
  
  return (
    <section className='hero-section'>
      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1 className='hero-title'>{translate('home.welcome')}</h1>
            <p className='hero-description'>{translate('home.description')}</p>
            <button 
              className='hero-button' 
              onClick={scrollToProducts}
              aria-label={translate('common.viewProducts')}
            >
              {translate('common.viewProducts')}
            </button>
          </div>
          <img 
            src={heroImage} 
            alt={translate('heroImageAlt')} 
            width="400"
            height="400"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
