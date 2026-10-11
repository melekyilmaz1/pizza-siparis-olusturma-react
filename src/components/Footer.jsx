import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h2 className="footer-logo-text">Teknolojik Yemekler</h2>
          <ul className="contact-info">
            <li><img src="/assets/iteration-2/footer/icons/icon-1.png" alt="" /> 341 Londonderry Road, Istanbul Türkiye</li>
            <li><img src="/assets/iteration-2/footer/icons/icon-2.png" alt="" /> aciktim@teknolojikyemekler.com</li>
            <li><img src="/assets/iteration-2/footer/icons/icon-3.png" alt="" /> +90 216 123 45 67</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Hot Menu</h4>
          <ul>
            <li><a href="#">Terminal Pizza</a></li>
            <li><a href="#">5 Kişilik Hackathon Pizza</a></li>
            <li><a href="#">useEffect Tavuklu Burger</a></li>
            <li><a href="#">Beyaz Console Frosty</a></li>
            <li><a href="#">Testler Geçti Mutlu Burger</a></li>
            <li><a href="#">Position Absolute Acı Burger</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Instagram</h4>
          <div className="insta-grid">
            <img src="/assets/iteration-2/footer/insta/li-0.png" alt="" />
            <img src="/assets/iteration-2/footer/insta/li-1.png" alt="" />
            <img src="/assets/iteration-2/footer/insta/li-2.png" alt="" />
            <img src="/assets/iteration-2/footer/insta/li-3.png" alt="" />
            <img src="/assets/iteration-2/footer/insta/li-4.png" alt="" />
            <img src="/assets/iteration-2/footer/insta/li-5.png" alt="" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Teknolojik Yemekler.</p>
      </div>
    </footer>
  );
}