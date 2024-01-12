import {BasePage} from "../base-page";

const basePage = new BasePage();

export class LocationPage {

    locationsPage() {
        return cy.getDataCy('Locations').should('be.visible');
    }

    address() {
        return  cy.getDataCy('address');
    }

    city() {
        return cy.getDataCy('city');
    }

    state() {
        return cy.getDataCy('state');
    }

    zip() {
        return cy.getDataCy('zip');
    }

    keyDetails() {
        return cy.getDataCy('keyDetails');
    }

    notes() {
        return cy.getDataCy('notes');
    }

    fillAddLocationPopUp(address) {
        this.address().type(address.streetAddress);
        this.city().type(address.city);
        this.state().click();
        cy.get('[class="mat-option-text"]').contains(address.state).click();
        this.zip().type(address.zip);
        this.locationType().click();
        basePage.firstOption().click();
        this.label().click();
        basePage.firstOption().click();
        this.keyDetails().type('Key Details');
        this.notes().type('Notes');
    }

    locationType() {
        return cy.getDataCy('locationType').should('be.visible');
    }

    label() {
        return cy.getDataCy('label').should('be.visible');
    }

    removeLocation() {
        return cy.getDataCy('removeLocation').should('be.visible');
    }

    markAsValid() {
        return cy.getDataCy('markAsValid').should('be.visible');
    }

    interceptGetLocations() {
        cy.intercept('user/getlocations').as('getLocations');
    }

    addressErrorMessage() {
        return cy.getDataCy('addressErrorMessage');
    }

    cityErrorMessage() {
        return cy.getDataCy('cityErrorMessage');
    }

    stateErrorMessage() {
        return cy.getDataCy('stateErrorMessage');
    }

    zipErrorMessage() {
        return cy.getDataCy('zipErrorMessage');
    }

    typeErrorMessage() {
        return cy.getDataCy('typeErrorMessage');
    }

    labelErrorMessage() {
        return cy.getDataCy('labelErrorMessage');
    }

    addLocationBackdrop() {
        return cy.get('#mat-dialog-0').click();
    }

    country() {
        return cy.get('[name="country"]');
    }

    countryErrorMessage() {
        return cy.get('mat-error').contains('Country is required');
    }

    fillInvalidLocation(address) {
        this.address().type(address.streetAddress+address.streetAddress);
        this.city().type(address.city);
        this.state().click();
        cy.get('[class="mat-option-text"]').contains(address.state).click();
        this.zip().type(address.zip);
        this.locationType().click();
        basePage.firstOption().click();
        this.label().click();
        basePage.firstOption().click();
    }
}