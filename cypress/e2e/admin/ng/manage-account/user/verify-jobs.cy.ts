import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {JobPage} from "../../../../../page-objects/admin/manage-account/job-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {lmUser, properties, wrenchUser} from "../../../../../configuration/properties";
import {isLubeMobile} from "../../../../../support/utils";
import {JobsPage} from "../../../../../page-objects/admin/job-test-pages/jobs-page";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";
import {UserWebPage} from "../../../../../page-objects/webapp/user-web-page";
import {CreateJobPage} from "../../../../../page-objects/admin/job-test-pages/create-job-page";

const manageAccountPage = new ManageAccountPage();
const jobPage = new JobPage();
const basePage = new BasePage();
const createJobPage = new CreateJobPage();
const jobsPage = new JobsPage();
const infoPage = new InfoPage();
const userWebPage = new UserWebPage();
const password = properties.password;
const note = properties.testNote;

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('/manage-account/user/verify-jobs.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
    })
    // @ts-ignore
    it('add job thru manage account > complete on webapp > validate in manage account', {tags: '@smoke'},() => {
        infoPage.passwordSection();
        infoPage.passwordChange().type(password);
        infoPage.passwordConfirm().type(password);
        basePage.updateButton().click();
        basePage.successToast();
        manageAccountPage.getUserReady();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.userActionsButton().click();
        cy.windowHandle(infoPage.addJob());
        basePage.header().should('include.text', 'Create Job');
        cy.minWait();
        createJobPage.addService().scrollIntoView().click();
        if (isLubeMobile()) {
            createJobPage.serviceInput().click();
            basePage.secondOption().click();
        } else {
            createJobPage.serviceInput().type(properties.serviceType);
            cy.minWait();
            basePage.firstOption().click();
        }
        createJobPage.addServicesButton().click();
        basePage.header().should('include.text', 'Quote');
        jobsPage.selectActionBtn().first().click();
        cy.minWait();
        jobsPage.sendQuoteOption().click();
        jobsPage.leadTimeInput().type('0');
        basePage.submitModalButton().click();
        jobsPage.quoteStatus().should('include.text', 'Waiting for User')
        cy.minWait();
        userWebPage.visitWebAppLogin();
        userWebPage.logIntoWebApp();
        userWebPage.navigateToQuotes();
        cy.minWait();
        userWebPage.scheduleAppointmentButton().click();
        userWebPage.locationNotes().clear().type(note);
        userWebPage.keyHandoffDetails().clear().type(note);
        userWebPage.nextButton().click();
        userWebPage.datePicker().click();
        userWebPage.tomorrow().click();
        for (let i = 0; i < 3; i++) {
            if (isLubeMobile()) i++;
            userWebPage.nextButton().click();
            cy.minWait();
        }
        userWebPage.toast().should('include.text', 'successfully')
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        cy.avgWait();
        jobPage.jobsPage().click();
        basePage.firstRow();
    })
    it('refresh button', () => {
        jobPage.jobsPage().click();
        basePage.interceptFindJobs();
        basePage.refreshButton().click();
        cy.wait('@findJobs');
    })
})