import { LoginPage } from "../../../../page-objects/webapp/login-page";
import { SchedulePage } from "../../../../page-objects/webapp/schedule-page";
import { AppointmentsPage } from "../../../../page-objects/webapp/appointments-page";
import { LocationPage } from "../../../../page-objects/webapp/location-page";
import { ServicesPage } from "../../../../page-objects/webapp/services-page";
import { SummaryPage } from "../../../../page-objects/webapp/summary-page";
import { VehiclePage } from "../../../../page-objects/webapp/vehicle-page";
import { LmUserPage } from "../../../../page-objects/webapp/lm-user-page";
import { isLubemobile } from "../../../../support/utils";
import { fleetUsers, lmFleetUser, lmNormalUser } from "../../../../configuration/properties";

const loginPage = new LoginPage();
const lmUserPage = new LmUserPage();
const appointmentsPage = new AppointmentsPage();
const locationPage = new LocationPage();
const schedulePage = new SchedulePage();
const summaryPage = new SummaryPage();
const vehiclePage = new VehiclePage();
const servicesPage = new ServicesPage();


const lm = isLubemobile();
const Data = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;
const User = lmNormalUser


describe('webapp/normaluser/existinguser/existing-user-booking-flow.cy.ts', () => {

    beforeEach( () => {
        
        lmUserPage.loginNormalUserLm(User.normalUser, User.password);
        appointmentsPage.verifyAppointmentsPage();
    });

    it('1. book an appointmnet for interval service - 3 years', () => {
        lmUserPage.lmMenu();
        lmUserPage.menuRequestService().click();
        vehiclePage.verifynewVehiclePage();
        vehiclePage.vehicleNextButton();
        locationPage.verifyLocationPage();
        locationPage.locationNextButton().click();
        cy.minWait();
        servicesPage.verifyBookServicesPage();
        servicesPage.selectService(Data.intervalServices).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        schedulePage.verifySchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.scheduleNextButton().click();
        summaryPage.bookAppointmentBtn().click();
        appointmentsPage.verifyAppointmentsPage();
    })

    it('2. Requesting for a service by adding new vehicle', () => {
        lmUserPage.lmMenu();
        lmUserPage.menuRequestService().click();
        vehiclePage.selectingSpecificVehicle(Data.licensePlateNumber);
        vehiclePage.vehicleNextButton();
        locationPage.locationNextButton().click();
        cy.minWait();
        servicesPage.verifyBookServicesPage();
        servicesPage.selectService(Data.alternatorReplacement).click();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        schedulePage.verifySchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.scheduleNextButton().click();
        summaryPage.bookAppointmentBtn().click();
        appointmentsPage.verifyAppointmentsPage();
    })

    it('3. Select multiple services and book a job', () => {
        lmUserPage.lmMenu();
        lmUserPage.menuRequestService().click()
        vehiclePage.verifynewVehiclePage();
        vehiclePage.vehicleNextButton();
        locationPage.locationNextButton().click();
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
        schedulePage.verifySchedulePage();
        schedulePage.scheduleHeader();
        appointmentsPage.verifyAppointmentDate();
        schedulePage.earlierAppointmentCheckbox().click();
        schedulePage.scheduleNextButton().click();
        summaryPage.bookAppointmentBtn().click();
        appointmentsPage.verifyAppointmentsPage();
        
    })
})

