import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductCard from './Components/ProductCard/ProductCard';
import Header from './Pages/Header/Header'
import Main from './Pages/Main/Main'
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Checkout from './Pages/Checkout/Checkout';
import Contact from './Pages/Contact/Contact';
import DebugContact from './Pages/Contact/DebugContact';

function App() {
  
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/debug-contact" element={<DebugContact />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
