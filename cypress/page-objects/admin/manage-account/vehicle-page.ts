import {vehicle} from "../../../configuration/properties";
import {BasePage} from "../base-page";
import {isLubeMobile} from "../../../support/utils";

const basePage = new BasePage();

export class VehiclePage {

    vehiclePageNavigation() {
        cy.getDataCy('Vehicles').click();
    }

    vehicleOption() {
        return cy.getDataCy('addVehicle').should('be.visible');
    }

    specialtyOption() {
        return cy.getDataCy('addSpecialty').should('be.visible');
    }

    vinRadioButton() {
        return cy.getDataCy('vinRadioButton');
    }

    vinTab() {
        return cy.getDataCy('vin').should('be.visible');
    }

    addByVin() {
        this.vinTab().last().type(vehicle.vehicleVIN);
    }

    vinError() {
        cy.getDataCy('vinErrorMessage').should('be.visible');
    }

    yearMakeModelRadioButton() {
        return cy.getDataCy('ymmRadioButton');
    }

    yearDropdown() {
        return cy.getDataCy('yearDropdown').should('be.visible');
    }

    selectAYear(year) {
        return cy.get('.mat-option-text').contains(year).click();
    }

    makeDropdown() {
        return cy.getDataCy('makeDropdown');
    }

    selectAMake(make) {
        return cy.get('.mat-option-text').contains(make, {matchCase: false}).click();
    }

    modelDropdown() {
        return cy.getDataCy('modelDropdown');
    }

    selectModel(model) {
        return cy.get('.mat-option-text').contains(model,{matchCase: false}).first().click();
    }

    licensePlateField() {
        return cy.getDataCy('licenseTab').should('be.visible');
    }

    stateDropdown() {
        return cy.getDataCy('stateDropdown').should('be.visible');
    }

    stateOption(state) {
        return cy.get('.mat-option-text').contains(state);
    }

    licensePlateErrors() {
        cy.getDataCy('licenseErrorMessage').should('be.visible');
        cy.getDataCy('stateErrorMessage').should('be.visible');
    }

    vehiclePayment() {
        return cy.getDataCy('vehiclePayment').should('be.visible');
    }

    removeVehicle() {
        return cy.getDataCy('removeVehicle').should('be.visible');
    }

    paymentDropdown() {
        return cy.getDataCy('paymentDropdown').should('be.visible');
    }

    addPaymentButton() {
        return cy.getDataCy('addPaymentButton').should('be.visible');
    }

    informationBanner() {
        cy.get('.mat-chip-list-wrapper >').each(($el, index, $list) => {
            expect($list).to.have.length(7);
        })
    }

    filteredVehicle(make) {
        return cy.get('[role="cell"]').contains(make).should('be.visible');
    }

    licenseVerification() {
        return cy.getDataCy('licensePlate');
    }

    selectHub() {
        cy.getDataCy('selectHub').click();
        basePage.firstOption().click();
    }

    ymmOnlyRequiredFields() {
        this.yearDropdown().click();
        this.selectAYear(vehicle.vehicleYear);
        this.makeDropdown().click();
        this.selectAMake(vehicle.vehicleMake);
        this.modelDropdown().click();
        this.selectModel(vehicle.vehicleModel);
        cy.get('[name="trim"]').click();
        basePage.secondOption().click();
    }

    ymmAllFields() {
        this.ymmOnlyRequiredFields();
        cy.get('[name="engine"]').click();
        basePage.secondOption().click();
        cy.getDataCy('drivetrainDropdown').click();
        basePage.secondOption().click();
        cy.getDataCy('transmissionDropdown').click();
        basePage.secondOption().click();
    }

    specialtyRequiredFields() {
        cy.getDataCy('year').type(vehicle.vehicleYear);
        cy.getDataCy('make').type(vehicle.vehicleMake + 'na');
        cy.getDataCy('model').type(vehicle.vehicleModel);
        cy.getDataCy('trim').type(vehicle.vehicleTrim);
    }

    specialtyAllFields(){
        this.specialtyRequiredFields();
        cy.getDataCy('engine').type(vehicle.vehicleEngine);
        cy.getDataCy('transmission').click();
        basePage.firstOption().click();
        cy.getDataCy('driveTrain').click();
        basePage.firstOption().click();
        cy.getDataCy('licensePlate').type(vehicle.vehicleLicense);
        cy.getDataCy('state').click();
        cy.get('.mat-option-text').contains(vehicle.vehicleState).click();
        if (!isLubeMobile()) cy.getDataCy('vin').last().type(vehicle.vehicleVIN);
        cy.getDataCy('label').type(vehicle.vehicleLabel)
        cy.getDataCy('color').type(vehicle.vehicleColor)
        cy.getDataCy('mileage').type(vehicle.vehicleMileage)
        cy.getDataCy('damage').type(vehicle.vehicleDamage);
        cy.getDataCy('vehicleType').click();
        basePage.firstOption().click();
        cy.getDataCy('fuelType').click();
        basePage.firstOption().click();
    }

    filterTab() {
        return cy.getDataCy('filter');
    }

    specialtyYear() {
        return cy.getDataCy('year');
    }

    specialtyRequiredFieldsClick() {
        cy.getDataCy('year').click();
        cy.getDataCy('make').click();
        cy.getDataCy('model').click();
        cy.getDataCy('trim').click();
    }

    specialtyRequiredFieldsErrors() {
        cy.get('mat-error').contains('Year is required').should('be.visible');
        cy.get('mat-error').contains('Make is required').should('be.visible');
        cy.get('mat-error').contains('Model is required').should('be.visible');
    }

    removeTheLastAddedVehicle() {
        basePage.firstRow().click();
        cy.getDataCy('actionsButton').click();
        cy.getDataCy('removeVehicle').click();
        basePage.confirmButton().click();
        basePage.successToast();
    }

    assignToHub() {
        cy.getDataCy('hubDropdown').click();
        cy.get('mat-option[role=option]').contains('Default').first().click();
    }

    interceptFetchVehicle() {
        cy.intercept('user/fetchvehicle').as('fetchvehicle');
    }

    vehicleYearCell() {
        return cy.get('td[role=cell]').eq(1);
    }

    vehicleVinCell() {
        return cy.get('td[role=cell]').eq(3);
    }
}