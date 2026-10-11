import React from 'react';

const PRODUCTS = {
  aci: { id: 'aci-pizza', name: 'Position Absolute Acı Pizza', price: 85.50, rating: '4.9', reviews: '(928)' },
  terminal: { id: 'terminal-pizza', name: 'Terminal Pizza', price: 60.00, rating: '4.9', reviews: '(200)' },
  tavuklu: { id: 'tavuklu-burger', name: 'useEffect Tavuklu Burger', price: 75.00, rating: '4.9', reviews: '(462)' },
  default: { id: 'aci-pizza', name: 'Position Absolute Acı Pizza', price: 85.50, rating: '4.9', reviews: '(928)' },
};

export default function Home({ onNavigate }) {
  const handleClick = (e, product) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onNavigate(product);
  };

  return (
    <main>
      <nav className="top-nav">
        <div className="container nav-container">
          <div className="nav-item">YENİ! Kore</div>
          <div className="nav-item">Pizza</div>
          <div className="nav-item">Burger</div>
          <div className="nav-item">French Fries</div>
          <div className="nav-item">Fast Food</div>
          <div className="nav-item">Soft Drinks</div>
        </div>
      </nav>

      <section className="campaigns-section">
        <div className="container campaigns-grid">
          <div className="campaign-card large-card" onClick={(e) => handleClick(e, PRODUCTS.default)} style={{ cursor: 'pointer' }}>
            <div className="card-text">
              <h2>Özel<br />Lezzetus</h2>
              <p>Position:Absolute Acı Burger</p>
              <button type="button" onClick={(e) => handleClick(e, PRODUCTS.default)} className="btn-secondary" style={{ cursor: 'pointer', zIndex: 5, position: 'relative' }}>SİPARİŞ VER</button>
            </div>
          </div>
          <div className="campaign-right-column">
            <div className="campaign-card small-card-1" onClick={(e) => handleClick(e, PRODUCTS.default)} style={{ cursor: 'pointer' }}>
              <div className="card-text">
                <h3>Hackathon<br />Burger Menü</h3>
                <button type="button" onClick={(e) => handleClick(e, PRODUCTS.default)} className="btn-secondary" style={{ cursor: 'pointer', zIndex: 5, position: 'relative' }}>SİPARİŞ VER</button>
              </div>
            </div>
            <div className="campaign-card small-card-2" onClick={(e) => handleClick(e, PRODUCTS.default)} style={{ cursor: 'pointer' }}>
              <div className="card-text">
                <h3><span className="highlight-red">Çoooook</span> hızlı<br />npm gibi kurye</h3>
                <button type="button" onClick={(e) => handleClick(e, PRODUCTS.default)} className="btn-secondary" style={{ cursor: 'pointer', zIndex: 5, position: 'relative' }}>SİPARİŞ VER</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-section" id="menu">
        <div className="container">
          <p className="section-subtitle">en çok paketlenen menüler</p>
          <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>

          <div className="food-grid">
            <div className="food-card" onClick={(e) => handleClick(e, PRODUCTS.terminal)} style={{ cursor: 'pointer' }}>
              <h3>Terminal Pizza</h3>
              <div className="food-details">
                <span>4.9</span> <span>(200)</span> <span className="food-price">60.00₺</span>
              </div>
            </div>
            <div className="food-card" onClick={(e) => handleClick(e, PRODUCTS.aci)} style={{ cursor: 'pointer' }}>
              <h3>Position Absolute Acı Pizza</h3>
              <div className="food-details">
                <span>4.9</span> <span>(928)</span> <span className="food-price">85.50₺</span>
              </div>
            </div>
            <div className="food-card" onClick={(e) => handleClick(e, PRODUCTS.tavuklu)} style={{ cursor: 'pointer' }}>
              <h3>useEffect Tavuklu Burger</h3>
              <div className="food-details">
                <span>4.9</span> <span>(462)</span> <span className="food-price">75.00₺</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}