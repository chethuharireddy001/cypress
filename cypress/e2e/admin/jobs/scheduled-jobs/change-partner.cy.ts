import { BasePage } from "../../../../page-objects/admin/base-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";
import { ApiUtils } from "../../../../page-objects/api-utils";

const basePage = new BasePage();
const apiUtils = new ApiUtils();
const jobsPage = new JobsPage();

describe('Change Partner', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
    })

    it('1. change partner', () => {
        jobsPage.changePartner().click();
        basePage.h3().should('contain.text', 'Change Partner');
        jobsPage.partnerDropdown().select(1);
        basePage.saveButton().click();
        jobsPage.successToast();
    })

    it('2. dont change partner', () => {
        jobsPage.changePartner().click();
        jobsPage.closeModalBtn().click();
    })
})