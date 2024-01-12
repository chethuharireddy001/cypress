import {isLubeMobile} from "../../support/utils";

export class ContactCenter {

    verifyServiceArea() {
        if (isLubeMobile()) cy.get('app-service-area-verification-form > :nth-child(3)').should('be.visible').should('include.text', ' This Postcode is within the Lube Mobile service area in South Australia. ');
        else cy.get('app-service-area-verification-form > :nth-child(2)').should('be.visible').should('include.text', 'This Zip Code is within the Wrench service area');
    }

    invalidServiceArea() {
        if (isLubeMobile()) cy.get('app-service-area-verification-form > :nth-child(3)').should('be.visible').should('include.text', ' This Postcode is outside our service area. ');
        else cy.get('app-service-area-verification-form > :nth-child(2)').should('be.visible').should('include.text', 'This Zip Code is outside our service area.');
    }

    phoneNumber() {
        return cy.getDataCy('phoneNumber');
    }

    searchButton() {
        return cy.getDataCy('searchButton');
    }

    firstName() {
        return cy.get("[name=firstName]");
    }

    lastName() {
        return cy.get("[name=lastName]");
    }

    userId() {
        return cy.get("[name=userId]");
    }

    email() {
        return cy.get("[name=email]");
    }

    postalCode() {
        return cy.get("[name=zip]");
    }

    vin() {
        return cy.get("[name=vin]");
    }

    registrationNumber() {
        return cy.get("[name=license]");
    }

    navigateToContactCenterPage() {
        cy.visit('ng/contact-centre');
        cy.url().should("include", "/contact-centre");
    }

    verifyEstimatePage() {
        cy.url().should('include', 'estimate');
    }

    quoteId() {
        return cy.get('[name="jobRequestId"]');
    }

    jobId() {
        return cy.get('[name="jobId"]');
    }

    verifyManageAccountPage() {
        return cy.get('span').contains('Account Management').should('have.text', ' Account Management ');
    }

    randomUserID() {
        let id = "";
        let digit = "1234567890";
        for (let i = 0; i < 5; i++)
            id += digit.charAt(Math.floor(Math.random() * digit.length));
        return id;
    }

    searchAQuote(quoteId) {
        this.navigateToContactCenterPage();
        this.quoteId().type(quoteId).type('{enter}');
    }

}


