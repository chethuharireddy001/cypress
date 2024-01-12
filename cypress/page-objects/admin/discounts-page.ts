export class DiscountsPage {

    navigateToDiscountsPage() {
        cy.visit('/ng/discount');
    }

    addDiscountButton() {
        return cy.get('button').contains('Add Discount');
    }

    codeField() {
        return cy.get('[name=code]');
    }

    amountField() {
        return cy.get('[name=percentageAmount]');
    }

    percentageDollarDropdown() {
        return cy.get('[formcontrolname="percentageDollarDropdown"]');
    }

    typeDropdown() {
        return cy.get('[formcontrolname="type"]');
    }

    statusDropdown() {
        return cy.get('[formcontrolname="status"]');
    }

    consumeByDate() {
        return cy.get('[formcontrolname="consumeByDate"]');
    }

    marketDropdown() {
        return cy.get('[formcontrolname="markets"]');
    }

    combinableDropdown() {
        return cy.get('[formcontrolname="combinable"]');
    }

    descriptionField() {
        return cy.get('[formcontrolname="description"]');
    }

    explanationField() {
        return cy.get('[name="explanation"]');
    }

    addButton() {
        return cy.getDataCy('searchButton');
    }

    searchFilter() {
        return cy.getDataCy('filter');
    }

    foundDiscount() {
        return cy.get('tr[role=row]').eq(1);
    }

    userServices() {
        return cy.get('div').contains('User Services').should("be.visible");
    }

    viewDiscounts() {
        return "[href=\"https://adminuat.wrench.com/ng//discount\"]";
    }

    createDiscountButton() {
        return cy.get("[id=createDiscountButton]").should("be.visible");
    }

    codeBox() {
        return cy.get("[id=code]").should("be.visible");
    }

    descriptionBox() {
        return cy.get("[id=description]").should("be.visible");
    }

    explanationBox() {
        return cy.get("[id=explanation]").should("be.visible");
    }

    percentageBox() {
        return cy.get("[id=percentage]").should("be.visible");
    }

    saleSelectionInTypeBox() {
        return cy.get("[id=type]").select('Sale');
    }
}