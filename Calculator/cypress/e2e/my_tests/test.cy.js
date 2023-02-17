describe('Feedback Form', () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (err, runnable) => {return false;})
        cy.visit("/reviews");
    });

    it('displays error messages when submitting invalid form', () => {
        cy.get('button').click();
        cy.contains('Name is required.');
        cy.contains('Email is invalid.');
        cy.contains('Message is required.');

        cy.get('#Name:').type('Ingrd');
        cy.get('#Mail:').type('notvalid');
        cy.get('#explain:').type('Test message');
        cy.get('button').click();

        cy.contains('Email is invalid.');
        cy.contains('Name is required.').should('not.exist');
        cy.contains('Message is required.').should('not.exist');
    });

    it('clears form and displays success message when submitting valid form', () => {
        cy.get('#name').type('Charlotte');
        cy.get('#mail').type('Charlotte@gmail.com');
        cy.get('#review').type('Test message');
        cy.get('button').click();

        cy.contains('Form submitted successfully.');
        cy.contains('Thank you, Charlotte, for your feedback: "Test message".');
        cy.get('#name').should('have.value', '');
        cy.get('#mail').should('have.value', '');
        cy.get('#message').should('have.value', '');
    });
});