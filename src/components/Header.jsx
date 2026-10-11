import React from 'react';

export default function Header({ onNavigate }) {
  const handleClick = (e) => {
    e.preventDefault(); // Sayfanın # olmasını ve yenilenmesini engeller
    onNavigate();
  };

  return (
    <header className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="logo">Teknolojik Yemekler</div>
          <p className="slogan-top">fırsatı kaçırma</p>
          <h1>KOD ACIKTIRIR,<br />PİZZA,<br />DOYURUR</h1>
          <button 
            type="button" 
            onClick={handleClick} 
            className="btn-primary"
            style={{ cursor: 'pointer' }}
          >
            ACIKTIM
          </button>
        </div>
      </div>
    </header>
  );
}