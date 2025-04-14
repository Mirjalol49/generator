import React from 'react'
import './HeroSection.css'
const HeroSection = () => {
  return (
    <section className='hero-section'>
      <div className="hero-content">
        <h1 className='hero-title'>Ishonchli <span>Energiya </span>Yechimlari</h1>
        <p className='hero-description'>20 yildan ortiq vaqt davomida sohalar tomonidan ishonchga sazovor bo‘lgan - eng muhim paytda to‘xtovsiz quvvat, samaradorlik va chidamlilikni ta’minlaydi.</p>
        <button className='hero-button'>Mahsulotlarni Ko'rish</button>
      </div>
    </section>
  )
}

export default HeroSection
