import {properties} from "../../../configuration/properties";

export class DiscountPage {

    discountsTab() {
        return cy.get('#mat-tab-label-1-5');
    }

    addDiscount() {
        return cy.getDataCy('addButton');
    }

    applyPromoCode() {
        return cy.getDataCy('discountInput').should('be.visible');
    }

    applyPromoCodeButton() {
        return cy.getDataCy('popUpAddButton').last().should('be.visible');
    }

    discountAdded(discount) {
        cy.get('.mat-row > .cdk-column-code').then(($elm)=>{
            const text = $elm.text();
            expect(text).to.include(discount);
        });
    }

    removeTopDiscount() {
        return cy.getDataCy('removeDiscount').first();
    }

    removeConfirm() {
        return cy.get('.button-container > .mat-accent');
    }

    createDiscount(discount) {
        cy.visit('#/user_services/viewdiscounts', {timeout:45000});
        cy.get('#createDiscountButton').click();
        cy.get('#code').first().type(discount);
        cy.get('#description').first().type(discount);
        cy.get('#explanation').first().type(discount);
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#percentage').type('50');
        cy.get('#dropdownStart > .input-group > .form-control').click();
        cy.get(':nth-child(9) > .col-sm-9 > .dropdown-menu > .datetimepicker > .table > thead > :nth-child(1) > .switch').click();
        cy.get(':nth-child(9) > .col-sm-9 > .dropdown-menu > .datetimepicker > .table > thead > :nth-child(1) > .switch').click();
        cy.get('td > :nth-child(11)').click();
        cy.get('td > :nth-child(11)').click();
        cy.get(':nth-child(9) > .col-sm-9 > .dropdown-menu > .datetimepicker > .table > tbody > :nth-child(5) > :nth-child(5)').click();
        cy.get('#createButton').click();
        /* ==== End Cypress Studio ==== */
    }

}
