import React from 'react';

export default function Success({ orderData, onBack }) {
  const productName = orderData?.urunAdi || orderData?.name || 'Position Absolute Acı Pizza';

  return (
    <div style={{ backgroundColor: '#CE2829', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '40px 20px', textAlign: 'center', boxSizing: 'border-box' }}>
      
      {/* Üst Kısım: Logo */}
      <div style={{ width: '100%' }}>
        <h2 style={{ fontFamily: "'Satisfy', cursive", fontSize: '28px', color: 'white', margin: 0 }}>
          Teknolojik Yemekler
        </h2>
      </div>

      {/* Orta Kısım: Tebrikler Mesajı ve Sipariş Detayları */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', width: '100%' }}>
        <p style={{ fontFamily: "'Satisfy', cursive", fontSize: '32px', color: '#FDC913', margin: '0 0 10px 0' }}>
          lezzetin yolda
        </p>
        
        <h1 style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '42px', fontWeight: '300', letterSpacing: '2px', lineHeight: '1.2', margin: '0 0 30px 0', textTransform: 'uppercase' }}>
          TEBRİKLER!<br />SİPARİŞİNİZ ALINDI!
        </h1>

        {orderData && (
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '25px', borderRadius: '12px', width: '100%', textAlign: 'left', lineHeight: '1.8', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '10px', marginBottom: '15px', textAlign: 'center', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '22px' }}>
              {productName}
            </h3>
            <p><strong>İsim:</strong> {orderData.isim || orderData.adSoyad}</p>
            <p><strong>Boyut:</strong> {orderData.boyut}</p>
            <p><strong>Hamur:</strong> {orderData.hamur}</p>
            <p><strong>Malzemeler:</strong> {orderData.malzemeler && orderData.malzemeler.length > 0 ? orderData.malzemeler.join(', ') : 'Seçilmedi'}</p>
            <p><strong>Adet:</strong> {orderData.adet || 1}</p>
            <p><strong>Sipariş Notu:</strong> {orderData.not || orderData.siparisNotu || 'Belirtilmedi'}</p>
            {orderData.toplamTutar != null && (
              <p style={{ fontSize: '18px', color: '#FDC913', marginTop: '10px' }}>
                <strong>Toplam Tutar:</strong> {Number(orderData.toplamTutar).toFixed(2)}₺
              </p>
            )}
            {orderData.id && <p style={{ marginTop: '10px', fontSize: '12px', color: '#FDC913' }}>Sipariş ID: {orderData.id}</p>}
          </div>
        )}
      </div>

      {/* Alt Kısım: Anasayfaya Dön Butonu */}
      <div style={{ width: '100%', paddingBottom: '20px' }}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={{ background: 'transparent', color: 'white', border: '2px solid white', padding: '12px 40px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => { e.target.style.background = 'white'; e.target.style.color = '#CE2829'; }}
            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'white'; }}
          >
            Anasayfaya Dön
          </button>
        )}
      </div>

    </div>
  );
}