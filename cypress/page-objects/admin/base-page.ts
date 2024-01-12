export class BasePage {

    addButton() {
        return cy.getDataCy('addButton');
    }

    popUpAddButton() {
        return cy.getDataCy('popUpAddButton').should('be.visible');
    }

    updateButton() {
        return cy.getDataCy('updateButton').should('be.visible');
    }

    firstOption() {
        return cy.get('mat-option[role=option]').first();
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

    orgButton() {
        return cy.getDataCy('orgButton');
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

    waitForComPref() {
        cy.intercept('user/getcommunicationpreferences').as('getComPref');
        cy.wait('@getComPref');
    }

    h3() {
        return cy.get('h3');
    }

    cancelButton() {
        return cy.get('button').contains('Cancel');
    }

    td() {
        return cy.get('td');
    }

    saveButton() {
        return cy.get('button').contains('Save');
    }

    errorToast() {
        return cy.get('[class="bigBox animated fadeIn fast"]').should('include.text', 'Error');
    }

    popUpYesButton() {
        return cy.get('[id="bot2-Msg1"]').should('be.visible');
    }

    randomNumber(range) {
        return Math.floor(Math.random() * range) + 1;
    }

    waitForPageToLoad() {
        cy.get('.page-busy', {timeout: 45000}).should('not.be.visible', {force: true});
    }

    sideNavMenu() {
        return cy.get('header > :nth-child(1)');
    }

    submitModalButton() {
        return cy.get('.modal-footer > .btn-primary');
    }

    lastRow() {
        return cy.get('tr[role=row]').last().should('be.visible');
    }

    lastCheckBox() {
        return cy.get('.mat-checkbox').last();
    }

    ngWaitForPageToLoad() {
        cy.get('[role="progressbar"]', {timeout: 30000}).should('not.exist', {force: true});
    }

    successToastDismiss() {
        return cy.get('app-custom-snackbar.ng-star-inserted > .ng-star-inserted > .mat-focus-indicator').click();
    }

    thisOption(option) {
        return cy.get('.mat-option-text').contains(option);
    }

    ngErrorToast() {
        return cy.get('.mat-snack-bar-container').contains('Error').should('be.visible');
    }
}
