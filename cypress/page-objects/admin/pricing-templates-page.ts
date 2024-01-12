export class PricingTemplates {

    pricingTemplatesBtn() {
        return cy.get('a').contains('Pricing Templates');
    }

    vehicleMakeDropdownBtn() {
        return cy.getDataCy('makeDropdown').should("be.visible");
    }

    vehicleMakeOption(make) {
        return cy.get('.mat-option-text').contains(make, {matchCase: false});
    }

    vehicleModelDropdown() {
        return cy.getDataCy('modelDropdown');
    }

    vehicleModelOption(model) {
        return cy.get('.mat-option-text').contains(model, {matchCase: false});
    }

    pricingTemplatesSearchBtn() {
        return cy.get("[.=' Search ']").should("be.visible");
    }

    startYearDropdown() {
        return cy.get("[name=startYear]").should("be.visible");
    }

    selectStartYearFromDropdown(year) {
        cy.get('[name=startYear]').click();
        cy.get('.mat-option-text').contains(year).click();
    }

    selectEndYearFromDropdown(year) {
        cy.get('[name=endYear]').click();
        cy.get('.mat-option-text').contains(year).click();
    }

    yearOption(year) {
        return cy.get('.mat-option-text').contains(year);
    }

    endYearDropdown() {
        return cy.get('[name="endYear"]');
    }

    createTemplateBtn() {
        return cy.get("[role=tab]").contains('Create').should("be.visible");
    }


    vehicleMakeInList() {
        return cy.get('tbody > :nth-child(1) > .cdk-column-vehicle');
    }

    findProductDropdwn() {
        return cy.get('app-search-selector2.ng-star-inserted');
    }

    nextButton() {
        return cy.get('button').contains('Next');
    }

    addVehicleBtn() {
        return cy.get('button').contains('Add Vehicle').should("be.visible");
    }

    finishBtn() {
        return cy.get('div').contains('Finish').should("be.visible");
    }

    createBtn() {
        return cy.get("[.='Create']").should("be.visible");
    }

    addNewPartCategoryBtn() {
        return cy.get("[.=' Add new part category ']").should("be.visible");
    }

    partDropdown() {
        return cy.get('[role=combobox]').last().should('be.visible');
    }

    costBox() {
        return cy.get("[formcontrolname='cost']").should("be.visible");
    }

    priceBox() {
        return cy.get("[formcontrolname='price']").should("be.visible");
    }

    quantityBox() {
        return cy.get("[formcontrolname='quantity']").should("be.visible");
    }

    addPartSubmitBtn() {
        return cy.get('span').contains('Submit').should("be.visible");
    }

    addNewLaborBtn() {
        return cy.get('button').contains('Add new labor').should("be.visible");
    }

    laborBox() {
        return cy.get("[formcontrolname='labor']").should("be.visible");
    }

    recommendedCheckBox() {
        return cy.get("[class='mat-checkbox-inner-container']").should("be.visible");
    }

    addLaborSubmitBtn() {
        return cy.get("[.=' Submit ']").should("be.visible");
    }

    fetchTemplateId() {
        return cy.get('h2').contains('Template Id');
    }

    menuButton() {
        return cy.get('button').contains('menu').should("be.visible");
    }

    waitForPricingTemplates() {
        cy.intercept('pricing/findpricingtemplates').as('pricingTemplates');
    }

    firstPartOption() {
        return cy.get('.mat-option-text').eq(2).should('be.visible');
    }
}