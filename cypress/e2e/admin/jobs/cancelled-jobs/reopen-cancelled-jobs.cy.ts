import { properties, wrenchUser, lmUser } from "../../../../configuration/properties";
import { BasePage } from "../../../../page-objects/admin/base-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { isLubeMobile } from "../../../../support/utils";


const basePage = new BasePage();
const jobsPage = new JobsPage();
const statement = properties.testNote;
const apiUtils = new ApiUtils();

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('Reopen Cancelled Jobs', ()=> {

    it('1. reopening cancelled jobs', () => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.legacyJobId().invoke('text').then(jobId => {
            jobId = jobId.replace(/[()]/g,"");
            jobsPage.cancelJobBtn().click();
            jobsPage.cancellingReason().click();
            jobsPage.cancellingStatement().type(statement);
            basePage.confirmButton().click();
            jobsPage.jobIdSearch().type(jobId);
            basePage.waitForPageToLoad();
            jobsPage.searchJobsButton().click();
            jobsPage.cancelReasonText().should('include.text', 'Customer Changed Their Mind');
            jobsPage.cancelNotes().should('include.text', statement);
            jobsPage.reopenJobsButton().click();
            jobsPage.reopenJobYes().click();
            jobsPage.scheduledValidation();
            jobsPage.cancelJobButtonValidation();
        })
    })
})