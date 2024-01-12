import { wrenchSubUser } from "../../../../configuration/properties";
import { BasePage } from "../../../../page-objects/admin/base-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";
import { ManageAccountPage } from "../../../../page-objects/admin/manage-account/manage-account-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { DbUtils } from "../../../../page-objects/db-utils";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
const manageAccountPage = new ManageAccountPage();
const dbUtils = new DbUtils();

let contact = wrenchSubUser;

describe('Job Contact', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        dbUtils.deleteContact();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
    })

    it('1. change job contact', () => {
        jobsPage.viewUserButton().click();
        cy.maxWait();
        basePage.orgButton().click();
        basePage.addButton().scrollIntoView().click();
        manageAccountPage.addPerson(contact);
        basePage.sideNavMenu().click();
        jobsPage.sideNavJobsPage().click();
        jobsPage.jobStatusScheduled();
        jobsPage.searchJobsButton().click();
        cy.avgWait();
        jobsPage.searchJobsButton().click();
        jobsPage.goToFirstJob();
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobContact().click();
        jobsPage.contactDropdown().select(1);
        basePage.submitModalButton().click();
        cy.avgWait();
        jobsPage.assertContactChange(contact.firstName + ' ' + contact.lastName);
    })

    it('2. cancel changing job contact', () => {
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobContact().click();
        basePage.cancelButton().click();
    })
})