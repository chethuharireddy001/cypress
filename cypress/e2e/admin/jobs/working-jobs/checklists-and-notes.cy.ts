import { properties } from "../../../../configuration/properties";
import { BasePage } from "../../../../page-objects/admin/base-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";


const jobsPage = new JobsPage();
const basePage = new BasePage();
const text = properties.testNote;

describe('Checklists and Notes', () => {

    beforeEach(() => {
        cy.login();
        basePage.interceptFindProviders();
        jobsPage.goToJobsScreen();
        cy.wait('@findProviders');
        jobsPage.jobStatusDropdown().select(4);
        jobsPage.searchJobsButton().click();
        jobsPage.goToFirstJob();
        basePage.waitForPageToLoad();
    })

    it('1. verify checklists and notes appear', () => {
        jobsPage.mileageField().should('not.be.enabled');
        jobsPage.selectActionBtn().click();
        jobsPage.changeJobStatus().click();
        jobsPage.statusDropdown().select('Working');
        jobsPage.saveBtn().click();
        basePage.header().should('contain.text', 'Working');
        cy.reload();
        jobsPage.mileageField().should('be.enabled');
    })

    it('2. verify updating mileage', () => {
        jobsPage.mileageField().clear().type('12000');
        jobsPage.updateMileage().click();
        jobsPage.successAlert().should('include.text', 'Mileage has been successfully updated!');
    })

    it('3. verify updating notes', () => {
        jobsPage.summaryField().clear().type(text);
        jobsPage.concernField().clear().type(text);
        jobsPage.causeField().clear().type(text);
        jobsPage.correctionField().clear().type(text);
        jobsPage.recommendationField().clear().type(text);
        jobsPage.updateNotesButton().click();
        jobsPage.successAlert().should('include.text', 'Notes were successfully updated.');
        cy.reload();
        jobsPage.summaryField().invoke('val').then(text2 => {
            expect(text2).to.eq(text);
        })
    })
})