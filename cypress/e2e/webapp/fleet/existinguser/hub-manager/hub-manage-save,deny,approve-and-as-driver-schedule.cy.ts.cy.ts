import { FleetPage } from "../../../../../page-objects/webapp/fleet-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { VehiclePage } from "../../../../../page-objects/webapp/vehicle-page";
import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { QuotesPage } from "../../../../../page-objects/webapp/quotes-page";
import { LocationPage } from "../../../../../page-objects/webapp/location-page";
import { AccountsPage } from "../../../../../page-objects/webapp/accounts-page";
import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { isLubemobile } from "../../../../../support/utils";
import { AppointmentsPage } from "../../../../../page-objects/webapp/appointments-page";

const fleetPage = new FleetPage();
const servicesPage = new ServicesPage();
const vehiclePage = new VehiclePage();
const quotesPage = new QuotesPage();
const loginPage = new LoginPage();
const locationPage = new LocationPage();
const accountsPage = new AccountsPage();
const appointmentsPage = new AppointmentsPage();


const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/hub-manager/hub-manage-save,deny,approve-and-as-driver-schedule.cy.ts.cy.ts',  () => {

    beforeEach(() => {
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetHubManager, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        accountsPage.navigateToApprovalLimitsPageAndVerify();
        accountsPage.approvalLimitsTitle().should('contain', 'Approval Limits');
        accountsPage.approvalQuoteOnRadioButton().click();
        accountsPage.approvalsUpdatebutton().click();
        cy.minWait();
        loginPage.navigateToLoginPageAndVerify();
        loginPage.loginThroughCustomCredentials(fleet.hubdriver, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        vehiclePage.navigateToBookVehicles();
         cy.avgWait();
        vehiclePage.vehicleSearchOption().click({ force: true }).type(fleet.vehicleName , {delay: 100, force: true});
        cy.minWait();
        vehiclePage.selectOneVehicleSitewide().click();
        vehiclePage.vehicleNextButton();
        vehiclePage.mileageTitle();
        vehiclePage.updateMilageOneField().click();
        fleetPage.footerNextButton().click();
        cy.minWait();
        locationPage.locationNextButton().click();
        locationPage.confirmLocationPopUpOkBtn().click();
        if (!lm) {
            servicesPage.servicesIDontKnow().should("contain", "Diagnose my problem");
        }
        servicesPage.selectService(fleet.batteryReplacement).click();
        cy.avgWait();
        servicesPage.serviceModalPopUpPriceSpinner();
        servicesPage.servicesNotesButton().click().type(fleet.batteryReplacementServiceNotes, { delay: 100 }).should('have.value', fleet.batteryReplacementServiceNotes);
        servicesPage.selectServicePopUpButton().click();
        servicesPage.servicesNextButton().click();
        quotesPage.submitForApprovalBtn().click();
        quotesPage.approveTab().click();
        quotesPage.serviceDescriptionInApproveTab().then(($serviceName) => {
            const ServiceName = $serviceName.text();
            if (ServiceName === fleet.batteryReplacement) {
                cy.log('Service displayed');
            }
        });
    });

    it('1. login as hub manager then Save and Deny quote', () => {
        loginPage.loginThroughCustomCredentials(fleetUsers.migratedFleetHubManager, fleetUsers.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        quotesPage.navigateToFleetQuotesPageAndVerify();
        quotesPage.serviceDescriptionInApproveTab().then(($serviceName) => {
            const ServiceName = $serviceName.text();
            if (ServiceName === fleet.batteryReplacement) {
                cy.log('Service displayed');
            }
        });
        quotesPage.firstCheckBox().first().click();
        quotesPage.saveBtn().click();
        quotesPage.savedTab().click();
        quotesPage.serviceDescriptionInScheduleTab().then(($serviceName) => {
            const ServiceName = $serviceName.text();
            if (ServiceName === fleet.batteryReplacement) {
                cy.log('Service displayed');
            }
        });
        cy.minWait();
        quotesPage.checkBoxQuote().click();
        quotesPage.denyBtn().click();
    });

    it('2. login as hub manager then Save and Approve quote', () => {
        loginPage.loginThroughCustomCredentials(fleetUsers.migratedFleetHubManager, fleetUsers.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        quotesPage.navigateToFleetQuotesPageAndVerify();
        quotesPage.serviceDescriptionInApproveTab().then(($serviceName) => {
            const ServiceName = $serviceName.text();
            if (ServiceName === fleet.batteryReplacement) {
                cy.log('Service displayed');
            }
        });
        quotesPage.firstCheckBox().first().click();
        quotesPage.saveBtn().click();
        quotesPage.savedTab().click();
        quotesPage.serviceDescriptionInScheduleTab().then(($serviceName) => {
            const ServiceName = $serviceName.text();
            if (ServiceName === fleet.batteryReplacement) {
                cy.log('Service displayed');
            }
        });
        cy.minWait();
        quotesPage.checkBoxQuote().click();
        quotesPage.approveButton().click();
        loginPage.loginThroughCustomCredentials(fleet.hubdriver, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        quotesPage.navigateToFleetQuotesPageAndVerify();
        quotesPage.serviceDescriptionInScheduleTab().then(($serviceName) => {
            const ServiceName = $serviceName.text();
            if (ServiceName === fleet.batteryReplacement) {
                cy.log('Service displayed');
            }
        });
        quotesPage.scheduleAJobFromScheduleTab();
        appointmentsPage.navigateToFleetAppointmentsPageAndVerify();
        appointmentsPage.cancelAllPendingAppointments();
        appointmentsPage.noJobsFoundDescription();
    });

    it('3. login as hub manager and Deny quote', () => {
        loginPage.loginThroughCustomCredentials(fleetUsers.migratedFleetHubManager, fleetUsers.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        quotesPage.navigateToFleetQuotesPageAndVerify();
        quotesPage.serviceDescriptionInApproveTab().then(($serviceName) => {
            const ServiceName = $serviceName.text();
            if (ServiceName === fleet.batteryReplacement) {
                cy.log('Service displayed');
            }
        });
        quotesPage.firstCheckBox().first().click();
        quotesPage.denyBtn().click();
    });

});
