import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {HubPage} from "../../../../../page-objects/admin/manage-account/hub-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {properties} from "../../../../../configuration/properties";

const manageAccountPage = new ManageAccountPage();
const hubPage = new HubPage();
const basePage = new BasePage();

describe('/manage-account/organization/verify-hubs.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.organizationTab().click();
        manageAccountPage.findOrg();
        hubPage.hubsTab().click();
        basePage.addButton().click();
        hubPage.selectRegion().click();
        basePage.firstOption().click();
        hubPage.addHubName().type(properties.hubName);
    })
    // @ts-ignore
    it('verify adding a hub (positive)', {tags: '@smoke'}, () => {
        hubPage.addHubNotes().type('Test hub');
        basePage.popUpAddButton().click();
        basePage.successToast();
    })
    it('verify adding a hub (negative)', () => {
        hubPage.addHubName().clear();
        hubPage.addHubNotes().click();
        hubPage.errorMessage();
    })
    it('edit a hub', () => {
        hubPage.interceptFindHubs();
        basePage.popUpAddButton().click();
        cy.wait('@findHubs');
        basePage.firstRow().click();
        hubPage.addHubName().type('-1');
        hubPage.addHubNotes().clear().type('Edited');
        basePage.popUpAddButton().click();
        basePage.successToast();
    })
})
