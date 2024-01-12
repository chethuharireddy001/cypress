export class SummaryPage {

    summaryNextButton() {
        return cy.get('[data-cy=summaryNext]').wait(2000).first().should('be.visible');
    }

    summaryBackBtn() {
        return cy.get('[data-cy=summaryBack]').should('be.visible');
    }

    verifySummaryPage() {
        return cy.url().should('include', '/book#summary');
    }

    bookAppointmentBtn() {
        return cy.get('[data-cy=confirmBookAppointment]').should('be.visible');
    }

    addServicesSummaryBtn() {
        return cy.get('[data-cy=addAdditionalServicesSummaryButton]').should('be.visible');
    }

    summaryBundleAndSave() {
       // return cy.get('app-summary-add-ons.color-gray > .margin-bottom-10 > :nth-child(1) > .row > .col-xs-9 > [data-cy=cart_add_ons_checkbox]').should('be.visible');
       return cy.get('[data-cy=cart_add_ons_checkbox]').should('be.visible');
    }

    loactionEdit() {
        return cy.get('[data-cy=editLocationIcon]').should('be.visible');
    }

    timeEdit() {
        return cy.get('[data-cy=editTimeIcon]').should('be.visible');
    }

    paymentEdit() {
        return cy.get('[data-cy=editPaymentIcon]').should('be.visible');
    }

    saveButton(){
        return cy.get('[data-cy=saveButton]').should('be.visible');
    }

    vehicleEdit() {
        return cy.get('[data-cy=editVehicleIcon]').should('be.visible');
    }

}