import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { PaymentPage } from "../../../../page-objects/admin/manage-account/payment-page";


const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
const paymentPage = new PaymentPage();

describe('Payment', () =>  {

    beforeEach(() => {
        cy.login();
        jobsPage.goToJobsScreen();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
    })

    it('1. change payment method', () => {
        jobsPage.viewUserButton().click();
        cy.maxWait();
        basePage.orgButton().click();
        paymentPage.paymentsPage().click();
        paymentPage.addPaymentButton().click();
        paymentPage.addPaymentFlow();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
        basePage.sideNavMenu().click();
        jobsPage.sideNavJobsPage().click();
        jobsPage.jobStatusScheduled();
        jobsPage.searchJobsButton().click();
        cy.avgWait();
        jobsPage.searchJobsButton().click();
        jobsPage.goToFirstJob();
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changePaymentMethod().click();
        jobsPage.paymentDropdown().select(2);
        basePage.saveButton().click();
        jobsPage.successToast();
    })

    it('2. cancel change payment method', () => {
        jobsPage.selectActionBtn().click();
        jobsPage.changePaymentMethod().click();
        basePage.cancelButton().click();
    })
})