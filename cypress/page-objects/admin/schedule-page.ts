export class SchedulePage {

    navigateToSchedulePageAndVerify() {
        cy.visit(Cypress.env("schedulePage"));
        return cy.url().should("contain", "/ng/schedule");
    }

    assignButton() {
        return cy.get('button').contains("Assign");
    }

    getAllReadyToScheduleQuotes() {
        return cy.get('span').contains('[Ready to Schedule]');
    }

    fetchQuoteID() {
        return cy.get('.detail-header > .ng-star-inserted');
    }

    assignToTechDropdown() {
        return cy.get('[role="combobox"]').eq(7).should("be.visible");
    }
}

