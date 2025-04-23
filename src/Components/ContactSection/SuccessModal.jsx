import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const SuccessModal = ({ onClose }) => {
  const { translate } = useLanguage();
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
            <circle cx="12" cy="12" r="11" fill="#4CAF50"/>
            <path fill="#FFFFFF" d="M9.707 14.293l-2-2a1 1 0 1 0-1.414 1.414l3 3a.997.997 0 0 0 1.414 0l7-7a1 1 0 1 0-1.414-1.414L9.707 14.293z"/>
          </svg>
        </div>
        <h3>{translate('contact.modalSuccessTitle')}</h3>
        <p>{translate('contact.modalSuccessMessage')}</p>
        <button onClick={onClose}>{translate('contact.modalCloseButton')}</button>
      </div>
    </div>
  );
};

export default SuccessModal; 