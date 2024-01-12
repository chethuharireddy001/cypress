import { SchedulePage } from "../../../../page-objects/webapp/schedule-page";
import { AppointmentsPage } from "../../../../page-objects/webapp/appointments-page";
import { LocationPage } from "../../../../page-objects/webapp/location-page";
import { ServicesPage } from "../../../../page-objects/webapp/services-page";
import { SignUpPage } from "../../../../page-objects/webapp/signup-page";
import { SummaryPage } from "../../../../page-objects/webapp/summary-page";
import { VehiclePage } from "../../../../page-objects/webapp/vehicle-page";
import { ContactPage } from "../../../../page-objects/webapp/contact-page";
import { ZipPage } from "../../../../page-objects/webapp/zip-page";
import { isLubemobile } from "../../../../support/utils";
import { fleetUsers, lmFleetUser, lmNormalUser } from "../../../../configuration/properties";
import { LmUserPage } from "../../../../page-objects/webapp/lm-user-page";

const vehiclePage = new VehiclePage();
const servicesPage = new ServicesPage();
const locationPage = new LocationPage();
const schedulePage = new SchedulePage();
const summaryPage = new SummaryPage();
const signUpPage = new SignUpPage();
const appointmentsPage = new AppointmentsPage();
const contactPage = new ContactPage()
const zipPage=new ZipPage();
const lmUserPage=new LmUserPage();


const lm = isLubemobile();
const Data = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;
const User =lmNormalUser

describe('webapp/normaluser/newuser/new-user-booking-flow.cy.ts',  () => {

    it('1. New User Requesting for a service without Preferred Mechanic', () => {
        zipPage.navigateToZipPageAndVerify();
        zipPage.zipCodeTxtField().type(Data.zip);
        zipPage.zipCodeNextButton().click();
        vehiclePage.licenseTxtField().type(Data.licensePlateNumber);
        vehiclePage.stateSelection().click();
        vehiclePage.selectStateFromDropDown(Data.state);
        vehiclePage.vehicleNextButton();
        cy.avgWait();
        vehiclePage.vehicleNextButton();
        servicesPage.selectService(Data.batteryReplacement).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.servicesNotesButton().click().type(Data.batteryReplacementServiceNotes, { delay: 100 }).should('have.value', Data.batteryReplacementServiceNotes);
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        locationPage.verifyNewUserLocationPage();
        locationPage.fillLocationDetailsForLm(Data);
        locationPage.locationNextButton().click();
        schedulePage.verifyNewUserSchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.scheduleNextButton().click();
        contactPage.verifyContactPage();
        contactPage.fillContactDetails(Data)
        signUpPage.getCustomQuoteBtn().click();
        summaryPage.bookAppointmentBtn().click();
        appointmentsPage.verifyAppointmentsPage();

    });
    it('2. New User Requesting for a service with Preferred Mechanic ',  () => {
        zipPage.navigateToZipPageAndVerify();
        zipPage.zipCodeTxtField().type(Data.zip);
        zipPage.zipCodeNextButton().click();
        vehiclePage.licenseTxtField().type(Data.licensePlateNumber);
        vehiclePage.stateSelection().click();
        vehiclePage.selectStateFromDropDown(Data.state);
        vehiclePage.vehicleNextButton();
        cy.avgWait();
        vehiclePage.vehicleNextButton();
        servicesPage.selectService(Data.batteryReplacement).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.servicesNotesButton().click().type(Data.batteryReplacementServiceNotes, { delay: 100 }).should('have.value', Data.batteryReplacementServiceNotes);
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        locationPage.verifyNewUserLocationPage();
        locationPage.fillLocationDetailsForLm(Data);
        locationPage.locationNextButton().click();
        schedulePage.verifyNewUserSchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.preferredMechanicDropdown().click();
        schedulePage.selectPreferredMechanic(User.mechanic);
        schedulePage.scheduleNextButton().click();
        contactPage.verifyContactPage();
        contactPage.fillContactDetails(Data)
        signUpPage.getCustomQuoteBtn().click();
        summaryPage.bookAppointmentBtn().click();
        appointmentsPage.verifyAppointmentsPage();
    });

    it('3. New User requesting for multiple services',  () => {
        zipPage.navigateToZipPageAndVerify();
        zipPage.zipCodeTxtField().type(Data.zip);
        zipPage.zipCodeNextButton().click();
        vehiclePage.licenseTxtField().type(Data.licensePlateNumber);
        vehiclePage.stateSelection().click();
        vehiclePage.selectStateFromDropDown(Data.state);
        vehiclePage.vehicleNextButton();
        cy.avgWait();
        vehiclePage.vehicleNextButton();
        servicesPage.selectService(Data.batteryReplacement).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.servicesNotesButton().click().type(Data.batteryReplacementServiceNotes, { delay: 100 });
        servicesPage.selectServicePopUpButton().click();
        servicesPage.selectService(Data.intervalServices).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.servicesNotesButton().click().type(Data.intervalServicesServiceNotes, { delay: 100 });
        servicesPage.selectServicePopUpButton().click();
        servicesPage.selectService(Data.alternatorReplacement).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.servicesNotesButton().click().type(Data.alternatorReplacement, { delay: 100 });
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        locationPage.verifyNewUserLocationPage();
        locationPage.fillLocationDetailsForLm(Data);
        locationPage.locationNextButton().click();
        schedulePage.verifyNewUserSchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.scheduleNextButton().click();
        contactPage.verifyContactPage();
        contactPage.fillContactDetails(Data)
        signUpPage.getCustomQuoteBtn().click();
        summaryPage.bookAppointmentBtn().click();
        appointmentsPage.verifyAppointmentsPage();

    })
});

