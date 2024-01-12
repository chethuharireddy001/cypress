import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {PaymentPage} from "../../../../../page-objects/admin/manage-account/payment-page";
import {VehiclePage} from "../../../../../page-objects/admin/manage-account/vehicle-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {isLubeMobile} from "../../../../../support/utils";
import {vehicle} from "../../../../../configuration/properties";

const manageAccountPage = new ManageAccountPage();
const paymentPage = new PaymentPage();
const vehiclePage = new VehiclePage();
const basePage = new BasePage();

let plate, state;
isLubeMobile() ? plate = vehicle.lmLicensePlate : plate = vehicle.vehicleLicensePlate;
isLubeMobile() ? state = vehicle.lmLicenseState : state = vehicle.licenseVehicleState;


describe('/manage-account/organization/add-payment.spec.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.deleteOrgViaSQL();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createOrgViaApi();
        manageAccountPage.findOrg();
        paymentPage.paymentsPage().click();
        paymentPage.addPaymentButton().click();
    })
    // @ts-ignore
    it('1. verify adding and removing payment', {tags: '@smoke'}, () => {
        paymentPage.addOrgPayment();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        paymentPage.removePaymentButton().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('2. verify cancelling on adding payment', () => {
        basePage.header().should('include.text', 'Add Payment');
        basePage.xButton();
        cy.get('p').should('not.include.text', 'Add Payment');
    })
    it('3. add cash', () => {
        paymentPage.paymentTypesTab().click();
        basePage.thisOption('Cash').click();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
    })
    it('4. verify actions button > mark as default', () => {
        paymentPage.addOrgPayment();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        paymentPage.setDefault().click();
        basePage.confirmButton().click();
        basePage.successToast();
        paymentPage.checkMark2();
        basePage.kebabButton().click();
        paymentPage.removePaymentButton().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('5. add payment to a vehicle', () => {
        paymentPage.addOrgPayment();
        paymentPage.addPaymentPopUp().click();
        vehiclePage.vehiclePageNavigation();
        basePage.addButton().click();
        vehiclePage.vehicleOption().click();
        cy.minWait();
        vehiclePage.yearMakeModelRadioButton().click();
        vehiclePage.ymmOnlyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.kebabButton().click();
        vehiclePage.vehiclePayment().click();
        vehiclePage.paymentDropdown().click();
        basePage.firstOption().click();
        vehiclePage.addPaymentButton().click();
        basePage.successToast();
    })
    it('6. add payment to region and make regional payment default', () => {
        paymentPage.addOrgPaymentToRegion();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        paymentPage.setDefault().click();
        basePage.confirmButton().click();
        basePage.successToast();
        paymentPage.defaultPaymentCheck().should('be.visible').and('include.text', 'Default Region')
        basePage.orgButton().click();
        paymentPage.defaultPaymentCheck().should('be.visible').and('include.text', 'Default Region')
    })
    it('7. add payment to hub and make hub payment default', () => {
        paymentPage.addOrgPayment();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        paymentPage.setDefault().click();
        basePage.confirmButton().click();
        basePage.successToast();
        paymentPage.defaultPaymentCheck().should('be.visible').and('include.text', 'Default Hub')
        basePage.orgButton().click();
        paymentPage.defaultPaymentCheck().should('be.visible').and('include.text', 'Default Hub')
    })
    it('8. verify default payments cant be assigned to vehicles', () => {
        paymentPage.addOrgPayment();
        paymentPage.addPaymentPopUp().click();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        paymentPage.setDefault().click();
        basePage.confirmButton().click();
        vehiclePage.vehiclePageNavigation();
        basePage.addButton().click();
        vehiclePage.vehicleOption().click();
        vehiclePage.yearMakeModelRadioButton().click();
        vehiclePage.ymmOnlyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.kebabButton().click();
        vehiclePage.vehiclePayment().click();
        vehiclePage.paymentDropdown().click();
        basePage.firstOption().click();
        paymentPage.addPaymentButton().click();
        basePage.ngErrorToast();
    })
})