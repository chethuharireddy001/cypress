import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import {CreateJobPage} from "../../../../page-objects/admin/job-test-pages/create-job-page";
import { properties, wrenchUser, lmUser } from "../../../../configuration/properties";
import { InfoPage } from "../../../../page-objects/admin/manage-account/info-page";
import { ManageAccountPage } from "../../../../page-objects/admin/manage-account/manage-account-page";
import { QuotesPage } from "../../../../page-objects/admin/quotes-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { isLubeMobile } from "../../../../support/utils";

const apiUtils = new ApiUtils();
const basePage = new BasePage();
const jobsPage = new JobsPage();
const quotesPage = new QuotesPage();
const manageAccountPage = new ManageAccountPage();
const createJobPage = new CreateJobPage();
const infoPage = new InfoPage();
const statement = properties.testNote;
const status = 'Ready to Schedule';

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('Cancel a job', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
    })

    it('1. cancel a job without cancelling fee', () => {
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
        })
    })

    it('2. verify cancelling reason, statement and fee', () => {
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
        quotesPage.datePicker().click();
        quotesPage.scheduleForTomorrow();
        quotesPage.sameAsCustomerNameCheckBox().click();
        quotesPage.howWasTheJobApproved(properties.jobApprovedOnline);
        quotesPage.editQuoteSaveButton().click();
        quotesPage.successToast();
        basePage.waitForPageToLoad();
        jobsPage.legacyJobId().invoke('text').then(jobId => {
            jobId = jobId.replace(/[()]/g,"");
            jobsPage.cancelJobBtn().click();
            jobsPage.cancellingReason().click();
            jobsPage.cancellingStatement().type(statement);
            jobsPage.chargeCancelFee().click();
            basePage.confirmButton().click();
            jobsPage.jobIdSearch().type(jobId);
            basePage.waitForPageToLoad();
            jobsPage.searchJobsButton().click();
            jobsPage.cancelReasonText().should('include.text', 'Customer Changed Their Mind');
            jobsPage.cancelNotes().should('include.text', statement);
            jobsPage.cancelFee().should('include.text', '$50.00');
        })
    })

    it.skip('create user through UI and load it with apis', () => {
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.createNewAccount();
        manageAccountPage.addUser();
        manageAccountPage.firstNameTab().last().type(user.firstName);
        manageAccountPage.lastNameTab().last().type(user.lastName);
        manageAccountPage.emailTab().last().type(user.email);
        manageAccountPage.phoneTab().type(user.phone);
        cy.intercept('/user/getuser').as('getUser');
        basePage.popUpAddButton().click();
        basePage.header().should('include.text', 'Edit Person');
        apiUtils.loadUser();
    })
})