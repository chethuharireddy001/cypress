import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { VehiclePage } from "../../../../page-objects/admin/manage-account/vehicle-page";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
const vehiclePage = new VehiclePage();


describe('Vehicle', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
    })

    it('1. change vehicle', () => {
        jobsPage.viewUserButton().click();
        cy.maxWait();
        basePage.orgButton().click();
        vehiclePage.vehiclePageNavigation();
        basePage.addButton().scrollIntoView().click();
        vehiclePage.vehicleOption().click();
        vehiclePage.yearMakeModelRadioButton().click();
        vehiclePage.ymmOnlyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.sideNavMenu().click();
        jobsPage.sideNavJobsPage().click();
        jobsPage.jobStatusScheduled();
        jobsPage.searchJobsButton().click();
        cy.avgWait();
        jobsPage.searchJobsButton().click();
        jobsPage.goToFirstJob();
        cy.avgWait();
        basePage.waitForPageToLoad();
        jobsPage.changeVehicleBtn().click();
        basePage.h3().should('contain.text', 'Change Vehicle');
        jobsPage.vehicleDropdown().select(2);
        basePage.saveButton().click();
        basePage.header().should('include.text', 'Create Job');
    })

    it('2. cancel changing vehicle', () => {
        jobsPage.changeVehicleBtn().click();
        jobsPage.closeModalBtn().click();
    })
})