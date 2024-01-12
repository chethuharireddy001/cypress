export class BasePage {

    addButton() {
        return cy.getDataCy('addButton').should('be.visible');
    }

    popUpAddButton() {
        return cy.getDataCy('popUpAddButton').should('be.visible');
    }

    updateButton() {
        return cy.getDataCy('updateButton').should('be.visible');
    }

    firstOption() {
        return cy.get('mat-option[role=option]').first().should('be.visible');
    }

    secondOption() {
        return cy.get('mat-option[role=option]').eq(1).should('be.visible');
    }

    lastOption() {
        return cy.get('mat-option[role=option]').last().should('be.visible');
    }

    successToast() {
        return cy.get('app-custom-snackbar').contains('Success').should('be.visible');
    }

    confirmButton() {
        return cy.get('button').contains('Confirm').should('be.visible');
    }

    header() {
        return cy.get('h1').should('be.visible');
    }

    subHeader() {
        return cy.get('h2').should('be.visible');
    }

    refreshButton() {
        return cy.getDataCy('refreshButton').should('be.visible');
    }

    kebabButton() {
        return cy.getDataCy('actionsButton').should('be.visible');
    }

    searchButton() {
        return cy.getDataCy('searchButton');
    }

    searchNoDataCy() {
        return cy.get('button').contains('Search').should('be.visible');
    }

    firstRow() {
        return cy.get('tr[role=row]').eq(1).should('be.visible');
    }

    errorMessage() {
        return cy.getDataCy('errorMessage').should('be.visible');
    }

    theOtherDropdownOption(){
        return cy.get('mat-option').not('[aria-selected="true"]').eq(0);
    }

    scrollUp() {
        return cy.scrollTo('top');
    }

    scrollDown() {
        return cy.scrollTo('bottom');
    }

    firstRadioButton() {
        return cy.get('mat-radio-button').first().should('be.visible')
    }

    backDrop() {
        cy.get('.cdk-overlay-transparent-backdrop').click();
    }

    xButton() {
        cy.get('.dialog-close').click();
    }

    hamburgerButton() {
        cy.get('[data-mat-icon-type="font"]').first().click();
    }

    sideListMngAcc() {
        cy.get('[class="mat-list-item-content"]').eq(4).click();
    }

    interceptFindJobs() {
        cy.intercept('admin/findjobs').as('findJobs');
    }

    backToListButton() {
        return cy.get('.breadcrumbs > :nth-child(2) > .mat-focus-indicator');
    }

    householdButton() {
        return cy.get(':nth-child(2) > .mat-tooltip-trigger').should('be.visible');
    }

    userActionsButton() {
        return cy.getDataCy('userActionsButton').should('be.visible');
    }

    accountManagementButton() {
        return cy.get('.left > .mat-flat-button');
    }

    interceptFindProviders() {
        cy.intercept('/admin/findproviders').as('findProviders');
    }

}
