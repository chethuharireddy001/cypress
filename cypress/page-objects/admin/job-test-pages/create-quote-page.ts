export class CreateQuotePage {

    addServiceButton() {
        return cy.getDataCy('addService').contains('Add Service');
    }

    selectService() {
        return cy.getDataCy('addServicesInput0').should('be.visible');
    }

    addServicesPopUpBtn() {
        return cy.getDataCy('addServicesButton').should('be.visible');
    }

    quoteStatusLabel() {
        return cy.getDataCy('quoteStatusLabel').should('be.visible');
    }
}