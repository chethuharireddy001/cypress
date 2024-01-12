import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { ApiUtils } from "../../../../page-objects/api-utils";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();

describe('Job Notes', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
    })

    it('1. adding job notes', () => {
        jobsPage.addJobNote().click();
        basePage.waitForPageToLoad();
        basePage.h3().should('include.text', 'Job Notes');
        jobsPage.jobNoteTab().type('This is not a job note!');
        jobsPage.saveJobNotesButton().click({force: true});
        jobsPage.successToast();
        jobsPage.addedJobNotes().should('contain.text', 'This is not a job note!');
    })

    it('2. cancelling on adding a job note', () => {
        jobsPage.addJobNote().click()
        jobsPage.closeModalBtn().click();
    })
})