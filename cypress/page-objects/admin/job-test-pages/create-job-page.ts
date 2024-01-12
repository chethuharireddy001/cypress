import {BasePage} from "../base-page";
import {properties} from "../../../configuration/properties";

const basePage = new BasePage();

export class CreateJobPage {

    selectTechDropdown() {
        return cy.getDataCy('selectTechnicianDropdown').should('be.visible');
    }

    dropdownStart() {
        return cy.get('[class="input-group-addon"]').should('be.visible');
    }

    approveName() {
        return cy.getDataCy('approveNameTxtField').should('be.visible');
    }

    approveTypeDropdown() {
        return cy.getDataCy('approveTypeDropdown').should('be.visible');
    }

    addService() {
        return cy.getDataCy('addService').should('be.visible');
    }

    saveJob() {
        return cy.getDataCy('saveJob').should('be.visible');
    }

    tomorrow() {
        return cy.get('[class="day current"]').next();
    }

    noon() {
        return cy.get('[class="hour"]').contains('12:00 PM');
    }

    oclock() {
        return cy.get('[class="minute"]').contains('12:00 PM');
    }

    forceScheduleYes() {
        return cy.get('[id="bot2-Msg1"]').should('be.visible');
    }

    selectLocation() {
        return cy.get('[placeholder="Select Location"]').should('be.visible');
    }

    createJobScreen() {
        return cy.getDataCy('createJobScreen');
    }

    firstNameInput() {
        return cy.getDataCy('firstName');
    }

    lastNameInput() {
        return cy.getDataCy('lastName');
    }

    emailInput() {
        return cy.getDataCy('searchEmailTxtField');
    }

    filterButton() {
        return cy.getDataCy('filterButton');
    }

    vehicleDropdown() {
        return cy.getDataCy('vehicleDropdown');
    }

    serviceInput() {
        return cy.get('[spellcheck="false"]');
    }

    addServicesButton() {
        return cy.get('button').contains('Add Services');
    }

    yesButton() {
        return cy.get('#bot2-Msg1', {timeout: 5000});
    }

    createJob(user) {
        this.createJobScreen().click();
        this.emailInput().type(user.email);
        this.filterButton().click();
        this.vehicleDropdown().click();
        basePage.firstOption().click();
        this.addService().click();
        this.serviceInput().type(properties.service);
        basePage.firstOption().click();
        this.addServicesButton().click();
    }
}