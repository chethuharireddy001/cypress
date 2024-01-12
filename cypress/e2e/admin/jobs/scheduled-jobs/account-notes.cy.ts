import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { properties } from "../../../../configuration/properties";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { DbUtils } from "../../../../page-objects/db-utils";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
const dbUtils = new DbUtils();
const note = properties.testNote;

describe('Account Notes',() => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
    })

    afterEach(() => {
        jobsPage.legacyJobId().invoke('text').then(jobId => {
            jobId = jobId.replace(/[()]/g, "");
            dbUtils.deleteJob(jobId);
        })
    })

    it('1. add account notes',() => {
        jobsPage.addAccountNotesBtn().click();
        jobsPage.notesTab().type(note);
        cy.intercept('user/updateuser').as('updateUser');
        jobsPage.saveNotesBtn().click();
        cy.wait('@updateUser');
        jobsPage.assertNote(note);

    })

    it('2. cancel on adding account notes',() => {
        jobsPage.addAccountNotesBtn().click();
        jobsPage.closeModalBtn().click();
    })
})