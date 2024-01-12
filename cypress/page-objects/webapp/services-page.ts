export class ServicesPage {
    
    selectYourVehicleTitle() {
        return cy.get("span[class='title-header']").should('be.visible').should("contain", "Select Your Vehicle");
    }
    dontSeeServicesINeedOption() {
        return cy.get('[data-cy="I don\'t see the services I need-leftCheckboxDisplayName"]').should('be.visible');
    }
    servicesNotestWIthThrottleInput(servicesNotes) {
        return cy.throttleTypeInput('[data-cy=servicesNotes]', servicesNotes);
    }
    verifyFleetDashboardPage() {
        return cy.url().should('include', '/fleet/dashboard');
    }
    addOnsNextButton() {
        cy.avgWait();
        return cy.get('[data-cy=add_onsNext]').should('be.visible');
    }
    selectServicesFromList(serviceName) {
        return cy.get(`[data-cy='${serviceName}']`).scrollIntoView().should('be.visible');
    }
    servicesIDontKnow() {
        cy.avgWait();
        return cy.get('[data-cy=servicesIDontKnow]').should('be.visible');
    }
    selectService(serviceName) {
        return cy.get(`[data-cy='${serviceName}']`).should('be.visible');
    }
    serviceModalPopUpPriceSpinner() {
        return cy.get('[data-cy=spinnerDiv]').should('not.be.visible');
        // > app-wrench-spinner > .mat-spinner > svg > .ng-star-inserted
    }
    servicesNotesButton() {
        return cy.get('[data-cy=servicesNotes]').should('be.visible');
    }
    serviceNextButton() {
        return cy.get('[data-cy="servicesNext"]').should('be.visible').should('be.enabled');
    }
    selectServicePopUpButton() {
        return cy.get('.mat-button-wrapper').contains('Select service').should('be.visible')
    }
    navigateToVehiclePageAndVerify() {
        cy.minWait();
        cy.visit('/book#vehicle');
        cy.url().should('include', 'book#vehicle');
    }
    verifyBookServicesPage() {
        return cy.url().should('include', '/book#services');
    } 
    newUserServicePageVerification() {
        return cy.url().should('include', '/newuser#services');
    }
    navigateToFleetPageAndVerify() {
        cy.visit("/fleet");
        cy.url().should('include', '/fleet');
    }
    verifyBookVehiclePage() {
        cy.url().should('include', 'book/fleet');
    }
    mileageEdit() {
        return cy.get('.mileage-update').should('be.visible');
    }
    typeMileage() {
        return cy.get('[data-cy=vehicle-mileage]').should('be.visible').clear().type("35000");
    }

    diagnosticWizardInformationTextField() {
        return cy.get('[data-cy=diagWizardNotes]').should('be.visible');
    }
    addToCartButton() {
        return cy.get('[data-cy=diagWizardFinish]').should('be.visible');
    }
    selectDaignosticYes() {
        // return cy.get('[data-cy="diag_wizard_answer_Yes"]').should('be.visible');
        return cy.get('[data-cy="diagWizard"]').contains('Yes').should('be.visible');
    }
    selectDiagnosticInputForm() {
        return cy.get('[data-cy="diagWizard"]').contains('Vehicle Doesn’t Start Properly').should('be.visible');
        // return cy.get('[data-cy="diag_wizard_category_Vehicle Doesn’t Start Properly"] > :nth-child(1)').should('be.visible');
    }
    selectDaignosticIgnition() {
        // return cy.get('[data-cy="diag_wizard_answer_Key won\'t turn in ignition"]').should('be.visible');
        return cy.get('[data-cy="diagWizard"]').contains('Key won\'t turn in ignition').should('be.visible');
    }
    addServicesLink() {
        return cy.get('#addServicesLink').should("be.visible");
    }
    maintenanceInterval() {
        cy.get('[data-cy=maintenanceInterval]').click();
        cy.get('.mat-option').contains('5000').click();
    }
    servicesNextButton() {
        return cy.get('[data-cy=servicesNext]').should('be.visible').should('be.enabled');
    }
}
