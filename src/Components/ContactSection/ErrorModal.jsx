import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ErrorModal = ({ message, onClose }) => {
  const { translate } = useLanguage();
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
            <circle cx="12" cy="12" r="11" fill="#F44336"/>
            <path fill="#FFFFFF" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42.97.97 0 0 0 1.42 0l4.29-4.3 4.29 4.3a.97.97 0 0 0 1.42 0 1 1 0 0 0 0-1.42L13.41 12z"/>
          </svg>
        </div>
        <h3>{translate('contact.modalErrorTitle')}</h3>
        <p>{message || translate('contact.modalErrorMessage')}</p>
        <button onClick={onClose} className="error-button">{translate('contact.modalCloseButton')}</button>
      </div>
    </div>
  );
};

export default ErrorModal; 