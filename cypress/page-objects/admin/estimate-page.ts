import {auAddress, properties, usAddress, vehicle} from "../../configuration/properties";
import {isLubeMobile} from "../../support/utils";
import {BasePage} from "./base-page";
import {CreateJobPage} from "./job-test-pages/create-job-page";

const basePage = new BasePage();
const createJobPage = new CreateJobPage();

let address = auAddress;
let country = 'AU';
if (!isLubeMobile()) {
    address = usAddress;
    country = 'US';
}

export class EstimatePage {

    verifyEstimatePage() {
        return cy.url().should("contain", "/estimate");
    }

    randomPhoneNumber() {
        let ph = "";
        let digit = "1234567890";
        for (let i = 0; i < 10; i++) ph += digit.charAt(Math.floor(Math.random() * digit.length));
        return ph;
    }

    phoneField() { //TODO: USE A LEGIT PHONE NUMBER HERE
        return cy.getDataCy('phone').should("be.visible").type(this.randomPhoneNumber());
    }

    nameField() {
        return cy.getDataCy('firstName').should("be.visible");
    }

    lastNameField() {
        return cy.getDataCy('lastName').should("be.visible");
    }

    postalCode() {
        return cy.getDataCy('zipCode').should("be.visible");
    }

    validateZip() {
        return cy.getDataCy('validateZipButton').should("be.visible");
    }

    addVehicleNext() {
        return cy.getDataCy('addVehicleButton').should("be.visible");
    }

    selectVehicleModal() {
        let make = vehicle.vehicleMake;
        let model = vehicle.vehicleModel;
        if (isLubeMobile()) {
            make = make.toUpperCase();
            model = model.toUpperCase();
        }
        cy.get("#modal-title").should("contain", "Add Vehicle");
        cy.getDataCy('makeModelYearRadioButton').click();
        cy.getDataCy('year').select(vehicle.vehicleYear);
        cy.getDataCy('make').select(make);
        cy.getDataCy('findModelsButton').click();
        cy.getDataCy('selectModel').select(model);
        cy.getDataCy('addVehicleButton').first().click();
    }

    addServices() {
        cy.getDataCy('addServiceButton').click();
        if (isLubeMobile()) {
            createJobPage.serviceInput().click();
            basePage.secondOption().click();
        } else {
            createJobPage.serviceInput().type(properties.service);
            cy.minWait();
            basePage.firstOption().click();
        }
        cy.getDataCy('addServicesButton').click();
    }

    completeWithoutQuoteButton() {
        return cy.getDataCy('completeWithoutQuoteButton').first().should("be.visible");
    }

    completeWithoutQuoteFinal() {
        cy.getDataCy('estimateType').select("Part Cost");
        cy.getDataCy('saveReasonNotesButton').click();
    }

    completeWithQuote() {
        cy.minWait();
        cy.getDataCy('nextConvertToQuoteButton').should('be.visible').click();
        cy.getDataCy('emailInput').should('be.visible').type(`${Date.now()}@wrench.com`)
        cy.getDataCy('manageHowDidYouHear').should('be.visible').select(properties.partnerCompany);
        cy.get('[ng-show="showConvertToQuoteDialog"] > .well > footer > .pull-right > .btn-primary').should('be.visible').click();
    }

    addNewLocation() {
        cy.minWait();
        cy.getDataCy('selectActionButton').eq(1).click();
        cy.get('[ng-click="addLocationPopUp()"]').click();
        cy.get('[name=address]').type(address.streetAddress);
        cy.get('[name=city]').type(address.city);
        cy.getDataCy('state').select(address.state);
        cy.getDataCy('country').type(country);
        cy.getDataCy('zip').type(address.zip);
        cy.getDataCy('locationType').select(properties.locationType);
        cy.getDataCy('label').select(properties.locationLabel);
        cy.getDataCy('saveLocationButton').should('be.visible').click();
    }

    cancelQuoteButton() {
        return cy.getDataCy('cancelQuoteMenu');
    }
}

