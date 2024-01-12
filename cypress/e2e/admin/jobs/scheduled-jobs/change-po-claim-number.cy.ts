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

describe('Change PO/Claim Number', () => {

    beforeEach(() => {
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
        basePage.waitForPageToLoad();
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
        cy.avgWait();
        basePage.waitForPageToLoad();
    })

    it('1. change po number', () => {
        const randomNumber = basePage.randomNumber(1000).toString();
        jobsPage.selectActionBtn().click();
        jobsPage.changePoClaim().click();
        basePage.h3().should('contain.text', 'Change PO');
        jobsPage.poNumberTab().clear().type(randomNumber);
        basePage.saveButton().click();
        cy.maxWait();
        jobsPage.poNumber().invoke('text').then(val => {
            expect(val).to.include(randomNumber);
        })
    })

    it('2. change claim number', () => {
        const randomNumber = basePage.randomNumber(1000).toString();
        jobsPage.selectActionBtn().click();
        jobsPage.changePoClaim().click();
        jobsPage.claimNumberTab().clear().type(randomNumber);
        basePage.saveButton().click();
        cy.maxWait();
        jobsPage.claimNumber().invoke('text').then(val => {
            expect(val).to.include(randomNumber);
        })
    })

    it('3. dont change po/claim number', () => {
        jobsPage.changePoClaim().click();
        jobsPage.dismissBtn().click();
    })
})