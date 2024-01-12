import { fleetUsers, lmFleetUser } from "../../../../configuration/properties";
import { SchedulePage } from "../../../../page-objects/webapp/schedule-page";
import { AppointmentsPage } from "../../../../page-objects/webapp/appointments-page";
import { FleetPage } from "../../../../page-objects/webapp/fleet-page";
import { LocationPage } from "../../../../page-objects/webapp/location-page";
import { ServicesPage } from "../../../../page-objects/webapp/services-page";
import { SignUpPage } from "../../../../page-objects/webapp/signup-page";
import { SummaryPage } from "../../../../page-objects/webapp/summary-page";
import { VehiclePage } from "../../../../page-objects/webapp/vehicle-page";
import { isLubemobile } from "../../../../support/utils";
import { ContactPage } from "../../../../page-objects/webapp/contact-page";



const signUpPage = new SignUpPage();
const servicesPage = new ServicesPage();
const locationPage = new LocationPage();
const schedulePage = new SchedulePage();
const vehiclePage = new VehiclePage();
const appointmentsPage = new AppointmentsPage();
const fleetPage = new FleetPage();
const summaryPage = new SummaryPage();
const contactPage=new ContactPage();

const lm = isLubemobile();
const Data = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/newuser/sign-up-user and booking flow.spec.ts', () => {


    it('1. webapp/fleet/newuser/booking-flow.cy.ts', () => {
        signUpPage.navigateToSignUpPage();
        signUpPage.normalUserSignUpDetails(Data);
        signUpPage.clickHearAboutUs().click();
        signUpPage.selectHearAboutUs(Data.hearAboutUs);
        signUpPage.createAccountSignUp().click();
        vehiclePage.verifynewVehiclePage();
        vehiclePage.licenseTxtField().type(Data.licensePlateNumber);
        vehiclePage.stateSelection().click();
        vehiclePage.selectStateFromDropDown(Data.state);
        vehiclePage.vehicleNextButton();
        cy.avgWait();
        vehiclePage.vehicleNextButton();
        locationPage.verifyLocationPage();
        locationPage.fillLocationDetailsForLm(Data);
        locationPage.locationNextButton().click();
        servicesPage.selectService(Data.batteryReplacement).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.servicesNotesButton().click().type(Data.batteryReplacementServiceNotes, { delay: 100 }).should('have.value', Data.batteryReplacementServiceNotes);
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        schedulePage.verifySchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.scheduleNextButton().click();
        summaryPage.bookAppointmentBtn().click();
        appointmentsPage.verifyAppointmentsPage();

    });
});
