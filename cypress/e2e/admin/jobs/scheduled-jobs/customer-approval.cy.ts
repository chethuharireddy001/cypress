import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { ApiUtils } from "../../../../page-objects/api-utils";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();

describe('Customer Approval',() => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
    })

    it('1. Same as customer name checkbox', () => {
        jobsPage.sameAsCustomerNameChkBox().check();
        jobsPage.whoApprovedTab().should('have.class', 'ng-not-empty');
        jobsPage.sameAsCustomerNameChkBox().should('be.checked');
        jobsPage.sameAsCustomerNameChkBox().click();
        jobsPage.whoApprovedTab().should('have.class', 'ng-empty');
        jobsPage.sameAsCustomerNameChkBox().should('not.be.checked');
    })

    it('2. How was the job approved', () => {
        jobsPage.howWasJobApproved().select(1);
        jobsPage.howWasJobApproved().select(2);
        jobsPage.approvalPhone().should('be.enabled');
        jobsPage.sameAsCustomerPhone().should('be.enabled');
        jobsPage.howWasJobApproved().select(3);
        jobsPage.howWasJobApproved().select(4);
        jobsPage.approvalEmail().should('be.enabled');
        jobsPage.sameAsCustomerEmail().should('be.enabled');
        jobsPage.howWasJobApproved().select(5);
        jobsPage.howWasJobApproved().select(6);
    })

    it('3. Dont send approval Email checkbox', () => {
        jobsPage.dontSendApprovalEmailChkBox().should('not.be.checked');
        jobsPage.dontSendApprovalEmailChkBox().check();
        jobsPage.dontSendApprovalEmailChkBox().should('be.checked');
    })

    it('4. price changes' , () =>  {
        jobsPage.priceChangesBtn().click();
        jobsPage.priceHistory().should('be.visible');
    })
})