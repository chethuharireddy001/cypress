import { wrenchUser, lmUser, properties } from "../../../configuration/properties";
import { BasePage } from "../../../page-objects/admin/base-page";
import { CreateJobPage } from "../../../page-objects/admin/job-test-pages/create-job-page";
import { DashboardPage } from "../../../page-objects/admin/job-test-pages/dashboard-page";
import { InfoPage } from "../../../page-objects/admin/manage-account/info-page";
import { isLubeMobile } from "../../../support/utils";


const createJobPage = new CreateJobPage();
const basePage = new BasePage();
const infoPage = new InfoPage();
const dashboardPage = new DashboardPage();
let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('Jobs Page', () => {

    beforeEach(() => {
        cy.login();
        dashboardPage.navigateToDashboard();
    })

    afterEach(() => {
        createJobPage.vehicleDropdown().click();
        basePage.firstOption().click();
        createJobPage.selectLocation().click();
        basePage.firstOption().click();
        createJobPage.addService().click();
        cy.minWait();
        createJobPage.serviceInput().type(properties.service);
        cy.minWait();
        basePage.firstOption().click();
        createJobPage.addServicesButton().click();
        basePage.header().should('contain.text', 'Quote');
    })

    it('1. create a quote through create job page ', () => {
        createJobPage.createJobScreen().click();
        createJobPage.firstNameInput().type(user.firstName);
        createJobPage.lastNameInput().type(user.lastName);
        createJobPage.filterButton().click();
    })

    it('2. create a quote through quick actions tool', () => {
        dashboardPage.quickActionButton().click();
        dashboardPage.commandLine().type('createjob{enter}');
        createJobPage.firstNameInput().type(user.firstName);
        createJobPage.lastNameInput().type(user.lastName);
        createJobPage.filterButton().click();
    })

    it('3. create a quote through dashboard > find user', () => {
        dashboardPage.findUserPhoneInput().type(user.phone);
        dashboardPage.findUserFirstNameInput().type(user.firstName);
        dashboardPage.findUserLastNameInput().type(user.lastName);
        dashboardPage.interceptFindProviders();
        dashboardPage.searchButton().click();
        cy.wait('@findProviders');
        basePage.userActionsButton().click();
        cy.windowHandle(infoPage.addJob());
    })
})

