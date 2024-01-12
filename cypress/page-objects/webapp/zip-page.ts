export class ZipPage {

    navigateToZipPage() {
        cy.visit('/book/newuser#zip');
    }

    navigateToAccountPage() {
        cy.visit('/account');
    }

    navigateToZipPageAndVerify() {
        cy.visit('/book/newuser#zip');
        cy.url().should('include', '/newuser#zip');
    }

    zipCodeTxtField() {
        return cy.get('[data-cy=zipCode]').should('be.visible');
    }

    zipCodeNextButton() {
        cy.wait(1000);
        return cy.get('[data-cy=zipNext]').should('be.visible');
    }
    navigateToDanZipPageAndVerify(link) {
        cy.visit(link);
        cy.url().should('include', 'book/lm-user#vehicle');
    }
}