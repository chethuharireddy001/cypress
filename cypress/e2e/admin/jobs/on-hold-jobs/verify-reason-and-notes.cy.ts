import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { properties } from "../../../../configuration/properties";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
const statement = properties.testNote;

describe('Verify the reason and notes for on hold', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select('On Hold');
    })

    it('1. verify reason for on hold', () => {
        jobsPage.cancellingReason().invoke('text').then(text => {
            jobsPage.cancellingReason().click();
            basePage.confirmButton().click();
            jobsPage.onHoldReasonText().invoke('text').then(text2 => {
                expect(text2).to.include(text.trim());
            })
        })
    })

    it('2. verify on hold notes', () => {
        jobsPage.cancellingReason().first().click();
        jobsPage.cancellingStatement().type(statement);
        basePage.confirmButton().click();
        jobsPage.onHoldReasonText().should('include.text', statement);
    })
})