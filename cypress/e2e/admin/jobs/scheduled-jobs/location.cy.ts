import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { usAddress, auAddress } from "../../../../configuration/properties";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { LocationPage } from "../../../../page-objects/admin/manage-account/location-page";
import { isLubeMobile } from "../../../../support/utils";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
const locationPage = new LocationPage();

let location = usAddress;
if (isLubeMobile()) location = auAddress;

describe('Location', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
    })

    it('1. change location', () => {
        jobsPage.viewUserButton().click();
        cy.maxWait();
        basePage.orgButton().click();
        locationPage.locationsPage().click();
        basePage.addButton().scrollIntoView().click();
        locationPage.fillAddLocationPopUp(location);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.sideNavMenu().click();
        jobsPage.sideNavJobsPage().click();
        jobsPage.jobStatusScheduled();
        jobsPage.searchJobsButton().click();
        cy.avgWait();
        jobsPage.searchJobsButton().click();
        jobsPage.goToFirstJob();
        basePage.waitForPageToLoad();
        jobsPage.selectActionLocationButton().click();
        jobsPage.changeLocation().click();
        basePage.h3().should('include.text', 'Change Job Location');
        jobsPage.locationDropdown().select(0);
        jobsPage.changeLocationBtn().click();
        jobsPage.successToast();
    })

    it('2. cancelling change location', () => {
        jobsPage.selectActionLocationButton().click();
        jobsPage.changeLocation().click();
        basePage.h3().should('include.text', 'Change Job Location');
        jobsPage.locationDropdown().select(0);
        jobsPage.closeModalBtn().click();
    })

    it('3. change labor rate', () => {
        jobsPage.selectActionLocationButton().click();

        jobsPage.changeLaborRate().click();
        basePage.h3().should('include.text', 'Change Labor Rate');
        jobsPage.laborRateTab().clear().type('100');
        jobsPage.changeLaborRateBtn().click();
        jobsPage.successToast();
    })

    it('4. cancelling change labor rate', () => {
        jobsPage.selectActionLocationButton().click();

        jobsPage.changeLaborRate().click();
        jobsPage.closeModalBtn().click();
    })

    it('5. invalid input in labor rate tab', () => {
        jobsPage.selectActionLocationButton().click();

        jobsPage.changeLaborRate().click();
        jobsPage.laborRateTab().clear().type('100a');
        jobsPage.changeLaborRateBtn().click();
        basePage.errorToast();
    })
})
