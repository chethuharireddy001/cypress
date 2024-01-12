import {JobsPage} from "../../../../page-objects/admin/job-test-pages/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";

const basePage = new BasePage();
const jobsPage = new JobsPage();

describe('Complete - Billing Status (Ready to Bill)' , () => {
    beforeEach(() => {
        cy.login();
        basePage.interceptFindProviders();
        jobsPage.goToJobsScreen();
        cy.wait('@findProviders');
        jobsPage.jobStatusScheduled();
        jobsPage.searchJobsButton().click();
        jobsPage.goToFirstJob();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.jobStatusDropdown().select(5);
        jobsPage.saveBtn().click();
    })
    it('verify apply payment button', () => {
        jobsPage.openPaymentStatus().should('have.text', 'Billing Status (Ready to Bill)');
        jobsPage.balanceText().invoke('text').then(balance => {
            jobsPage.adjustBtn().click();
            cy.minWait();
            jobsPage.applyPayment().click();
            // currently can't access any further than this point so these are left with no page objects
            cy.get('.mat-button-wrapper').contains('Set to job balance').click();
            cy.get('.mat-dialog-actions > .mat-primary').click();
            cy.get('tbody > :nth-child(16) > :nth-child(2)').should('include.text', balance);
        })
        jobsPage.openPaymentStatus().should('have.text', 'Billing Status (Payment Received)');
    })
    it('verify full refund button', () => {
        jobsPage.adjustBtn().click();
        jobsPage.fullRefundBtn().click();
        jobsPage.refundsText().should('be.visible');
    })
    it('verify manual transaction button', () => {
        jobsPage.adjustBtn().click();
        cy.minWait();
        jobsPage.manualTransBtn().click();
    })
})