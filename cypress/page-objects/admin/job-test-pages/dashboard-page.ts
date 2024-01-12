export class DashboardPage {

    quickActionButton() {
        return cy.get('[id="quick-action"]');
    }

    commandLine() {
        return cy.getDataCy('commandLine');
    }

    findUserPhoneInput() {
        return cy.getDataCy('findUserPhone');
    }

    findUserFirstNameInput() {
        return cy.getDataCy('findUserFirstName');
    }

    findUserLastNameInput() {
        return cy.getDataCy('findUserLastName');
    }

    interceptFindProviders() {
        cy.intercept('admin/findproviders').as('findProviders');
    }

    searchButton() {
        return cy.getDataCy('searchButton');
    }

    createJobButton() {
        return cy.getDataCy('createJob');
    }

    navigateToDashboard() {
        cy.visit('/#/home');
    }
}