import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import OrderForm from './components/OrderForm';
import Success from './components/Success';
import Footer from './components/Footer';

const DEFAULT_PRODUCT = {
  id: 'aci-pizza',
  name: 'Position Absolute Acı Pizza',
  price: 85.50,
  rating: '4.9',
  reviews: '(928)',
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(DEFAULT_PRODUCT);
  const [orderResponse, setOrderResponse] = useState(null);

  const handleNavigate = (product) => {
    console.log("Navigasyon tetiklendi:", product);
    setSelectedProduct(product || DEFAULT_PRODUCT);
    setActivePage('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {activePage === 'home' && (
        <>
          <Header onNavigate={() => handleNavigate(DEFAULT_PRODUCT)} />
          <Home onNavigate={handleNavigate} />
          <Footer />
        </>
      )}

      {activePage === 'order' && (
        <OrderForm
          selectedProduct={selectedProduct}
          onBack={() => setActivePage('home')}
          onSubmitSuccess={(data) => {
            setOrderResponse(data);
            setActivePage('success');
          }}
        />
      )}

      {activePage === 'success' && (
        <Success orderData={orderResponse} onBack={() => setActivePage('home')} />
      )}
    </div>
  );
}