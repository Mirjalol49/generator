import React, { useState } from 'react';
import CartModal from './CartModal';
import heroImage from '../../assets/Images/product1.png';

const CartModalDemo = () => {
  const [showModal, setShowModal] = useState(false);
  
  // Sample product data
  const product = {
    id: 1,
    title: 'HK220DG21',
    price: 3200000,
    image: heroImage,
    quantity: 4
  };
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Cart Modal Demo</h2>
      <button 
        onClick={() => setShowModal(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          margin: '20px 0'
        }}
      >
        Show Cart Modal
      </button>
      
      <CartModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        quantity={4}
      />
    </div>
  );
};

export default CartModalDemo; 