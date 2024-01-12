import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { QuotesPage } from "../../../../../page-objects/webapp/quotes-page";
import { VehiclePage } from "../../../../../page-objects/webapp/vehicle-page";
import { AccountsPage } from "../../../../../page-objects/webapp/accounts-page";
import { AppointmentsPage } from "../../../../../page-objects/webapp/appointments-page";
import { FleetPage } from "../../../../../page-objects/webapp/fleet-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { BulkSchedulePage } from "../../../../../page-objects/webapp/bulkschedule-page";
import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { isLubemobile } from "../../../../../support/utils";
import { getfeatures } from "../../../../../support/features";
import { FleetDashboardPage } from "../../../../../page-objects/webapp/fleet-dashboard";

const servicesPage = new ServicesPage();
const quotesPage = new QuotesPage();
const loginPage = new LoginPage();
const bulkSchedulePage = new BulkSchedulePage();
const accountsPage = new AccountsPage();
const fleetPage = new FleetPage();
const vehiclePage = new VehiclePage();
const appointmentsPage = new AppointmentsPage();
const fleetDashboardPage = new FleetDashboardPage

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/fleet-administrator/fleet-pages-nav-bar.cy.ts', () => {

    beforeEach(() => {
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetadmin, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        cy.wait(1000);
    });

    if (getfeatures().manageAndServiceConsole) {

        it('1. verify options under Service center', () => {
            accountsPage.serviceCenterDropDown();
            fleetPage.selectRequestService().click();
            servicesPage.selectYourVehicleTitle();
            fleetPage.verifyBookFleetPage();
            quotesPage.selectManageRequests().click();
            bulkSchedulePage.verifyMinionquotesPage();
            quotesPage.fleetQuotesPageTitleTxt();
            appointmentsPage.selectAppointments().click();
            accountsPage.approvalLimitsTitle();
        });

        it('2. verify options under Management Console', () => {
            accountsPage.managementConsoleDropDown();
            vehiclePage.selectVehicles().click();
            accountsPage.approvalLimitsTitle();
            fleetPage.selectUsers().click();
            accountsPage.approvalLimitsTitle();
        });
    }
    if (getfeatures().lubemobileMenu) {
        it('1. verify options under Management Console', () => {
            fleetDashboardPage.lmMenuButtom().click();;
            fleetDashboardPage.checkAlloptionInMenuButtom();

        });
    }
});
