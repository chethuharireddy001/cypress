import {BasePage} from "../../../../../page-objects/admin/base-page";
import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";

const infoPage = new InfoPage();
const basePage = new BasePage();
const manageAccountPage = new ManageAccountPage();

describe('/manage-account/organization/add-organization.cy.ts', () => {

    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createNewAccount();
        manageAccountPage.addOrgButton().click();
    })
    // @ts-ignore
    it('add and delete organization', {tags: '@smoke'}, () => {
        manageAccountPage.addOrganization();
        basePage.popUpAddButton().click();
        basePage.successToast();
        infoPage.statusDropdown().click();
        basePage.theOtherDropdownOption().click();
        basePage.popUpAddButton().click();
    })
    it('dont add organization', () => {
        manageAccountPage.dontAddOrg();
        basePage.header().should('not.include.text', 'Add Organization');
    })
})