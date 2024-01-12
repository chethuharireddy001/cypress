import { BasePage } from "../../../../page-objects/admin/base-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";
import { ApiUtils } from "../../../../page-objects/api-utils";


const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();


describe('Lead Time, Flexible Scheduling', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
    })

    it('1. change lead time', () => {
        jobsPage.changeLeadTime().click();
        basePage.h3().should('contain.text', 'Change Lead Time');
        jobsPage.leadTimeTab().clear().type('2');
        basePage.saveButton().click();
        jobsPage.successToast();
    })

    it('2. dont change lead time',() => {
        jobsPage.changeLeadTime().click();
        jobsPage.closeModalBtn().click();
    })

    it('3. flexible scheduling', () => {
        jobsPage.selectActionBtn().click();
        jobsPage.flexibleScheduling().should('be.visible');
        jobsPage.selectActionBtn().click();
        jobsPage.flexibleSchedulingOption().click();
        jobsPage.successToast();
        jobsPage.flexibleSchedulingCheckedBox().should('be.visible');
    })
})