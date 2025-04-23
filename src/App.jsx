import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './Pages/Header/Header';
import Main from './Pages/Main/Main';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Checkout from './Pages/Checkout/Checkout';
import Contact from './Pages/Contact/Contact';

function App() {
  // Add smooth scroll behavior and handle responsiveness
  useEffect(() => {
    // Force repaint to fix any flickering
    window.addEventListener('scroll', () => {
      // This empty handler is intentional - it encourages the browser to optimize scrolling
    }, { passive: true });
    
    // Handle resizing for responsive layouts
    const handleResize = () => {
      // Update CSS variables for viewport height to handle mobile address bar
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    // Initial call
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', () => {});
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <div className="App smooth-scroll-container">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
