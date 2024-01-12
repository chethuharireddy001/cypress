import {JobsPage} from "../../../page-objects/admin/jobs-page";

const jobsPage = new JobsPage();

describe('Jobs Page', () => {

    it('1. search fields should be enabled', () => {
        cy.login();
        jobsPage.goToJobsScreen();
        jobsPage.fieldsSanity();
    })
})