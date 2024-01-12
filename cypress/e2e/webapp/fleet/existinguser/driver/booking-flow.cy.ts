import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { SchedulePage } from "../../../../../page-objects/webapp/schedule-page";
import { AccountsPage } from "../../../../../page-objects/webapp/accounts-page";
import { AppointmentsPage } from "../../../../../page-objects/webapp/appointments-page";
import { FleetPage } from "../../../../../page-objects/webapp/fleet-page";
import { LocationPage } from "../../../../../page-objects/webapp/location-page";
import { PaymentPage } from "../../../../../page-objects/webapp/payment-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { VehiclePage } from "../../../../../page-objects/webapp/vehicle-page";
import { AddOnsPage } from "../../../../../page-objects/webapp/add-ons-page";
import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { SummaryPage } from "../../../../../page-objects/webapp/summary-page";
import { isLubemobile } from "../../../../../support/utils";


const fleetPage = new FleetPage();
const loginPage = new LoginPage();
const servicesPage = new ServicesPage();
const vehiclePage = new VehiclePage();
const addOnsPage = new AddOnsPage();
const accountsPage = new AccountsPage();
const locationPage = new LocationPage();
const schedulePage = new SchedulePage();
const paymentPage = new PaymentPage();
const appointmentsPage = new AppointmentsPage();
const summaryPage = new SummaryPage();


const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/driver/booking-flow.cy.ts', () => {

    before(() => {
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetadmin, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        accountsPage.navigateToApprovalLimitsPageAndVerify();
        accountsPage.approvalLimitsTitle().should('contain', 'Approval Limits');
        accountsPage.approvalQuoteOffRadioButton().click();
        accountsPage.approvalsUpdatebutton().click();
    });

    beforeEach(() => {
        loginPage.navigateToLoginPageAndVerify();
        loginPage.loginThroughCustomCredentials(fleet.hubdriver, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        vehiclePage.navigateToBookVehicles();
        vehiclePage.vehicleSearchOption().type(fleet.vehicleName2).click();
        cy.minWait();
        vehiclePage.selectOneVehicleSitewide().click();
        vehiclePage.vehicleNextButton();
        vehiclePage.mileageTitle();
        vehiclePage.updateMilageOneField().click();
        fleetPage.footerNextButton().click();
        locationPage.locationNextButton().click();
        fleetPage.footerNextButton().click();
        if (!lm) {
            servicesPage.servicesIDontKnow().should("contain", "Diagnose my problem");
        }
        servicesPage.selectService(fleet.batteryReplacement).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.servicesNotesButton().click().type(fleet.batteryReplacementServiceNotes, { delay: 100 }).should('have.value', fleetUsers.batteryReplacementServiceNotes);
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        if (!lm) {
            servicesPage.addOnsNextButton().click({ force: true });
            schedulePage.scheduleBackButton().click();
            servicesPage.addOnsNextButton().click({ force: true });
        }
        schedulePage.verifySchedulePage();
        schedulePage.scheduleHeader();
        if (!lm) {
            schedulePage.scheduleDayOfterTomorrow();
        }
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.scheduleNextButton().click();
        if (!lm) {
            paymentPage.paymentNextButton();
        }
    });

    after(() => {
        appointmentsPage.cancelAllPendingAppointments();
        appointmentsPage.noJobsFoundDescription();

    });

    it('1. submit jobrequest should not need approval', () => {

        paymentPage.confirmBookAppointment().click();
    });

    it('2. Add services, edit location notesx, edit time , edit payment in confirm page', () => {

        summaryPage.addServicesSummaryBtn().first().click();
        if (lm) {
            servicesPage.selectService(fleet.breakPadsReplacement).click();
        } else { servicesPage.selectService(fleet.breakPadReplacement).click(); }
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        summaryPage.loactionEdit().first().click();
        locationPage.locationKeyDetails().type(fleet.keyNotes);
        summaryPage.saveButton().click();
        summaryPage.timeEdit().first().click();
        schedulePage.earlierAppointmentCheckbox().click();
        summaryPage.saveButton().click();
        if (!lm) {
            summaryPage.paymentEdit().first().click();
            paymentPage.addPaymentSelector();
            paymentPage.fillNewCreditCardDetails();
            summaryPage.saveButton().click();
        }
        appointmentsPage.confirmBookAppointment().click();
        appointmentsPage.verifyAppointmentsPage();
    });

});
