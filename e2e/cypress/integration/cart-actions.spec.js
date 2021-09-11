/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

  })
  
  it('Add items to cart and then purchase', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').click();
    cy.get('[data-cy=purchase-items]').click();

    cy.contains('You have successfully placed your order.') 

  })

  it('Purchase without adding item first', () => {
    cy.get('[data-cy=badge-count]').click();
    cy.get('[data-cy=purchase-items]').click();

    cy.contains("Can't place the order as there is no item in cart.") 

  })

})
