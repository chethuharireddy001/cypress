export class ContactPage {
    verifyContactPage() {
        cy.url().should('include', '/newuser#create_account');
    }
    verifyDanContactPage() {
        cy.url().should('include', 'lm-user#create_account');
    }
    
    fillContactDetails(data) {
        cy.get('[data-cy=firstName]').type(data.firstName);
        cy.get('[data-cy=lastName]').type(data.lastName);
        cy.typeNewUserEmail('[data-cy=accountEmail]');
        cy.get('[data-cy="phoneNumber"]').first().should('be.visible').type(data.phoneNumber);
    }
    danTextField(){
        return cy.get('[data-cy="externalId"]').should('be.visible');
    }
}