import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { QuotesPage } from "../../../../../page-objects/webapp/quotes-page";
import { AppointmentsPage } from "../../../../../page-objects/webapp/appointments-page";
import { BulkQuoteRequestPage } from "../../../../../page-objects/webapp/bulkquoterequest-page";
import { BulkSchedulePage } from "../../../../../page-objects/webapp/bulkschedule-page";
import { FleetPage } from "../../../../../page-objects/webapp/fleet-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { VehiclePage } from "../../../../../page-objects/webapp/vehicle-page";
import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { isLubemobile } from "../../../../../support/utils";
import { AccountsPage } from "../../../../../page-objects/webapp/accounts-page";

const fleetPage = new FleetPage();
const bulkQuoteRequestPage = new BulkQuoteRequestPage();
const bulkSchedulePage = new BulkSchedulePage();
const loginPage = new LoginPage();
const quotesPage = new QuotesPage();
const appointmentsPage = new AppointmentsPage();
const vehiclePage = new VehiclePage();
const servicesPage = new ServicesPage();
const accountsPage=new AccountsPage();

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/driver/driver-bulk-schedule.cy.ts', () => {

    before(() => {
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetadmin, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        accountsPage.navigateToApprovalLimitsPageAndVerify();
        accountsPage.approvalLimitsTitle().should('contain', 'Approval Limits');
        accountsPage.approvalQuoteOnRadioButton().click();
        accountsPage.approvalsUpdatebutton().click();
        cy.minWait();
        loginPage.navigateToLoginPageAndVerify();
        loginPage.loginThroughCustomCredentials(fleet.hubdriver, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        vehiclePage.navigateToFleetVehiclesPageAndVerify();
        cy.avgWait();
        vehiclePage.clickOnFleetMinionAllVehiclesCheckBox().click({force:true});
        vehiclePage.checkBulkQuoteRequestButtonState().should('be.enabled').click();
        vehiclePage.mileageTitle();
        vehiclePage.updateMilageOneField().click();
        vehiclePage.updateMilageTwoField().click();
        fleetPage.footerNextButton().click();
        bulkQuoteRequestPage.selectVehicle(1).should('be.enabled');
        bulkQuoteRequestPage.selectService(fleet.alternatorReplacement);
        bulkQuoteRequestPage.selectVehicle(2).should('be.visible').click();
        bulkQuoteRequestPage.verifySearchTxtField().type(fleet.batteryReplacement);
        bulkQuoteRequestPage.selectService(fleet.batteryReplacement);
        bulkQuoteRequestPage.verifyReviewAndSubmitBtn().click();
        bulkQuoteRequestPage.verifySubmitQuotesBtn();
        bulkQuoteRequestPage.verifySubmitQuotesBtn().should('be.visible').click();
        bulkQuoteRequestPage.verifyBulkQuotePage();
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetadmin, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        quotesPage.masterQuotesApproval();
    });


    beforeEach(() => {
        loginPage.loginThroughCustomCredentials(fleet.hubdriver, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        quotesPage.navigateFleetQuotes();

    });

    it('1. Verify Bulk Schedule entry page',{ retries: 1 }, () => {
        bulkSchedulePage.verifyMinionquotesPage();
        bulkSchedulePage.verifyBulkSchedulerbutton().click();
        bulkSchedulePage.verifyBulkScheduleIntroductionPage();
    });

    it('2. Verify close button with confirmation continue functionality', () => {
        bulkSchedulePage.verifyBulkSchedulerbutton().click();
        bulkSchedulePage.verifyXButton().click();
        bulkSchedulePage.verifyConfirmationDialogueContinue().click();
        bulkSchedulePage.verifyMinionquotesPage();
    });

    it('3. Verify Close button with Confirmation cancel functionality', () => {
        bulkSchedulePage.verifyBulkSchedulerbutton().click();
        bulkSchedulePage.verifyXButton().click();
        bulkSchedulePage.verifyConfirmationCancelButton().click();
        bulkSchedulePage.verifyBulkScheduleIntroductionPage();
    });

    it('4.Verify Location selection functionality', () => {
        bulkSchedulePage.verifyBulkSchedulerbutton().click();
        bulkSchedulePage.verifyLocationButton().click();
        bulkSchedulePage.verifyBulkScheduleLocationPage();
        bulkSchedulePage.selectLocation();
        bulkSchedulePage.verifyBulkScheduleQuotesPage();
    });

    it('5.Verify selection of quotes', () => {
        bulkSchedulePage.verifyBulkSchedulerbutton().click();
        bulkSchedulePage.verifyLocationButton().click();
        bulkSchedulePage.selectLocation();
        bulkSchedulePage.verifyBulkScheduleQuotesPage();
        bulkSchedulePage.selectQuotesPage();
        quotesPage.nextQuotesButton().click();
        bulkSchedulePage.verifyBulkScheduleSchedulePage();
    });

    it('6. Verify Scheduling services', () => {
        bulkSchedulePage.verifyBulkSchedulerbutton().click();
        bulkSchedulePage.verifyLocationButton().click();
        bulkSchedulePage.selectLocation();
        bulkSchedulePage.verifyBulkScheduleQuotesPage();
        bulkSchedulePage.selectQuotesPage();
        quotesPage.nextQuotesButton().click();
        bulkSchedulePage.verifyBulkScheduleSchedulePage();
        bulkSchedulePage.scheduleAppointmentsPage();
        appointmentsPage.verifyFleetAppointmentsPage();
        appointmentsPage.cancelAllPendingAppointments();
        appointmentsPage.verifyFleetAppointmentsPage();

    });
});