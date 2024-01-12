import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {VehiclePage} from "../../../../../page-objects/admin/manage-account/vehicle-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {vehicle} from "../../../../../configuration/properties";
import {isLubeMobile, Utils} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const vehiclePage = new VehiclePage();
const basePage = new BasePage();
const utils = new Utils();
function removeVehicle() {
    basePage.kebabButton().click();
    vehiclePage.removeVehicle().click();
    basePage.confirmButton().click();
    basePage.successToast();
}

let plate, state;
let vin = vehicle.vehicleVIN;
isLubeMobile() ? plate = vehicle.lmLicensePlate : plate = vehicle.vehicleLicensePlate;
isLubeMobile() ? state = vehicle.lmLicenseState : state = vehicle.licenseVehicleState;

describe('/manage-account/organization/add-vehicle.cy.ts', () => {
    beforeEach(() => {
         cy.login();
         manageAccountPage.navigateToManageAccount();
         manageAccountPage.deleteOrgViaSQL();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createOrgViaApi();
         manageAccountPage.findOrg();
         vehiclePage.vehiclePageNavigation();
         basePage.addButton().click();
    })
    // @ts-ignore
    it('add vehicle by year make and model', {tags: '@smoke'}, () => {
        vehiclePage.vehicleOption().click();
        vehiclePage.yearMakeModelRadioButton().click();
        vehiclePage.ymmOnlyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.successToast();
        cy.location('search').should('contain', 'vehicleId');
        basePage.backToListButton().click();
        vehiclePage.vehicleYearCell().should('include.text', vehicle.vehicleYear);
        basePage.firstRow().click();
        removeVehicle();
    })
    // @ts-ignore
    it.skip('add vehicle by license plate', {tags: '@smoke'}, () => { //waiting for UAT support for this
        vehiclePage.vehicleOption().click();
        cy.minWait();
        vehiclePage.licensePlateField().type(plate);
        cy.minWait();
        vehiclePage.stateDropdown().click();
        vehiclePage.stateOption(state).click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        cy.location('search').should('contain', 'vehicleId');
        utils.assertViaVal(vehiclePage.licenseVerification(), plate);
        removeVehicle();
    })
    // @ts-ignore
    it('add vehicle by vin', {tags: '@smoke'}, () => {
        if (!isLubeMobile()) {
            vehiclePage.vehicleOption().click();
            vehiclePage.vinRadioButton().click();
            vehiclePage.vinTab().type(vin);
            basePage.popUpAddButton().click();
            basePage.successToast();
            cy.location('search').should('contain', 'vehicleId');
            basePage.backToListButton().click();
            vehiclePage.vehicleVinCell().should('include.text', vin);
            basePage.firstRow().click();
            removeVehicle();
        }
    })
    it('add specialty', () => {
        vehiclePage.specialtyOption().click();
        vehiclePage.selectHub();
        vehiclePage.specialtyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.successToast();
        removeVehicle();
    })
})
