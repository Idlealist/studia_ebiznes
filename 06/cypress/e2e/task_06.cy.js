describe('Task_06 E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/produkty');
  });

  it('01 - Renders products', () => {
    cy.contains('Produkty');
    cy.get('button').should('have.length.at.least', 3);
  });

  it('02 - Adds a product to cart', () => {
    cy.get('button').first().click();
    cy.get('nav').contains('Koszyk').click();
    cy.contains('Laptop');
  });

  it('03 - Displays multiple items in cart', () => {
    cy.get('button').eq(0).click().click();
    cy.get('button').eq(1).click();
    cy.get('nav').contains('Koszyk').click();
    cy.contains('Laptop - 4999.99 zł x 2');
    cy.contains('TV - 2999.99 zł x 1');
  });

  it('04 - Checkout button disabled when cart empty', () => {
    cy.get('nav').contains('Koszyk').click();
    cy.get('button').contains('Przejdź do płatności').should('be.disabled');
  });

  it('05 - Checkout button enabled with items', () => {
    cy.get('button').first().click();
    cy.get('nav').contains('Koszyk').click();
    cy.get('button').contains('Przejdź do płatności').should('not.be.disabled');
  });

  it('06 - Navigates to checkout', () => {
    cy.get('button').first().click();
    cy.get('nav').contains('Koszyk').click();
    cy.get('button').contains('Przejdź do płatności').click();
    cy.url().should('include', '/platnosci');
    cy.contains('Suma');
  });

  it('07 - Correct total sum in checkout', () => {
    cy.get('button').eq(0).click();
    cy.get('button').eq(1).click();
    cy.get('nav').contains('Płatności').click();
    cy.contains('Suma: 7999.98 zł');
  });

  it('08 - Clears cart on payment', () => {
    cy.get('button').first().click();
    cy.get('nav').contains('Płatności').click();
    cy.get('button').contains('Zapłać teraz').click();
    cy.on('window:alert', (msg) => {
      expect(msg).to.include('Płatność zakończona');
    });
    cy.get('nav').contains('Koszyk').click();
    cy.contains('Koszyk jest pusty');
  });

  it('09 - Handles empty product list (backend down)', () => {
    cy.intercept('GET', '**/products', { statusCode: 500 }).as('getProductsError');
    cy.reload();
    cy.wait('@getProductsError');
  });

  it('10 - Handles checkout error gracefully', () => {
    cy.get('button').first().click();
    cy.intercept('POST', '**/checkout', { statusCode: 500 }).as('postCheckoutError');
    cy.get('nav').contains('Płatności').click();
    cy.get('button').contains('Zapłać teraz').click();
    cy.wait('@postCheckoutError');
  });

  it('11 - Navigation links work', () => {
    cy.get('nav').contains('Koszyk').click();
    cy.url().should('include', '/koszyk');
    cy.get('nav').contains('Płatności').click();
    cy.url().should('include', '/platnosci');
    cy.get('nav').contains('Produkty').click();
    cy.url().should('include', '/produkty');
  });

  it('12 - Cart count increases', () => {
    cy.get('button').first().click().click();
    cy.get('nav').contains('Koszyk').click();
    cy.contains('x 2');
  });

  it('13 - Total updates with quantity', () => {
    cy.get('button').eq(0).click().click();
    cy.get('nav').contains('Płatności').click();
    cy.contains('Suma: 9999.98 zł');
  });

  it('14 - Adds all products', () => {
    cy.get('button').each(btn => cy.wrap(btn).click());
    cy.get('nav').contains('Koszyk').click();
    cy.contains('Smartwatch');
  });

  it('15 - Cart works on page reload', () => {
    cy.get('button').first().click();
    cy.reload();
    cy.get('nav').contains('Koszyk').click();
    cy.contains('Laptop');
  });

  it('16 - Button adds correct product', () => {
    cy.get('button').eq(2).click();
    cy.get('nav').contains('Koszyk').click();
    cy.contains('Smartwatch');
  });

  it('17 - Empty cart shows proper message', () => {
    cy.get('nav').contains('Koszyk').click();
    cy.contains('Koszyk jest pusty');
  });

  it('18 - Disable payment button if cart is empty', () => {
    cy.get('nav').contains('Płatności').click();
    cy.get('button').should('be.disabled');
  });

  it('19 - Reload product page shows product list', () => {
    cy.reload();
    cy.contains('Produkty');
  });

  it('20 - Proper formatting of prices', () => {
    cy.contains('4999.99 zł');
    cy.contains('2999.99 zł');
    cy.contains('699.99 zł');
  });
});
