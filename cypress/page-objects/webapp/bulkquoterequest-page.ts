export class BulkQuoteRequestPage {

    verifyBulkQuoteIntroPageTitle() {
        return cy.get('div[data-cy=bulkQuoteRequestIntroTitle]').should('be.visible');
    }

    clickOnXButton() {
        cy.get('[data-cy=closeBulkJobRequest]').scrollIntoView().should('be.visible').click({ force: true });
    }
    

    verifyAlertTitle() {
        return cy.get('[data-cy=confirmDialogContentTitle]').should('be.visible');
    }

    verifyAlertText() {
        return cy.get('[data-cy=confirmDialogContentMessage1]').should('be.visible');
    }

    verifyCancelBtnOnAlertPopUp() {
        return cy.get('[data-cy=modalFooterBackButton]').should('be.visible');
    }

    verifyCloseBtnOnAlertPopUp() {
        return cy.get('[data-cy=modalFooterNextButton]').should('be.visible');
    }

    verifyRemoveBtnOnAlertPopUp() {
        return cy.get('[data-cy=modalFooterNextButton]').should('be.visible');
    }

    verifyGetStartedBtn() {
        return cy.get('button[data-cy=getStartedButton]').should('be.visible');
    }

    verifySearchTxtField() {
        return cy.get('[data-cy=servicesSearch]').scrollIntoView().should('be.visible').click().clear();
    }

    selectVehicle(option) {
        return cy.get('.ng-star-inserted > button:nth-child(' + option + ')').should('be.visible');
    }

    selectVehicleInOverview(option) {
        return cy.get('.mat-drawer-inner-container > div.ng-star-inserted > :nth-child(' + option + ')').should('be.visible');
    }

    selectFirstVehicleInApplyServiceView(vehicleName) {
        return cy.get(`[data-cy='${vehicleName}-matListCheckboxUnchecked']`).should('be.visible');
    }

    selectService(serviceName) {
        return cy.get('.mat-list').contains(serviceName).scrollIntoView().should('be.visible').click({ timeout: 4000, force: true });
    }

    selectServiceInOverview(serviceName) {
        return cy.get(`div[data-cy='${serviceName}-rightCheckboxDisplayName']`).scrollIntoView().should('be.visible');
    }
    verifyMessage(serviceName) {
        return cy.get(`[data-cy='${serviceName}']`).should('be.visible');
      }

    verifyReviewAndSubmitBtn() {
        return cy.get('[data-cy=overviewBtn]').should('be.visible');
    }

    verifySubmitQuotesBtn() {
        return cy.get('[data-cy=submitQuotesBtn]').should('be.visible');
    }

    submitQuotesBtn() {
        return cy.get('[data-cy=submitQuotesBtn]').should('be.visible');
    }

    verifyRemoveVehicleBtn() {
        return cy.get('[data-cy=removeVehicleBtn]').scrollIntoView().should('be.visible');
    }

    verifyVehicleCount() {
        return cy.get("div[class='ng-star-inserted'] > button").should('be.visible');
    }

    verifyAddServicesBtn() {
        return cy.get('[data-cy=addServicesBtn]').should('be.visible').should('include.text', 'Add services');
    }

    verifyApplyToBtn(serviceName) {
        return cy.get(`button[data-cy='${serviceName}-matListCheckboxSecondaryButton'] > .mat-button-wrapper`).scrollIntoView().should('be.visible');
    }

    verifyServiceWarningMsg(serviceName) {
        return cy.get(`[data-cy='${serviceName}-matListCheckboxWarning']`);
    }

    verifyServiceEditOption(serviceName) {
        return cy.get(`[data-cy='${serviceName}-matListCheckboxEditOptions']`).scrollIntoView().should('be.visible');
    }

    verifyAllCheckBox() {
        return cy.get("[data-cy=All-rightCheckboxDisplayName] > span").scrollIntoView().should('be.visible');
    }

    verifyDoneBtn() {
        return cy.get('[data-cy=doneBtn]');
      }
      

    verifyAppliedService(serviceName) {
        return cy.get(`[data-cy='${serviceName}'] > .mat-list-item-content > .width-100-percent`).scrollIntoView().should('be.visible');
    }

    verifySelectServiceBtnOnPopUp() {
        return cy.get('[data-cy=serviceNext]').should('be.visible');
    }

    verifyListOfVehilcesAndServicesInSubmitQuotes(option = null) {
        if (option != null) return cy.get('.mat-accordion.ng-star-inserted>mat-expansion-panel:nth-child(' + option + ')');
        else return cy.get('.mat-accordion.ng-star-inserted>mat-expansion-panel').should('be.visible');
    }

    verifyServiceFromSubmitQuotes(option, serviceName) {
        return cy.get(':nth-child(' + option + ') > .cdk-column-service > [data-cy=serviceDescription]').should('include.text', serviceName);
    }

    verifyEditAndRemoveBtn(option, btnOption= null) {
        if (btnOption != null) return cy.get('.mat-accordion.ng-star-inserted>mat-expansion-panel:nth-child(' + option + ')>.mat-expansion-toggle-indicator-after.ng-star-inserted>:nth-child(1)>mat-panel-description>div>a:nth-child(' + btnOption + ')');
        else return cy.get('.mat-accordion.ng-star-inserted>mat-expansion-panel:nth-child(' + option + ')>.mat-expansion-toggle-indicator-after.ng-star-inserted>:nth-child(1)>mat-panel-description>div>a').should('be.visible');
    }

    editBtnInOverviewScreen(option) {
        return cy.get('#mat-expansion-panel-header-' + option + ' > .mat-content > .mat-expansion-panel-header-description > div.margin-right-20 > [data-cy=editBtn]').should('be.visible');
    }


    verifyRemoveVehicleAlertTxt() {
        return cy.get('[data-cy=confirmDialogContentTitle]').should('be.visible');
    }

    verifyBackBtnFromSubmitQuotes() {
        return cy.get('[data-cy=backBtn]').should('be.visible');
    }

    verifyBulkQuotePage() {
        return cy.get('span[class=quote-header-1]').should('be.visible').should('have.text', 'Quotes');
    }

    clickOnVehicleInOverviewPage(option) {
        return cy.get('#mat-expansion-panel-header-' + option).should('be.visible');
    }

    getServiceNameFromOverviewPage(option) {
        return cy.get('#cdk-accordion-child-' + option + ' > .mat-expansion-panel-body > .mat-list > .mat-list-item > .mat-list-item-content > :nth-child(3) > .margin-right-auto > .vertical-align-center').should('be.visible');
    }

    getServicesNamesFromOverViewPage(option1, option2) {
        return cy.get('#cdk-accordion-child-' + option1 + ' > .mat-expansion-panel-body > .mat-list > :nth-child(' + option2 + ')').should('be.visible');
    }

    clickOnPricingTab() {
        return cy.get('#mat-tab-label-1-0').should('be.visible');
    }
}
