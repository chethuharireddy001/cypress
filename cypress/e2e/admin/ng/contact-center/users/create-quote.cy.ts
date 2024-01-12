

import { JobsPage } from "../../../../../page-objects/admin/jobs-page";
import { QuotesPage } from '../../../../../page-objects/admin/quotes-page';
import cypress = require("cypress");
import { wrenchUser, lmUser, properties } from "../../../../../configuration/properties";
import { BasePage } from "../../../../../page-objects/admin/base-page";
import { InfoPage } from "../../../../../page-objects/admin/manage-account/info-page";
import { ManageAccountPage } from "../../../../../page-objects/admin/manage-account/manage-account-page";
import { isLubeMobile } from "../../../../../support/utils";
import { ContactCenter } from "../../../../../page-objects/admin/contact-center-page";
import { CreateJobPage } from "../../../../../page-objects/admin/job-test-pages/create-job-page";


const contactCenter = new ContactCenter();
const infoPage = new InfoPage();
const manageAccountPage = new ManageAccountPage();
const basePage = new BasePage();
const createJobPage = new CreateJobPage();

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe("Create a Job for existing user", () => {

    it('1. Verify if the user is able to Create Quote for existing user', () => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        contactCenter.navigateToContactCenterPage();
        contactCenter.email().type(user.email);
        contactCenter.searchButton().click();
        basePage.waitForComPref();
        basePage.householdButton().click();
        manageAccountPage.getUserReady();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.userActionsButton().click();
        cy.windowHandle(infoPage.addJob());
        createJobPage.addService().scrollIntoView().click();
        if (isLubeMobile()) {
            createJobPage.serviceInput().click();
            basePage.secondOption().click();
        } else {
            createJobPage.serviceInput().type(properties.service);
            cy.minWait();
            basePage.firstOption().click();
        }
        createJobPage.addServicesButton().click();
        basePage.header().should('include.text', 'Quote');
    })
})