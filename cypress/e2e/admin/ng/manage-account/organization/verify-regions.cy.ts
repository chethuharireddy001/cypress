import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {RegionPage} from "../../../../../page-objects/admin/manage-account/region-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {properties} from "../../../../../configuration/properties";

const manageAccountPage = new ManageAccountPage();
const regionPage = new RegionPage();
const basePage = new BasePage();
const region = properties.regionName;

describe('/manage-account/organization/verify-regions.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.organizationTab().click();
        manageAccountPage.findOrg();
        regionPage.regionsTab().click();
    })
    // @ts-ignore
    it('verify adding a region (positive)', {tags: '@smoke'}, () => {
        basePage.addButton().click();
        regionPage.addRegionName().type(region);
        regionPage.addRegionNotes().type('This is '+region+' region');
        basePage.popUpAddButton().click();
        basePage.successToast();
        cy.minWait();
        basePage.backToListButton().click();
        regionPage.findRegion(region);
        basePage.firstRow().click();
        basePage.kebabButton().click();
        regionPage.removeRegion().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('verify adding a region (negative)', () => {
        basePage.addButton().click();
        regionPage.addRegionName().click();
        regionPage.addRegionNotes().click();
        basePage.errorMessage();
    })
    it('verify editing a region', () => {
        basePage.addButton().click();
        regionPage.addRegionName().type(region);
        basePage.popUpAddButton().click();
        cy.avgWait();
        basePage.firstRow().click();
        regionPage.addRegionName().type('-1');
        regionPage.addRegionNotes().clear().type('Edited');
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        regionPage.removeRegion().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
})