import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {VehiclePage} from "../../../../../page-objects/admin/manage-account/vehicle-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {lmUser, vehicle, wrenchUser} from "../../../../../configuration/properties";
import {isLubeMobile} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const vehiclePage = new VehiclePage();
const basePage = new BasePage();
function removeVehicle() {
    basePage.kebabButton().click();
    vehiclePage.removeVehicle().click();
    basePage.confirmButton().click();
    basePage.successToast();
}
function addVehicle() {
    basePage.addButton().click();
    vehiclePage.vehicleOption().click();
    vehiclePage.yearMakeModelRadioButton().click();
    vehiclePage.ymmOnlyRequiredFields();
    vehiclePage.interceptFetchVehicle();
    basePage.popUpAddButton().click();
}

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('/manage-account/user/verify-vehicle-tab.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        vehiclePage.vehiclePageNavigation();
    })
    it('verify list vehicles button', () => {
        addVehicle();
        cy.minWait();
        basePage.orgButton().click();
        manageAccountPage.header().should('include.text', 'Vehicles');
        basePage.firstRow().click();
        removeVehicle();
    })
    it('verify vehicles actions button > remove vehicle', () => {
        addVehicle();
        basePage.successToast();
        removeVehicle();
    })
    it('verify specialty actions button > remove vehicle', () => {
        basePage.addButton().click();
        vehiclePage.specialtyOption().click();
        vehiclePage.specialtyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.kebabButton().click();
        vehiclePage.removeVehicle().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('verify information banner', () => {
        addVehicle();
        vehiclePage.informationBanner();
    })
})