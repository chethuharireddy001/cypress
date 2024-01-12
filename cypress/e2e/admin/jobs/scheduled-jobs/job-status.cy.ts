import { wrenchUser, lmUser, properties } from "../../../../configuration/properties";
import { BasePage } from "../../../../page-objects/admin/base-page";
import { CreateJobPage } from "../../../../page-objects/admin/job-test-pages/create-job-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";
import { InfoPage } from "../../../../page-objects/admin/manage-account/info-page";
import { ManageAccountPage } from "../../../../page-objects/admin/manage-account/manage-account-page";
import { QuotesPage } from "../../../../page-objects/admin/quotes-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { isLubeMobile } from "../../../../support/utils";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
const quotesPage = new QuotesPage();
const manageAccountPage = new ManageAccountPage();
const createJobPage = new CreateJobPage();
const infoPage = new InfoPage();

const status = 'Ready to Schedule';

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('Job Status', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
    })

    it('1. reschedule job flow', () => {
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.householdButton().click();
        manageAccountPage.getUserReady();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.userActionsButton().click();
        cy.windowHandle(infoPage.addJob());
        createJobPage.addService().scrollIntoView().click({timeout: 20000});
        if (isLubeMobile()) {
            createJobPage.serviceInput().click();
            basePage.secondOption().click();
        } else {
            createJobPage.serviceInput().type(properties.service);
            cy.minWait();
            basePage.firstOption().click();
        }
        createJobPage.addServicesButton().click();
        quotesPage.selectActionButton().first().click();
        quotesPage.editQuoteButton().click();
        quotesPage.verifyEditQuoteModal();
        quotesPage.changeQuoteStatusTo(status);
        quotesPage.setNoLeadTime();
        quotesPage.locationDropdown().select(1);
        quotesPage.datePicker().click();
        quotesPage.scheduleForTomorrow();
        quotesPage.sameAsCustomerNameCheckBox().click();
        quotesPage.howWasTheJobApproved(properties.jobApprovedOnline);
        quotesPage.editQuoteSaveButton().click();
        quotesPage.successToast();
        basePage.waitForPageToLoad();
        jobsPage.rescheduleJobOption().click();
        basePage.h3().should('contain.text', 'Reschedule Job');
        basePage.confirmButton().should('not.be.enabled');
        jobsPage.sendEmailChkBox().click();
        jobsPage.radioButtons().should('not.be.disabled', {multiple: true}).first().click();
        jobsPage.reasonTextBox().type('Reason for canceling');
        basePage.confirmButton().should('not.be.disabled').click();
        jobsPage.secondSuccessToast();
    })

    it('2. cancel on reschedule job', () => {
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.rescheduleJobOption().click();
        basePage.cancelButton().click();
    })

    it('3. change job status to Scheduled', () => {
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select('Scheduled');
        basePage.saveButton().click();
        basePage.header().should('contain.text', 'Scheduled');
    })

    it('4. change job status to En Route', () => {
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select('En Route');
        basePage.saveButton().click();
        basePage.header().should('contain.text', 'Enroute');
    })

    it('5. change job status to Working', () => {
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select('Working');
        basePage.saveButton().click();
        basePage.header().should('contain.text', 'Working');
    })

    it('6. change job status to Complete', () => {
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select('Complete');
        basePage.saveButton().click();
        jobsPage.openPaymentStatus().should('contain.text', 'Billing Status (Payment Received)');
    })

    it('7. change job status to Complete - Dont Bill', () => {
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select("Complete - Don't Bill");
        basePage.saveButton().contains('Save').click();
        jobsPage.openPaymentStatus().should('contain.text', "Billing Status (Ready to Bill)");
    })

    it('8. change job status to On Hold', () => {
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select('On Hold');
        jobsPage.radioButtons().should('not.be.disabled', {multiple: true}).eq(4).click();
        jobsPage.reasonTextBox().type('Reason for canceling');
        basePage.confirmButton().contains('Confirm').click();
        basePage.header().should('contain.text', 'On Hold');
    })

    it('9. cancel on changing the job status', () => {
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        basePage.cancelButton().click();
    })
})