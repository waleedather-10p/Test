describe("etsy.com", () => {
    it("sign in button", () => {
        cy.visit("https://www.etsy.com/");
        cy.get('.select-signin').click()
    });
    it("2. All Three Fields are Manditory", () => {
        cy.visit("https://www.etsy.com/");
        cy.get('.select-signin').click()
        cy.get('.select-register').click()
        cy.get('[value="register"]').eq(1).click()
        cy.get('#aria-join_neu_email_field-error').should('be.visible')
        cy.get('#aria-join_neu_first_name_field-error').should('be.visible')
        cy.get('#aria-join_neu_password_field-error').should('be.visible')
    });
    it("4. Failed Login Attempt", () => {
        cy.visit("https://www.etsy.com/");
        cy.get('.select-signin').click()
        cy.get('#join_neu_email_field').type('user 1')
        cy.get('#join_neu_password_field').type('password')
        cy.get('[name="submit_attempt"]').click()
        cy.get('#aria-join_neu_email_field-error').should('be.visible')
    });
  });