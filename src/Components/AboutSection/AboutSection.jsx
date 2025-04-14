import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="section-title">Biz Haqimizda</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="about-content">
          <div className="about-image-container">
            <div className="about-image-frame">
              <img src="/src/assets/images/about-image.jpg" alt="Bizning jamoa" className="about-image" />
              <div className="image-dots"></div>
            </div>
          </div>
          
          <div className="about-text">
            <h3 className="about-subtitle">Kim biz?</h3>
            <p className="about-description">
              Biz energiya yechimlari sohasida 20 yildan ortiq tajribaga ega bo'lgan professional jamoamiz. 
              Bizning maqsadimiz mijozlarimizga ishonchli va samarali energiya yechimlarini taqdim etish.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Yillik Tajriba</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Muvaffaqiyatli Loyihalar</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Mijozlar Ishonchi</span>
              </div>
            </div>
            
            <button className="about-button">Ko'proq Ma'lumot</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 