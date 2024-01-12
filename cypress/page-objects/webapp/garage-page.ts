export class GaragePage {

    navigateToGaragePageAndVerify() {
        cy.visit('/garage').url().should('include', '/garage');
    }

    verifyGaragePage(){
      cy.url().should('include', '/garage');
    }

    pastJobsSegment() {
        return cy.get('app-vehicle-expansion-list .mat-expansion-panel').first().should('be.visible');
    }

    pastJobsTxt() {
        return cy.get('.mat-tab-label').should('be.visible');
    }

    expandjob() {
        return cy.get('app-job .mat-expansion-panel').should('be.visible');
    }

    clickOnJob() {
        return cy.get('app-job .mat-expansion-panel .mat-expansion-panel-header').should('be.visible');
    }

    jobReceiptButton() {
        return cy.get('[data-cy=jobReceiptButton]').should('be.visible');
    }

    VehicleDropdown() {
        return cy.get('#mat-expansion-panel-header-0 > .mat-expansion-indicator').should('be.visible');
    }

    pastJobs() {
        return cy.get("#mat-tab-label-0-1").should('be.visible');
    }

    noServiceReportText() {
        return cy.get('.quote-header-4').should('be.visible');
    }

    txnTotal() {
        cy.get('[data-cy=txnTotal]').should('be.visible');
    }
    
    deleteVehicle() {
       return cy.get('[data-cy=deleteVehicle]').should('be.visible');
    }

    addLabel(){
        return cy.get('[data-cy=addLabel]').should('be.visible');
    }
    saveLabelButton() {
        return cy.get('[data-cy=saveLabel]').should('be.visible');
    }

    confirmbutton(){
        return cy.get('[data-cy="warningOk"]').should('be.visible');
    }

    labelTxtField() {
        return cy.get('[data-cy=labelVehicle]').should('be.visible');
    }

    vehicleText() {
        return cy.get('[data-cy=vehicleLabelText]').should('be.visible');
    }

    warningCancel() {
       return  cy.get('[data-cy=warningCancel]').should('be.visible');
    }

    warningConfirm() {
        return cy.get('[data-cy=warningOk]').should('be.visible');
    }

    dropdown() {
        return cy.get('.mat-expansion-indicator').should('be.visible');
    }

    garageDropdown() {
        return cy.get('.vertical-align-center').should('be.visible');
    }

    garageWarningConfirmBtn() {
        return cy.get('[data-cy=warningOk]').should('be.visible');
    }

    navigateToGaragePage() {
        //cy.visit("/garage");
        cy.get('.mat-menu-content').contains('Garage').should('be.visible').click();
         return cy.url().should('include', '/garage');
     }
     
     addVehicleButton(){
        return cy.get('[data-cy="addVehicleButton"]').should('be.visible');
    }
}