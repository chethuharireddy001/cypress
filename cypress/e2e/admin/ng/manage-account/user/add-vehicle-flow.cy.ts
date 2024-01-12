import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {VehiclePage} from "../../../../../page-objects/admin/manage-account/vehicle-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {lmUser, vehicle, wrenchUser} from "../../../../../configuration/properties";
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
let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

let plate, state;
isLubeMobile() ? plate = vehicle.lmLicensePlate : plate = vehicle.vehicleLicensePlate;
isLubeMobile() ? state = vehicle.lmLicenseState : state = vehicle.licenseVehicleState;

//TODO: year and make required error message
describe('/manage-account/user/add-vehicle-flow.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        vehiclePage.vehiclePageNavigation();
        basePage.addButton().click();
        vehiclePage.vehicleOption().click();
    })
    // @ts-ignore
    it('1. adding a vehicle by year make and model - (only required fields) and removing', {tags: '@smoke'}, () => {
        vehiclePage.yearMakeModelRadioButton().click();
        vehiclePage.ymmOnlyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.ngWaitForPageToLoad();
        basePage.header().should('include.text', 'Edit Vehicle');
        utils.assertViaText(vehiclePage.modelDropdown(), vehicle.vehicleModel);
        removeVehicle();
    })
    it('2. adding vehicle by year make and model - all fields', () => {
        vehiclePage.yearMakeModelRadioButton().click();
        vehiclePage.ymmAllFields();
        basePage.popUpAddButton().click();
        basePage.header().should('include.text', 'Edit Vehicle');
    })
    // @ts-ignore
    it('3. add a new vehicle by vin', {tags: '@smoke'}, () => {
        if (!isLubeMobile()) {
            vehiclePage.vinRadioButton().click();
            vehiclePage.addByVin();
            basePage.popUpAddButton().click();
            basePage.ngWaitForPageToLoad();
            basePage.header().should('include.text', 'Edit Vehicle');
            utils.assertViaVal(vehiclePage.vinTab(), vehicle.vehicleVIN);
        }
    })
    // @ts-ignore
    it.skip('4. add a new vehicle by license plate', {tags: '@smoke'}, () => { // skip this until the UAT supports vehicle lookup
        vehiclePage.licensePlateField().click().type(plate);
        vehiclePage.stateDropdown().click();
        vehiclePage.stateOption(state).click();
        basePage.popUpAddButton().click();
        basePage.header().should('include.text', 'Edit Vehicle');
    })
    it('5. verify vin is required error message', () => {
        if (!isLubeMobile()) {
            vehiclePage.vinRadioButton().click();
            vehiclePage.vinTab().last().click();
            basePage.header().last().click();
            vehiclePage.vinError();
        }
    })
    it('6. verify license plate error messages', () => {
        vehiclePage.licensePlateField().click();
        vehiclePage.stateDropdown().click();
        basePage.backDrop();
        vehiclePage.licensePlateErrors();
    })
})

describe('/manage-account/user/add-vehicle-flow.cy.ts (specialty)', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.findUser();
        vehiclePage.vehiclePageNavigation();
        basePage.addButton().click();
        vehiclePage.specialtyOption().click();
    })
    it('8. add specialty with all fields then remove', () => {
        vehiclePage.specialtyAllFields();
        basePage.popUpAddButton().click();
        basePage.header().should('include.text', 'Edit Specialty Vehicle');
        utils.assertViaVal(vehiclePage.specialtyYear(), vehicle.vehicleYear);
        removeVehicle();
    })
    it('9. add specialty only required fields', () => {
        vehiclePage.specialtyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.header().should('include.text', 'Edit Specialty Vehicle');
        utils.assertViaVal(vehiclePage.specialtyYear(), vehicle.vehicleYear);
    })
    it('10. verify required field error messages', () => {
        vehiclePage.specialtyRequiredFieldsClick();
        vehiclePage.specialtyRequiredFieldsErrors();
    })
    it('11. verify x button', () => {
        basePage.header().should('include.text', 'Add Specialty Vehicle');
        basePage.xButton();
        manageAccountPage.header().should('not.include.text', 'Add Specialty Vehicle');
    })
})