var randomstring = require("randomstring");

describe("etsy.com", () => {
    beforeEach(() => {
        cy.visit("https://www.etsy.com/");
    });
    it("1. New user registration", () => {
        cy.get('.select-signin').click()
        cy.get('.select-register').click()
        var email = randomstring.generate(Cypress.moment())+"@gmail.com"
        var username = randomstring.generate(Cypress.moment()).replace(/[0-9]/g, '')
        var password = randomstring.generate(Cypress.moment())
        cy.get('[id="join_neu_email_field"]').type(email)
        cy.get('[id="join_neu_first_name_field"]').type(username)
        cy.get('[id="join_neu_password_field"]').type(password)
        cy.get('[value="register"]').eq(1).click()
        cy.contains('Welcome back').should('contain.text', username)
    });
    it("2. All Three Fields are Manditory", () => {
        cy.get('.select-signin').click()
        cy.get('.select-register').click()
        cy.get('[value="register"]').eq(1).click()
        cy.get('[id="aria-join_neu_email_field-error"]').should('be.visible')
        cy.get('[id="aria-join_neu_first_name_field-error"]').should('be.visible')
        cy.get('[id="aria-join_neu_password_field-error"]').should('be.visible')
    });
    it("3. Multiple Users Login", () => {   
        for (var i = 0; i < 5; i++) {
            cy.get('.select-signin').click()
            cy.get('.select-register').click()
            var email = randomstring.generate(Cypress.moment())+"@gmail.com"
            var username = randomstring.generate(Cypress.moment()).replace(/[0-9]/g, '')
            var password = randomstring.generate(Cypress.moment())
            cy.get('[id="join_neu_email_field"]').type(email)
            cy.get('[id="join_neu_first_name_field"]').type(username)
            cy.get('[id="join_neu_password_field"]').type(password)
            cy.get('[value="register"]').eq(1).click()
            cy.contains('Welcome back').should('contain.text', username)
            cy.get('.user-nav').click()
            cy.get('.sign-out').click()
        }
    });
    it("4. Failed Login Attempt", () => {   
        cy.get('.select-signin').click()
        cy.get('[id="join_neu_email_field"]').type('user 1')
        cy.get('[id="join_neu_password_field"]').type('password')
        cy.get('[name="submit_attempt"]').click()
        cy.get('[id="aria-join_neu_email_field-error"]').should('be.visible')
    });
    it("5. Cart Verification", () => {   
        cy.get('[id="catnav-primary-link-10855"]').click()
        cy.visit('https://www.etsy.com/listing/192743606/yoga-running-headband-wild-abandon-print?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=&ref=sr_gallery-1-9&bes=1&col=1')
        cy.contains('Add to basket').click()
        cy.get('.listing-title text-gray break-word').should('contain.text', 'Yoga Running Headband - Wild Abandon Print - Workout Headband - Fitness Wide Nonslip Headband')
    });
  });