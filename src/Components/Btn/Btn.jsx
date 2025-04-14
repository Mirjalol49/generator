import React, { useState } from 'react';
import './Btn.css';

const SubscribeButton = () => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => setPressed(true);
  const handleRelease = () => setPressed(false);
  
  return (
    <button
      className={`subscribe-button ${pressed ? 'pressed' : ''}`}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      <span className="gloss-layer" />
      <span className="button-text">Subscribe!</span>
    </button>
  );
};

export default SubscribeButton;