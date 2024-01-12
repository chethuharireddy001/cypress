import {properties} from "../../../configuration/properties";
import {BasePage} from "../base-page";
import {isLubeMobile} from "../../../support/utils";

const basePage = new BasePage();

export class PaymentPage {

    paymentsPage() {
        return cy.getDataCy('Payments').should('be.visible');
    }

    addPaymentButton() {
        return cy.getDataCy('addPaymentButton');
    }

    addPaymentFlow() {
        if (isLubeMobile()) {
            cy.get('[name="paymentTypes"]').click();
            basePage.firstOption().click();
        } else {
            cy.get('[name="braintree-hosted-field-cardholderName"]').iframe()
                .find('[id="cardholder-name"]').type(properties.cardHolderName);
            cy.get('[name="braintree-hosted-field-number"]').its('0.contentDocument.body')
                .then(cy.wrap).find('[id="credit-card-number"]').type(properties.cardNumber);
            cy.get('[name="braintree-hosted-field-expirationMonth"]').its('0.contentDocument.body')
                .then(cy.wrap).find('[id="expiration-month"]').type(properties.expMonth);
            cy.get('[name="braintree-hosted-field-expirationYear"]').its('0.contentDocument.body')
                .then(cy.wrap).find('[id="expiration-year"]').type(properties.expYear);
            cy.get('[name="braintree-hosted-field-cvv"]').its('0.contentDocument.body')
                .then(cy.wrap).find('[id="cvv"]').type(properties.cvv);
            cy.get('[name="braintree-hosted-field-postalCode"]').its('0.contentDocument.body')
                .then(cy.wrap).find('[id="postal-code"]').type(properties.cardZip);
        }
    }

    addOrgPayment() {
        this.addPaymentFlow();
        cy.getDataCy('regionDropdown').click();
        cy.get('mat-option[role=option]').contains('Default').first().click();
        cy.getDataCy('hubDropdown').click();
        cy.get('mat-option[role=option]').contains('Default').first().click();
    }

    addPaymentPopUp() {
        return cy.getDataCy('addPayment').should('be.visible');
    }

    setDefault() {
        return cy.getDataCy('setDefault').should('be.visible');
    }

    removePaymentButton() {
        return cy.getDataCy('removePayment').should('be.visible');
    }

    checkMark1() {
         cy.get('[class="fas fa-check fa-lg green"]').should('be.visible');
    }

    checkMark2() {
         cy.get('[class="fas fa-check green"]').should('be.visible');
    }

    interceptPaymentMethods() {
        cy.intercept('transaction/getpaymentmethods').as('getPaymentMethods');
        cy.wait('@getPaymentMethods');
    }

    paymentTypesTab() {
        return cy.get('[name="paymentTypes"]');
    }

    addOrgPaymentToRegion() {
        this.addPaymentFlow();
        cy.getDataCy('regionDropdown').click();
        cy.get('mat-option[role=option]').contains('Default').first().click();
    }

    defaultPaymentCheck() {
        return cy.get('.preferred-info');
    }
}
