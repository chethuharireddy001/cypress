import { fleetUsers } from "../../configuration/properties";
export class LocationPage {

    verifyNewUserLocationPage() {
        return cy.url().should('include', 'newuser#location');
    }
    verifyDanUserLocationPage() {
        return cy.url().should('include', 'lm-user#location');
    }

    verifyNewUserNewLocation() {
        return cy.url().should('include', '/newuser#newLocation');
    }

    accountValidate() {
        return cy.url().should('include', '/account');
    }

    fillLocationDetailsForLm(data) {
        cy.get('[data-cy=addressAutocomplete]').should('be.visible').click().type(data.location1,{ delay: 100 });
        cy.get("div[class='pac-item']").first().click();
        // cy.get('#phone').should('be.visible').type(data.phoneNumber);
        cy.get('#locationTypeHome').should('be.visible').click();
        cy.get('#newParkingTypeGarage').should('be.visible').click();
        cy.get('[data-cy=locationNotes]').should('be.visible').type(data.locationNotes);
        cy.get('[data-cy=keyNotes]').should('be.visible').type(data.keyNotes);
        cy.get('#locationTypeHome').should('be.visible').click();
    }

    fillLocationDetails() {
        cy.fillAddressAutocomplete('1950 6th Ave', 'Seattle', 'WA', '98105');
       // cy.get('#phone').should('be.visible').type(Cypress.env('phoneNo'));
        cy.get('#locationTypeHome').should('be.visible').click();
        cy.get('#newParkingTypeGarage').should('be.visible').click();
        cy.get('[data-cy=locationNotes]').should('be.visible').type(fleetUsers.locationNotes);
        cy.get('[data-cy=keyNotes]').should('be.visible').type(fleetUsers.keyNotes);
        cy.get('#locationTypeHome').should('be.visible').click();
    }

    fillLocationRadioDetails() {
        cy.fillAddressAutocomplete('1950 6th Ave', 'Seattle', 'WA', '98105');
        cy.get('[data-cy=radioButtonWork]').should('be.visible').click();
        cy.get('[data-cy=radioButtonDriveway]').should('be.visible').click();
        cy.get('[data-cy=locationNotes]').should('be.visible').type(fleetUsers.locationNotes);
        cy.get('[data-cy=keyNotes]').should('be.visible').type(fleetUsers.keyNotes);
    }
    
    fillLocationDeatilsforNewFleet(fleetuser) {
        cy.fillAddressAutocomplete(fleetuser.address, fleetuser.city, fleetuser.State, fleetuser.zip);
        cy.get('[data-cy=radioButtonWork]').should('be.visible').click();
        cy.get('[data-cy=radioButtonDriveway]').should('be.visible').click();
        cy.get('[data-cy=locationNotes]').should('be.visible').type(fleetuser.locationNotes);
        cy.get('[data-cy=keyNotes]').should('be.visible').type(fleetuser.keyNotes);
        cy.get('#id-region').click();
        cy.get('.mat-option-text').click({ force:true});
        cy.get('#id-hub').click();
        cy.get('.mat-option-text').click({ force:true});
    }

    addLocation() {
        return cy.get('[data-cy=addLocation]').should('be.visible');
    }

    phoneAutofill() {
        return cy.get('[data-cy=locationPhone]').should('be.visible');
    }

    radioButtonHome() {
        return cy.get('[data-cy=radioButtonHome]').should('be.visible').click();
    }

    radioButtonGarage() {
        return cy.get('[data-cy=radioButtonGarage]').should('be.visible').click();
    }

    verifyThirdShiftlocationFlow() {
        cy.get('#shift-banner > div > label').eq(1).contains(Cypress.env('thirdShiftMessage'));
        cy.get('[data-cy=addonsNext]').click();
        cy.get('#shift-banner > div > label').eq(2).contains(Cypress.env('thirdShiftMessage'));
        cy.get('[data-cy=locationNext]').click();
        cy.get('[data-cy=modalFooterNextButton]').click();
        cy.wait('@getAvailability');
        cy.get('#shift-banner > div > label').eq(3).contains(Cypress.env('thirdShiftMessage'));
    }

    locationNotes() {
        cy.get('[data-cy=locationNotes]').should('be.visible').click().type('in the garage');
    }

    verifyLocationPage() {
        return cy.url().should('include', '/book#location');
    }

    locationnotes() {
        return cy.get('[data-cy="locationNotes"]').should('be.visible');
    }

    navigateToOffer20Location() {
        cy.url().should('include', '/offerup/offerup20sea#location');
    }

    locationKeyDetails() {
        return cy.get('[data-cy="locationKeyDetails"]').should('be.visible');
    }

    navigateToOfferLocation() {
        cy.url().should('include', '/offerup#location');
    }

    locationNextButton() {
        return cy.get('[data-cy=locationNext]').should('be.visible').should('not.be.disabled');
    }

    locationNxtBtn() {
        return cy.get('[data-cy=nextButton]').should('be.visible');
    }

    keyNotes() {
        return cy.get('[data-cy=keyNotes]').should('be.visible').click().type('on the shotgun wheel');
    }

    locationsLen() {
        return cy.get('[data-cy=serviceLocation]').should('be.visible');
    }

    locationSelector() {
        return cy.get('[data-cy=locationSelector]').should('be.visible').click();
    }

    matOption() {
        return cy.get('mat-option').should('be.visible').eq(1).click();
    }

    confirmLocationPopUpOkBtn() {
        return cy.get('[data-cy=modalFooterNextButton]').should('be.visible');
    }

    locationBackButton() {
        return cy.get('[data-cy=locationBack]').should('be.visible');
    }

    newLocationNextButton() {
        return cy.get('[data-cy=newLocationNext]').should('be.visible');
    }

    newLocationBackButton() {
        return cy.get('[data-cy=newLocationBack]').should('be.visible').should("contain", "Back");;
    }

    verifyNewUserOffer20seaLocationPage() {
        return cy.url().should('include', '/offerup/offerup20sea#newLocation');
    }

    verifyNewUserOfferLocationPage() {
        return cy.url().should('include', '/offerup#newLocation');
    }

    serviceLocation() {
        return cy.get('[data-cy=serviceLocation]').should('be.visible');
    }

    locationErrorMessage() {
        cy.get('[data-cy=errorMsg]').should('be.visible').and('to.contain', 'This location has been used by someone in your organization in the past. Are you sure the location and key handoff details are accurate for this appointment?');
    }

    restartMessage() {
        cy.get('[data-cy=errorMsg]').should('be.visible').and('to.contain', 'If you change your vehicle you will have to restart the quote process.');
    }

    backButton() {
        return cy.get('[data-cy=modalFooterBackButton]').should('be.visible');
    }

    sharedLocationButton() {
        return cy.get('[data-cy=sharedLocationGetStarted]').should('be.visible');
    }

    locationWarningConfirmBtn() {
        return cy.get('[data-cy=warningOk]').should('be.visible');
    }
}

