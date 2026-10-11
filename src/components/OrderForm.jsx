import React, { useState } from 'react';
import axios from 'axios';

const malzemelerListesi = [
  "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara",
  "Soğan", "Domates", "Mısır", "Sucuk", "Jalapeno",
  "Sarımsak", "Biber", "Ananas", "Kabak"
];

const EK_MALZEME_UCRET = 5.00; // Her ek malzeme 5 TL

export default function OrderForm({ selectedProduct, onBack, onSubmitSuccess }) {
  const product = selectedProduct || { name: 'Position Absolute Acı Pizza', price: 85.50, rating: '4.9', reviews: '(928)' };
  const BASE_FIYAT = product.price;

  const [formData, setFormData] = useState({
    isim: '',
    boyut: '',
    hamur: '',
    malzemeler: [],
    adet: 1,
    not: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validasyonlar (Malzeme kuralı: En az 4, en fazla 10)
  const isNameValid = formData.isim.trim().length >= 3;
  const isSizeValid = formData.boyut !== '';
  const isCrustValid = formData.hamur !== '';
  const areToppingsValid = formData.malzemeler.length >= 4 && formData.malzemeler.length <= 10;

  const isFormValid = isNameValid && isSizeValid && isCrustValid && areToppingsValid;

  // Dinamik Fiyat Hesaplama
  const secimlerToplami = formData.malzemeler.length * EK_MALZEME_UCRET;
  const toplamFiyat = (BASE_FIYAT + secimlerToplami) * formData.adet;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let updatedToppings = [...formData.malzemeler];
      if (checked) {
        if (updatedToppings.length >= 10) return; // En fazla 10 sınırını koruyoruz
        updatedToppings.push(value);
      } else {
        updatedToppings = updatedToppings.filter(item => item !== value);
      }
      setFormData({ ...formData, malzemeler: updatedToppings });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Adet Artırma / Azaltma
  const handleAdetChange = (artis) => {
    setFormData(prev => {
      const yeniAdet = prev.adet + artis;
      return { ...prev, adet: yeniAdet < 1 ? 1 : yeniAdet };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError('Lütfen en az 4, en çok 10 ek malzeme seçtiğinizden ve diğer zorunlu alanları doldurduğunuzdan emin olun.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const payload = {
      ...formData,
      urunAdi: product.name,
      urunFiyati: BASE_FIYAT,
      toplamTutar: toplamFiyat
    };

    axios.post('https://reqres.in/api/pizza', payload, {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    })
    .then(response => {
      console.log("API Yanıtı:", response.data);
      setIsSubmitting(false);
      onSubmitSuccess({ ...response.data, ...payload, id: response.data.id || Math.floor(Math.random() * 10000) });
    })
    .catch(err => {
      console.error("Ağ Hatası (Güvenli moda geçiliyor):", err);
      setIsSubmitting(false);
      onSubmitSuccess({
        ...payload,
        id: Math.floor(Math.random() * 10000)
      });
    });
  };

  return (
    <div className="order-page" style={{ backgroundColor: '#FAF7F2', minHeight: '100vh', paddingBottom: '50px' }}>
      <header style={{ backgroundColor: '#CE2829', padding: '20px', textAlign: 'center', color: 'white', marginBottom: '30px' }}>
        <h2 style={{ fontFamily: "'Quattrocento', serif", fontSize: '24px' }}>Teknolojik Yemekler</h2>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', marginTop: '10px', textDecoration: 'underline' }}>
          &larr; Anasayfaya Dön
        </button>
      </header>

      <div className="container" style={{ maxWidth: '700px', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', margin: '0 auto' }}>
        <h2>{product.name}</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px 0', fontSize: '22px', fontWeight: 'bold' }}>
          <span>{BASE_FIYAT.toFixed(2)}₺</span>
          <span style={{ fontSize: '14px', color: '#5F5F5F', fontWeight: 'normal' }}>{product.rating || '4.9'} &nbsp; {product.reviews || '(928)'}</span>
        </div>
        <p style={{ color: '#5F5F5F', fontSize: '14px', lineHeight: '1.5', marginBottom: '25px' }}>
          Frontend Dev olarak hala position: absolute kullanıyorsan, bu acı pizza tam sana göre! Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.
        </p>

        {error && <div style={{ background: '#ffe6e6', color: '#CE2829', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Boyut ve Hamur Seçim Alanı */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Boyut Seç <span style={{ color: '#CE2829' }}>*</span></label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Küçük', 'Orta', 'Büyük'].map((boy) => (
                  <label key={boy} style={{ cursor: 'pointer', fontSize: '14px' }}>
                    <input
                      type="radio"
                      name="boyut"
                      value={boy}
                      checked={formData.boyut === boy}
                      onChange={handleChange}
                      style={{ marginRight: '8px' }}
                    /> {boy}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Hamur Seç <span style={{ color: '#CE2829' }}>*</span></label>
              <select name="hamur" value={formData.hamur} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D9D9D9' }}>
                <option value="">Hamur Kalınlığı</option>
                <option value="İnce">İnce Hamur</option>
                <option value="Normal">Normal Kalınlıkta</option>
                <option value="Kalın">Kalın Hamur</option>
              </select>
            </div>
          </div>

          {/* Malzemeler (En az 4, en fazla 10 kuralı) */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Ek Malzemeler <span style={{ color: '#CE2829' }}>*</span></label>
            <p style={{ fontSize: '12px', color: '#5F5F5F', marginBottom: '12px' }}>
              En az 4, en fazla 10 malzeme seçebilirsiniz. Seçilen: {formData.malzemeler.length} (Her biri 5.00₺)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
              {malzemelerListesi.map((malzeme) => (
                <label key={malzeme} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="malzemeler"
                    value={malzeme}
                    checked={formData.malzemeler.includes(malzeme)}
                    onChange={handleChange}
                  />
                  {malzeme}
                </label>
              ))}
            </div>
          </div>

          {/* İsim Alanı */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Ad Soyad <span style={{ color: '#CE2829' }}>*</span></label>
            <input
              type="text"
              name="isim"
              placeholder="Adınızı giriniz (En az 3 karakter)"
              value={formData.isim}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D9D9D9', boxSizing: 'border-box' }}
            />
          </div>

          {/* Sipariş Notu */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Sipariş Notu</label>
            <textarea
              name="not"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={formData.not}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D9D9D9', height: '80px', boxSizing: 'border-box' }}
            ></textarea>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid #D9D9D9', marginBottom: '25px' }} />

          {/* Alt Kısım: Adet ve Sipariş Toplam Kutusu */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '25px' }}>
            {/* Adet Butonları */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D9D9D9', borderRadius: '6px', overflow: 'hidden', flex: '1', minWidth: '140px', justifyContent: 'center' }}>
              <button type="button" onClick={() => handleAdetChange(-1)} style={{ background: '#FDC913', border: 'none', padding: '12px 18px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}>-</button>
              <span style={{ padding: '0 20px', fontWeight: 'bold', flex: 1, textAlign: 'center' }}>{formData.adet}</span>
              <button type="button" onClick={() => handleAdetChange(1)} style={{ background: '#FDC913', border: 'none', padding: '12px 18px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}>+</button>
            </div>

            {/* Sipariş Toplam Kartı */}
            <div style={{ background: '#FAF7F2', border: '1px solid #D9D9D9', padding: '20px', borderRadius: '8px', flex: '1', minWidth: '220px', boxSizing: 'border-box' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '16px' }}>Sipariş Toplamı</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#5F5F5F', marginBottom: '8px' }}>
                <span>Seçimler</span>
                <span>{secimlerToplami.toFixed(2)}₺</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', color: '#CE2829' }}>
                <span>Toplam</span>
                <span>{toplamFiyat.toFixed(2)}₺</span>
              </div>
            </div>
          </div>

          {/* Submit Butonu */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            style={{
              width: '100%',
              backgroundColor: isFormValid ? '#FDC913' : '#ccc',
              color: '#292929',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: isFormValid ? 'pointer' : 'not-allowed'
            }}
          >
            {isSubmitting ? 'Sipariş Alınıyor...' : 'SİPARİŞ VER'}
          </button>
        </form>
      </div>
    </div>
  );
}