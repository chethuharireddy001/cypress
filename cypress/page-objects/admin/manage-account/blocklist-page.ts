export class BlocklistPage {

    blockListsPage() {
        return cy.getDataCy('Blocklist').should('be.visible');
    }

    addTechField() {
        return cy.getDataCy('addTechnician').should('be.visible');
    }

    addToBlocklistButton() {
        return cy.getDataCy('addToBlocklistButton').should('be.visible');
    }

    removeTechButton() {
        return cy.getDataCy('removeButton').first().should('be.visible');
    }

    interceptGetBlocklist() {
        cy.intercept('admin/getprovideruserblacklist').as('getBlocklist');
    }

}