import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { ApiUtils } from "../../../../page-objects/api-utils";

const basePage = new BasePage();
const apiUtils = new ApiUtils();
const jobsPage = new JobsPage();

describe('Complete - Billing Status(Payment Received)' , () => {

    it('1. verify duplicate job button', () => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select(4);
        jobsPage.saveBtn().click();
        jobsPage.openPaymentStatus().should('have.text', 'Billing Status (Payment Received)');
        cy.windowHandle(jobsPage.duplicateJob());
        cy.minWait();
        basePage.header().should('include.text', 'Quote');
    })
})