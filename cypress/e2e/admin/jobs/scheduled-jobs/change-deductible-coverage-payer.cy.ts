import { wrenchUser, lmUser, properties } from "../../../../configuration/properties";
import { BasePage } from "../../../../page-objects/admin/base-page";
import { CreateJobPage } from "../../../../page-objects/admin/job-test-pages/create-job-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";
import { InfoPage } from "../../../../page-objects/admin/manage-account/info-page";
import { ManageAccountPage } from "../../../../page-objects/admin/manage-account/manage-account-page";
import { QuotesPage } from "../../../../page-objects/admin/quotes-page";
import { isLubeMobile } from "../../../../support/utils";


const basePage = new BasePage();
const quotesPage = new QuotesPage();
const manageAccountPage = new ManageAccountPage();
const createJobPage = new CreateJobPage();
const infoPage = new InfoPage();
const jobsPage = new JobsPage();

const status = 'Ready to Schedule';

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('Change Deductible/Coverage Payer', () => {

    it('1. change deductible and coverage payer', () => {
        cy.login();
        cy.deleteUserViaSQL();
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
        jobsPage.selectActionBtn().click();
        jobsPage.changeDeductible().click();
        basePage.h3().should('contain.text', 'Change Deductible and Coverage Payer');
        jobsPage.selectCoveragePayer().select(basePage.randomNumber(9));
        jobsPage.deductibleTab().clear().type(basePage.randomNumber(500).toString());
        basePage.saveButton().click();
        jobsPage.deductible().should('be.visible');
    })
})