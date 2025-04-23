import React, { useState } from 'react';
import './ContactSection.css';
import { useLanguage } from '../../context/LanguageContext';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import { sendToTelegram, formatContactMessage } from '../../utils/telegram';

const ContactSection = () => {
  const { translate, language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    request: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
    }
    
    // Validate form fields
    if (!formData.name.trim()) {
      setErrorMessage(translate('errors.nameRequired'));
      setModalType('error');
      setShowModal(true);
      return;
    }
    
    if (!formData.phone.trim()) {
      setErrorMessage(translate('errors.phoneRequired'));
      setModalType('error');
      setShowModal(true);
      return;
    }
    
    if (!formData.request.trim()) {
      setErrorMessage(translate('errors.requestRequired'));
      setModalType('error');
      setShowModal(true);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create formatted message
      const message = formatContactMessage(formData, language);
      
      // Send to Telegram
      await sendToTelegram(message);
      
      // Show success message
      setModalType('success');
      setShowModal(true);
      
      // Reset form
      setFormData({ name: '', phone: '', request: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message || translate('errors.generalError'));
      setModalType('error');
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  return (
    <div className="contact-section-wrapper">
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <h2 className="contact-title">{translate('contact.title')}</h2>
          <p className="contact-subtitle">
            {translate('contact.subtitle')}
          </p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="contact-input"
                placeholder={translate('contact.namePlaceholder')}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                className="contact-input"
                placeholder={translate('contact.phonePlaceholder')}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                className="contact-textarea"
                placeholder={translate('contact.requestPlaceholder')}
                name="request"
                value={formData.request}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="contact-button"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? translate('contact.submitting') 
                : translate('contact.submit')}
            </button>
          </form>
        </div>
        
        <div className="illustration-elements">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
          <div className="square square-1"></div>
          <div className="square square-2"></div>
          <div className="square square-3"></div>
          <div className="triangle triangle-1"></div>
          <div className="triangle triangle-2"></div>
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>
        </div>

        {/* Use separate modal components for success and error */}
        {showModal && modalType === 'success' && <SuccessModal onClose={closeModal} />}
        {showModal && modalType === 'error' && <ErrorModal message={errorMessage} onClose={closeModal} />}
      </section>
    </div>
  );
};

export default React.memo(ContactSection); 