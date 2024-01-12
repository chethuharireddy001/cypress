import { QuotesPage } from "../../../../../page-objects/webapp/quotes-page";
import { VehiclePage } from "../../../../../page-objects/webapp/vehicle-page";
import { FleetPage } from "../../../../../page-objects/webapp/fleet-page";
import { LocationPage } from "../../../../../page-objects/webapp/location-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { SchedulePage } from "../../../../../page-objects/webapp/schedule-page";
import { AppointmentsPage } from "../../../../../page-objects/webapp/appointments-page";
import { PaymentPage } from "../../../../../page-objects/webapp/payment-page";
import { SummaryPage } from "../../../../../page-objects/webapp/summary-page";
import { isLubemobile } from "../../../../../support/utils";

const fleetPage = new FleetPage();
const quotesPage = new QuotesPage();
const locationPage = new LocationPage();
const servicesPage = new ServicesPage();
const vehiclePage = new VehiclePage();
const loginPage = new LoginPage();
const schedulePage = new SchedulePage();
const appointmentsPage = new AppointmentsPage();
const paymentPage = new PaymentPage();
const summaryPage = new SummaryPage()

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/fleet-administrator/booking-flow.cy.ts', () => {

    beforeEach(() => {

        loginPage.loginThroughCustomCredentials(fleet.migratedFleetadmin, fleet.migratedFleetPassword);
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

    it('1. book-a-appointment-and-delete', () => {

        paymentPage.confirmBookAppointment().click();
        appointmentsPage.verifyAppointmentsPage();
        appointmentsPage.cancelAllPendingAppointments();
        appointmentsPage.noJobsFoundDescription();
    });

    it('2. Add services, edit location notesx, edit time , edit payment in confirm page', () => {

        summaryPage.addServicesSummaryBtn().first().click();
        if (lm) { servicesPage.selectService(fleet.breakPadsReplacement).click();   
        } else { servicesPage.selectService(fleet.breakPadReplacement).click();}
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
        appointmentsPage.cancelAllPendingAppointments();
        appointmentsPage.noJobsFoundDescription();
    });
});