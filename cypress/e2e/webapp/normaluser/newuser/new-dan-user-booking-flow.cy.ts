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

const vehiclePage = new VehiclePage();
const servicesPage = new ServicesPage();
const locationPage = new LocationPage();
const schedulePage = new SchedulePage();
const summaryPage = new SummaryPage();
const signUpPage = new SignUpPage();
const appointmentsPage = new AppointmentsPage();
const contactPage = new ContactPage()
const zipPage=new ZipPage();

const lm = isLubemobile();
const Data = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;
const User =lmNormalUser

describe('webapp/normaluser/newuser/new-dan-user-booking-flow.cy.ts',  () => {

    it('1. New User Requesting for a service without Preferred Mechanic', () => {
        zipPage.navigateToDanZipPageAndVerify(User.danlink);
        vehiclePage.licenseTxtField().type(Data.licensePlateNumber);
        vehiclePage.stateSelection().click();
        vehiclePage.selectStateFromDropDown(Data.state);
        vehiclePage.vehicleNextButton();
        cy.avgWait();
        vehiclePage.vehicleNextButton();
        servicesPage.selectService(Data.intervalServices).click();
        cy.minWait()
        servicesPage.servicesNotesButton().click().type(Data.intervalServicesServiceNotes, { delay: 100 });
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        locationPage.verifyDanUserLocationPage();
        locationPage.fillLocationDetailsForLm(Data);
        locationPage.locationNextButton().click();
        schedulePage.verifyDanUserSchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.scheduleNextButton().click();
        contactPage.verifyDanContactPage();
        contactPage.fillContactDetails(Data)
        contactPage.danTextField().type(User.danid)
        signUpPage.getCustomQuoteBtn().click();
        summaryPage.bookAppointmentBtn().click();
        appointmentsPage.verifyAppointmentsPage();

    });
});

