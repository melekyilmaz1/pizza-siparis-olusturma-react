describe('Teknolojik Yemekler - Kapsamlı Pizza Sipariş Testleri', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:5173');
      cy.get('button.btn-secondary, .campaign-card button').first().click();
    });
  
    it('1. Ad Soyad inputuna geçerli bir metin girmelidir', () => {
      cy.get('input[name="isim"]')
        .type('Melek Yılmaz')
        .should('have.value', 'Melek Yılmaz');
    });
  
    it('2. Ad Soyad girilmezse butonun pasif kaldığını test eder', () => {
      cy.get('input[name="boyut"][value="Küçük"]').check({ force: true });
      cy.get('select[name="hamur"]').select('İnce');
      
      cy.get('input[name="malzemeler"]').check('Pepperoni', { force: true });
      cy.get('input[name="malzemeler"]').check('Sosis', { force: true });
      cy.get('input[name="malzemeler"]').check('Mısır', { force: true });
      cy.get('input[name="malzemeler"]').check('Domates', { force: true });
  
      cy.get('input[name="isim"]').should('have.value', '');
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
    it('3. 10 taneden fazla malzeme seçilemediğini test eder', () => {
      const tumMalzemeler = [
        "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara",
        "Soğan", "Domates", "Mısır", "Sucuk", "Jalapeno",
        "Sarımsak", "Biber", "Ananas", "Kabak"
      ];
  
      tumMalzemeler.forEach((malzeme) => {
        cy.get('input[name="malzemeler"]').check(malzeme, { force: true });
      });
  
      cy.get('input[name="malzemeler"]:checked').should('have.length.at.most', 10);
    });
  
    it('4. Formu doldurup başarıyla gönderen test', () => {
        cy.intercept('POST', 'https://reqres.in/api/pizza', {
          statusCode: 200,
          body: { id: 9291, message: 'Başarılı' }
        }).as('siparisGonder');
    
        cy.get('input[name="boyut"][value="Küçük"]').check({ force: true });
        cy.get('select[name="hamur"]').select('İnce');
    
        cy.get('input[name="malzemeler"]').check('Pepperoni', { force: true });
        cy.get('input[name="malzemeler"]').check('Sosis', { force: true });
        cy.get('input[name="malzemeler"]').check('Mısır', { force: true });
        cy.get('input[name="malzemeler"]').check('Domates', { force: true });
    
        cy.get('input[name="isim"]').type('Melek Yılmaz');
    
        cy.get('button[type="submit"]')
          .should('not.be.disabled')
          .click();
    
        cy.wait('@siparisGonder');
        cy.contains('SİPARİŞİNİZ ALINDI!', { timeout: 10000 }).should('be.visible');
      });
  
  });