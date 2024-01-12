export class HubPage {

    hubsTab() {
        return cy.getDataCy('Hubs').should('be.visible');
    }

    selectRegion() {
        return cy.getDataCy('selectRegion').scrollIntoView().should('be.visible');
    }

    addHubName() {
        return cy.getDataCy('hubName').should('be.visible');
    }

    addHubNotes() {
        return cy.getDataCy('hubNotes').should('be.visible');
    }

    errorMessage() {
        return cy.getDataCy('errorMessage').contains('Hub name is required.').should('be.visible');
    }

    interceptFindHubs() {
        cy.intercept('user/findhubs').as('findHubs');
    }

}