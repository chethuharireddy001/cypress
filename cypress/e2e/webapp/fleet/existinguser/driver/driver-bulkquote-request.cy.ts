import { BulkQuoteRequestPage } from "../../../../../page-objects/webapp/bulkquoterequest-page";
import { FleetPage } from "../../../../../page-objects/webapp/fleet-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { VehiclePage } from "../../../../../page-objects/webapp/vehicle-page";
import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import {  isLubemobile } from "../../../../../support/utils";

const fleetPage = new FleetPage();
const servicesPage = new ServicesPage();
const vehiclePage = new VehiclePage();
const bulkQuoteRequestPage = new BulkQuoteRequestPage();
const loginPage = new LoginPage();

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;


describe('webapp/fleet/existinguser/driver/driver-bulkquote-request.cy.ts', () => {

    beforeEach(() => {

        loginPage.loginThroughCustomCredentials(fleet.hubdriver, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        vehiclePage.navigateToFleetVehiclesPageAndVerify();
        vehiclePage.checkBulkQuoteRequestButtonState().should('be.disabled');
        cy.maxWait()
        vehiclePage.clickOnFleetMinionAllVehiclesCheckBox().click({ force: true });
        vehiclePage.checkBulkQuoteRequestButtonState().should('be.enabled').click();
        vehiclePage.mileageTitle();
        fleetPage.footerNextButton().click();
    });

    it("1. Verify alert popup by clicking on 'x' button from bulk quote request intro screen", () => {
        bulkQuoteRequestPage.clickOnXButton();
        bulkQuoteRequestPage.verifyAlertText().should('include.text', fleet.bulkQuoteRequestAlertPopupTitle);
        bulkQuoteRequestPage.verifyCancelBtnOnAlertPopUp().should('include.text', fleet.cancelBtnTxtOnAlertPopUp);
        bulkQuoteRequestPage.verifyCloseBtnOnAlertPopUp().should('include.text', fleet.closeBtnTxtOnAlertPopUp);
    });

    it("2. Verify 'Review Submit button' functionality on category list screen", () => {
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().should('include.text', fleet.reviewAndSubmitBtn).should('not.be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().should('not.be.disabled');
    });

    it('3. Verify user navigation by clicking on "Review Submit" button', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn();
    });

    it('4. Verify "REMOVE VEHICLE" button functionality in vehicle service selection view screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn();
        bulkQuoteRequestPage.verifyBackBtnFromSubmitQuotes().click();
        bulkQuoteRequestPage.verifyRemoveVehicleBtn().click();
        bulkQuoteRequestPage.verifyAlertTitle().should('include.text', fleet.bulkQuoteRequestRemoveVehicleAlertPopupTitle);
        bulkQuoteRequestPage.verifyCancelBtnOnAlertPopUp().should('include.text', fleet.cancelBtnTxtOnAlertPopUp);
        bulkQuoteRequestPage.verifyRemoveBtnOnAlertPopUp().should('include.text', fleet.removeBtnTxtOnAlertPopUp);
    });

    it("5. Verify 'REMOVE' button functionality from remove vehicle alert popup", () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifyBackBtnFromSubmitQuotes().click();
        bulkQuoteRequestPage.verifyRemoveVehicleBtn().click();
        bulkQuoteRequestPage.verifyRemoveBtnOnAlertPopUp().click();
        bulkQuoteRequestPage.verifyVehicleCount().should('have.length', 1);
    });

    it("6. Verify 'CANCEL' button functionality from remove vehicle alert popup", () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifyBackBtnFromSubmitQuotes().click();
        bulkQuoteRequestPage.verifyRemoveVehicleBtn().click();
        bulkQuoteRequestPage.verifyCancelBtnOnAlertPopUp().click();
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().should('not.be.disabled');
    });

    it("7. Verify 'APPLY TO' for other vehicle", () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.selectVehicleInOverview(1).should('be.visible').click();
        bulkQuoteRequestPage.verifyApplyToBtn(fleet.radiatorReplacement).click();
        bulkQuoteRequestPage.selectFirstVehicleInApplyServiceView(fleet.vehicleName3).scrollIntoView().should('be.visible').click({ force: true });
        bulkQuoteRequestPage.verifyDoneBtn().click();
        bulkQuoteRequestPage.selectVehicleInOverview(2).should('be.visible').click();
        bulkQuoteRequestPage.verifyAppliedService(fleet.radiatorReplacement).should('be.visible');
    });

    it("8. Verify 'ALL' checkbox functionality in vehicle service selection view screen", () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.selectVehicleInOverview(1).should('be.visible').click();
        bulkQuoteRequestPage.verifyApplyToBtn(fleet.radiatorReplacement).click();
        bulkQuoteRequestPage.verifyAllCheckBox().scrollIntoView().should('be.visible').click({ force: true });
        bulkQuoteRequestPage.verifyDoneBtn().should('be.visible').click();
        bulkQuoteRequestPage.selectVehicleInOverview(2).should('be.visible').click();
        bulkQuoteRequestPage.verifyAppliedService(fleet.radiatorReplacement).should('be.visible');
    });

    it('9. Verify warning message if user service with options, like brake jobs, gets added via apply to to another vehicle in vehicle service selection view screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        if (lm) {
            bulkQuoteRequestPage.selectService(fleet.intervalServices);
        } else {
            bulkQuoteRequestPage.selectService(fleet.breakPadReplacement);
        }
        bulkQuoteRequestPage.verifySelectServiceBtnOnPopUp().should('be.visible').click();
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectVehicleInOverview(1).should('be.visible').click();
        if (lm) {
            bulkQuoteRequestPage.verifyApplyToBtn(fleet.intervalServices).click();
        } else {
            bulkQuoteRequestPage.verifyApplyToBtn(fleet.breakPadReplacement).click();
        }

        bulkQuoteRequestPage.selectFirstVehicleInApplyServiceView(fleet.vehicleName3).scrollIntoView().should('be.visible').click({ force: true });
        bulkQuoteRequestPage.verifyDoneBtn().click();
        bulkQuoteRequestPage.selectVehicleInOverview(2).should('be.visible').click();
        if (lm) {
            bulkQuoteRequestPage.verifyServiceWarningMsg(fleet.intervalServices).should('include.text', fleet.serviceWarningMsg);
            bulkQuoteRequestPage.verifyServiceEditOption(fleet.intervalServices).should('include.text', fleet.editOptions);
        } else {
            bulkQuoteRequestPage.verifyServiceWarningMsg(fleet.breakPadReplacement).should('include.text', fleet.serviceWarningMsg);
            bulkQuoteRequestPage.verifyServiceEditOption(fleet.breakPadReplacement).should('include.text', fleet.editOptions);
        }

    });

    it('10. Verify "Edit Options" button functionlaity in vehicle service selection view screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');

        if (lm) {
            bulkQuoteRequestPage.selectService(fleet.intervalServices);
        } else {
            bulkQuoteRequestPage.selectService(fleet.breakPadReplacement);
        }
        bulkQuoteRequestPage.verifySelectServiceBtnOnPopUp().should('be.visible').click();
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectVehicleInOverview(1).should('be.visible').click();
        if (lm) {
            bulkQuoteRequestPage.verifyApplyToBtn(fleet.intervalServices).click();
        } else {
            bulkQuoteRequestPage.verifyApplyToBtn(fleet.breakPadReplacement).click();
        }
        bulkQuoteRequestPage.selectFirstVehicleInApplyServiceView(fleet.vehicleName3).scrollIntoView().should('be.visible').click({ force: true });
        cy.minWait();
        bulkQuoteRequestPage.verifyDoneBtn().click();
        cy.log(".......2")
        bulkQuoteRequestPage.selectVehicleInOverview(2).should('be.visible').click();
        if (lm) {
            bulkQuoteRequestPage.verifyServiceEditOption(fleet.intervalServices).click({ force: true });
        } else {
            bulkQuoteRequestPage.verifyServiceEditOption(fleet.breakPadReplacement).click({ force: true });
        }
        cy.log(".......3")
        bulkQuoteRequestPage.verifySelectServiceBtnOnPopUp().click();
        cy.minWait();
        if (lm) {
            bulkQuoteRequestPage.verifyMessage(fleet.intervalServices).should('not.include.text', fleet.serviceWarningMsg);
        } else {
            bulkQuoteRequestPage.verifyMessage(fleet.breakPadReplacement).should('not.include.text', fleet.serviceWarningMsg);
        }

    });

    it('11. Verify "No Service" warning message functionality from vehicle service seletion view screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectVehicleInOverview(1).should('be.visible').click();
        bulkQuoteRequestPage.selectServiceInOverview(fleet.radiatorReplacement).should('be.visible').click();
    });

    it('12. Verify "OVERVIEW" button functionlaity if no service in vehicle service selection view screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn().should('not.be.disabled');
        bulkQuoteRequestPage.clickOnVehicleInOverviewPage(0).scrollIntoView().should('be.visible').click();
        bulkQuoteRequestPage.getServiceNameFromOverviewPage(0).should('include.text', fleet.radiatorReplacement);
        bulkQuoteRequestPage.clickOnVehicleInOverviewPage(1).scrollIntoView().should('be.visible').click();
        bulkQuoteRequestPage.getServiceNameFromOverviewPage(1).should('include.text', fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySubmitQuotesBtn().should('not.be.focused');
    });

    it('13. Submit service request for 2 vehicles', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn().should('not.be.disabled').click();

    });

    it('14. Verify vehicle and services list from "Overview" screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn().should('be.visible');
        bulkQuoteRequestPage.clickOnVehicleInOverviewPage(0).scrollIntoView().should('be.visible').click();
        bulkQuoteRequestPage.getServicesNamesFromOverViewPage(0, 1).should('include.text', fleet.radiatorReplacement);
        bulkQuoteRequestPage.getServicesNamesFromOverViewPage(0, 2).should('include.text', fleet.alternatorReplacement);
        bulkQuoteRequestPage.clickOnVehicleInOverviewPage(1).scrollIntoView().should('be.visible').click();
        bulkQuoteRequestPage.getServicesNamesFromOverViewPage(1, 1).should('include.text', fleet.batteryReplacement);
        bulkQuoteRequestPage.getServicesNamesFromOverViewPage(1, 2).should('include.text', fleet.starterReplacement);
        bulkQuoteRequestPage.verifyEditAndRemoveBtn(1).should('include.text', fleet.editBtn).should('include.text', fleet.removeBtn);
        bulkQuoteRequestPage.verifyEditAndRemoveBtn(2).should('include.text', fleet.editBtn).should('include.text', fleet.removeBtn);
    });

    it('15. Verify "Edit" button functionality from "Overview" screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.editBtnInOverviewScreen(0).scrollIntoView().should('include.text', fleet.editBtn).click({ force: true });
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().should('not.be.disabled');
        bulkQuoteRequestPage.verifyAppliedService(fleet.radiatorReplacement).should('be.visible');
    });

    it('16. Verify "Remove" button functionality from "Overview" screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifyListOfVehilcesAndServicesInSubmitQuotes().should('have.length', 2);
        bulkQuoteRequestPage.verifyEditAndRemoveBtn(2, 2).should('include.text', fleet.removeBtn).click({ force: true });
        bulkQuoteRequestPage.verifyRemoveVehicleAlertTxt().should('include.text', fleet.removeVehicleAlertTxt);
        bulkQuoteRequestPage.verifyCancelBtnOnAlertPopUp().should('include.text', fleet.cancelBtnTxtOnAlertPopUp);
        bulkQuoteRequestPage.verifyCloseBtnOnAlertPopUp().should('include.text', fleet.removeBtn);
    });

    it('17. Verify "REMOVE" button functionality from remove vehicle alert popup from "Overview" screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifyListOfVehilcesAndServicesInSubmitQuotes().should('have.length', 2);
        bulkQuoteRequestPage.verifyEditAndRemoveBtn(2, 2).should('include.text', fleet.removeBtn).click({ force: true });
        bulkQuoteRequestPage.verifyRemoveVehicleAlertTxt().should('include.text', fleet.removeVehicleAlertTxt);
        bulkQuoteRequestPage.verifyCloseBtnOnAlertPopUp().should('include.text', fleet.removeBtn).click();
        bulkQuoteRequestPage.verifyListOfVehilcesAndServicesInSubmitQuotes().should('have.length', 1);
    });

    it('18. Verify "CANCEL" button functionality from remove vehicle alert popup from "Overview" screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifyListOfVehilcesAndServicesInSubmitQuotes().should('have.length', 2);
        bulkQuoteRequestPage.verifyEditAndRemoveBtn(2, 2).should('include.text', fleet.removeBtn).click({ force: true });
        bulkQuoteRequestPage.verifyRemoveVehicleAlertTxt().should('include.text', fleet.removeVehicleAlertTxt);
        bulkQuoteRequestPage.verifyCancelBtnOnAlertPopUp().should('include.text', fleet.cancelBtnTxtOnAlertPopUp).click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn().should('be.visible');
    });

    it('19. Verify "BACK" button functionality in "Submit Quotes" screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn().should('be.visible');
        bulkQuoteRequestPage.verifyBackBtnFromSubmitQuotes().should('be.visible').click();
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().should('not.be.disabled');
    });

    it('20. Verify "SUBMIT QUOTES" button functionality in Overview screen', () => {
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.radiatorReplacement);
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.starterReplacement);
        bulkQuoteRequestPage.selectService(fleet.starterReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn().should('be.visible').click();
        bulkQuoteRequestPage.verifyBulkQuotePage();
    });
});

