import { SchedulePage } from "../../../../page-objects/webapp/schedule-page";
import { AddOnsPage } from "../../../../page-objects/webapp/add-ons-page";
import { AppointmentsPage } from "../../../../page-objects/webapp/appointments-page";
import { LocationPage } from "../../../../page-objects/webapp/location-page";
import { PaymentPage } from "../../../../page-objects/webapp/payment-page";
import { ServicesPage } from "../../../../page-objects/webapp/services-page";
import { SignUpPage } from "../../../../page-objects/webapp/signup-page";
import { VehiclePage } from "../../../../page-objects/webapp/vehicle-page";
import { fleetUsers, lmFleetUser } from "../../../../configuration/properties";
import { FleetPage } from "../../../../page-objects/webapp/fleet-page";
import { SummaryPage } from "../../../../page-objects/webapp/summary-page";
import { isLubemobile } from "../../../../support/utils";



Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const signUpPage = new SignUpPage();
const servicesPage = new ServicesPage();
const locationPage = new LocationPage();
const schedulePage = new SchedulePage();
const paymentPage = new PaymentPage();
const vehiclePage = new VehiclePage();
const appointmentsPage = new AppointmentsPage();
const addOnsPage = new AddOnsPage();
const fleetPage = new FleetPage();
const summaryPage = new SummaryPage();

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/newuser/sign-up-user and booking flow.spec.ts', () => {

    beforeEach(() => {
        signUpPage.navigateToSignUpPageAndVerify();
        signUpPage.signUpDetails(fleet);
        signUpPage.clickHearAboutUs().click();
        signUpPage.selectHearAboutUs(fleet.hearAboutUs);
        signUpPage.createAccountSignUp().click();
        fleetPage.verifyBookFleetPage();
        cy.avgWait();
        fleetPage.addVehiclePop().click();
        if (lm) {
            vehiclePage.licenseTxtField().click().type(fleet.licensePlateNumber, { delay: 100 });
            vehiclePage.stateSelection().click();
            vehiclePage.selectStateFromDropDown(fleet.state);
        } else {
            vehiclePage.addVehicleVINBtn().click();
            vehiclePage.vehicleVINTxtField().type(fleet.VIN);
        }
        fleetPage.footerNextButton().click();
        cy.avgWait();
        fleetPage.footerNextButton().click();
        cy.avgWait();
        fleetPage.footerNextButton().click();
        fleetPage.regionDropdown().click({ force: true });
        fleetPage.selectYourRegion('Default Region').click({ force: true });
        fleetPage.hubDropdown().click();
        fleetPage.selectYourHub('Default Hub').click({ force: true });
        fleetPage.footerNextButton().click({ force: true });
        vehiclePage.selectAllVehiclesChkBox();
        vehiclePage.verifyVehicleNextButton().click();
        vehiclePage.mileageTitle();
        vehiclePage.updateMilageOneField().click();
        fleetPage.footerNextButton().click();
        locationPage.fillLocationDeatilsforNewFleet(fleet);
        locationPage.locationNextButton().click();
        servicesPage.verifyBookServicesPage();
        servicesPage.selectService(fleetUsers.batteryReplacement).click();
        servicesPage.servicesNotesButton().click().type('batteryReplacementServiceNotes', { delay: 100 });
        servicesPage.selectServicePopUpButton().click();
        servicesPage.serviceNextButton().click();
        if (!lm) {
            addOnsPage.addOnClick().click();
            cy.avgWait();
            servicesPage.selectServicePopUpButton().click();
            servicesPage.addOnsNextButton().click();
        }
        schedulePage.verifySchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        cy.minWait();
        if (lm) {
            schedulePage.scheduleNextButton().click();
        } else {
            schedulePage.scheduleDayOfterTomorrow();
            schedulePage.scheduleNextButton().click();
            paymentPage.fillCreditCardDetails();
            paymentPage.paymentNextButton();
        }
    });

    it('1. webapp/fleet/newuser/booking-flow.cy.ts', () => {

        paymentPage.confirmBookAppointment().click();
        appointmentsPage.verifyAppointmentsPage();
        appointmentsPage.cancelAllPendingAppointments();
        appointmentsPage.noJobsFoundDescription();
    });

    it('2. Add services, edit location notesx, edit time , edit payment in confirm page', () => {

        summaryPage.addServicesSummaryBtn().first().click();
        servicesPage.selectService(fleet.alternatorReplacement).click();
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
