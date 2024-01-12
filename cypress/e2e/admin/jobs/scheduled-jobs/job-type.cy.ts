import { wrenchUser, lmUser, properties } from "../../../../configuration/properties";
import { BasePage } from "../../../../page-objects/admin/base-page";
import { CreateJobPage } from "../../../../page-objects/admin/job-test-pages/create-job-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";
import { InfoPage } from "../../../../page-objects/admin/manage-account/info-page";
import { QuotesPage } from "../../../../page-objects/admin/quotes-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { isLubeMobile } from "../../../../support/utils";


const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
const quotesPage = new QuotesPage();
const createJobPage = new CreateJobPage();
const infoPage = new InfoPage();

const status = 'Ready to Schedule';

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;


describe.skip('Job Type', () => {
    //TODO: (@Kadir) not sure why but it says no previous service for the vehicle
    //TODO: (@Kadir) make service types configurable for lubemobile (waiting for an update)

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select('Complete');
        basePage.saveButton().click();
        jobsPage.openPaymentStatus().should('contain.text', 'Billing Status (Payment Received)');
        jobsPage.viewUserButton().click();
        basePage.userActionsButton().click();
        cy.windowHandle(infoPage.addJob());
        createJobPage.addService().scrollIntoView().click({timeout: 20000});
        if (isLubeMobile()) {
            createJobPage.serviceInput().click();
            basePage.secondOption().click();
        } else {
            createJobPage.serviceInput().type('Battery Replacement');
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
    })

    it('1. change job type to followup', () => {
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobType().click();
        basePage.h3().should('contain.text', 'Change Job Type');
        jobsPage.jobTypeDropdown().select('Followup for a Diagnostic');
        jobsPage.previousJob().select(1);
        jobsPage.warrantyNotes().type('Note');
        jobsPage.updateJobType().click();
        jobsPage.secondSuccessToast();
    })

    it('2. change job type to warranty', () => {
        jobsPage.changeJobType().click();
        jobsPage.jobTypeDropdown().select('Warranty Work');
        jobsPage.previousJob().select(1);
        jobsPage.warrantyNotes().type('Note');
        jobsPage.updateJobType().click();
        basePage.successToast();
    })

    it('3. cancel on changing the job type', () => {
        jobsPage.changeJobType().click();
        basePage.cancelButton().click();
    })
})
