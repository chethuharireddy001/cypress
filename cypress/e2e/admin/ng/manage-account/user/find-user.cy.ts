import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {VehiclePage} from "../../../../../page-objects/admin/manage-account/vehicle-page";
import {lmUser, vehicle, wrenchUser} from "../../../../../configuration/properties";
import {isLubeMobile} from "../../../../../support/utils";
import {BasePage} from "../../../../../page-objects/admin/base-page";

const manageAccountPage = new ManageAccountPage();
const vehiclePage = new VehiclePage();
const basePage = new BasePage();
function addVehicleByVin() {
    vehiclePage.vehiclePageNavigation();
    basePage.addButton().click();
    vehiclePage.vehicleOption().click();
    vehiclePage.vinRadioButton().click();
    vehiclePage.addByVin();
    basePage.popUpAddButton().click();
}

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

let plate, state;
isLubeMobile() ? plate = vehicle.lmLicensePlate : plate = vehicle.vehicleLicensePlate;
isLubeMobile() ? state = vehicle.lmLicenseState : state = vehicle.licenseVehicleState;

describe('/manage-account/user/find-user.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
    })
    // @ts-ignore
    it('find user with User Id', {tags: '@smoke'}, () => {
        manageAccountPage.findUser();
        manageAccountPage.userIdChip().invoke('text').then(text => {
            const arr = text.split(" ");
            const idText = arr[1];
            manageAccountPage.navigateToManageAccount();
            manageAccountPage.userId().type(idText);
            manageAccountPage.searchButton().first().click();
            basePage.firstRow();
        })
    })
    it('find user with Email', () => {
        manageAccountPage.userEmail().type(user.email);
        manageAccountPage.searchButton().first().click();
        manageAccountPage.userEmailChip().should('have.text', 'Email: ' + user.email);
    })
    it('find user with Phone', () => {
        manageAccountPage.userPhone().type(user.phone);
        manageAccountPage.searchButton().first().click();
        manageAccountPage.phoneColumn().eq(1).should('include.text', user.phone);
    })
    it('find user with First name', () => {
        manageAccountPage.userFirstName().type(user.firstName);
        manageAccountPage.searchButton().first().click();
        manageAccountPage.firstNameColumn().eq(1).should('have.text', user.firstName);
    })
    it('find user with Last name', () => {
        manageAccountPage.userLastName().type(user.lastName);
        manageAccountPage.searchButton().first().click();
        manageAccountPage.lastNameColumn().eq(1).should('have.text', user.lastName);
    })
    it('find user with VIN', () => {
        if (!isLubeMobile()) {
            manageAccountPage.findUser();
            addVehicleByVin();
            manageAccountPage.navigateToManageAccount();
            manageAccountPage.userVIN().type(vehicle.vehicleVIN);
            manageAccountPage.searchButton().first().click();
            manageAccountPage.firstUser();
        }
    })
    it.skip('find user with license plate', () => { //skip this until wrench uat supports vehicle lookup
        //TODO: rewrite this, why is it asking for new window?
        //TODO: just go to the user and verify that that vehicle is there
        manageAccountPage.findUser();
        vehiclePage.vehiclePageNavigation();
        basePage.addButton().click();
        vehiclePage.vehicleOption().click();
        vehiclePage.licensePlateField().click().type(plate);
        vehiclePage.stateDropdown().click();
        vehiclePage.stateOption(state).click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.userLicense().type(plate);
        manageAccountPage.searchButton().first().click();
        manageAccountPage.firstUser();
    })
    it('search reset', () => {
        manageAccountPage.userId().type('0');
        manageAccountPage.userFirstName().type(user.firstName);
        manageAccountPage.userLastName().type(user.lastName);
        manageAccountPage.userEmail().type(user.email);
        manageAccountPage.userPhone().type(user.phone);
        manageAccountPage.userVIN().type(vehicle.vehicleVIN);
        manageAccountPage.userLicense().type(vehicle.vehicleLicensePlate);
        manageAccountPage.resetButton().first().click();
        manageAccountPage.allSearchFieldsEmpty();
    })
})