export class AccountsPage {

    navigateToApprovalLimitsPageAndVerify() {
        cy.visit('/account/approvallimits').url().should('include', '/account/approvallimits');
    }

    verifyAccountsPage(){
        cy.url().should('include', '/account');
    }

    navigateToinvoicePageandVerify(){
        cy.visit('account/invoices').url().should('include', '/account/invoices');
    }
    
    approvalLimitsTitle() {
        return cy.get('.quote-header-1').should('be.visible');
    }

    approvalQuoteOnRadioButton() {
        return cy.get('[data-cy=approvalQuoteOn]').should('be.visible');

    }
    navigateToProfilePage() {
        cy.get('.mat-menu-content').contains('Profile').should('be.visible').click();
         return cy.url().should('include', '/account');
     }
     
    addLocationAccountpage() {
        return cy.get(':nth-child(1) > [data-cy=locationInfo]').should('be.visible');
    }


    approvalQuoteOffRadioButton() {
        return cy.get('[data-cy=approvalQuoteOff]').should('be.visible');
    }

    turnOnAprroval() {
        cy.get('[data-cy="approvalQuoteOn"]').should('be.visible').click();
        cy.get('[data-cy="approvalIncreaseOn"]').should('be.visible').click();
    }

    approvalsUpdatebutton() {
        return cy.get('[data-cy=approvalsUpdate]').scrollIntoView().should('be.visible');
    }

    oldPassworrd() {
        return  cy.get('[data-cy=oldPassword]').should('be.visible');
    }

    changePassword() {
        return cy.get('[data-cy=changePassword]').should('be.visible');
    }

    passwordEntry(){
        return cy.get('[data-cy=confirmPassword]').should('be.visible');
    }

    passwordConfirm(){
        return cy.get('[data-cy=passwordConfirm]').should('be.visible');
    }
    
    phonenumber(){
        return cy.get('.mat-form-field-infix > [data-cy="phoneNumber"]').should('be.visible');
    }

    updateButton(){
        return cy.get('[data-cy=update]').should('be.visible');
    }

    lastName(){
        return cy.get('[data-cy=lastName]').should('be.visible');
    }

    resetPasswordBtn(){
        return cy.get('[data-cy=resetPasswordButton]').should('be.visible');
    }

    serviceCenterDropDown(){
        return cy.get('#header > div > ul > li:nth-child(2) > ul').invoke('show').should('be.visible');
    }

    deleteLocation1(){
        return cy.get(':nth-child(1) > [data-cy=deleteLocation]').should("be.visible");
    }

    deleteLocation2(){
        return cy.get('[data-cy=deleteLocation]').should("be.visible");
    }

    warningOk(){
        return cy.get('[data-cy=warningOk] > .mat-button-wrapper').should("be.visible");
    }

    warningCancel(){
        return cy.get('[data-cy=warningCancel]').should('be.visible');
    }

    showInvoices(){
        return cy.get('[data-cy=showInvoices]').should('be.visible');
    }

    managementConsoleDropDown(){
        return cy.get('#header > div > ul > li:nth-child(3) > ul').invoke('show').should('be.visible');
    }
}