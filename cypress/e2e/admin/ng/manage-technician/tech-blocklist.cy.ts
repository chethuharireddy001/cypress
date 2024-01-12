import {ManageAccountPage} from "../../../../page-objects/admin/manage-account/manage-account-page";
import {BlocklistPage} from "../../../../page-objects/admin/manage-account/blocklist-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import {properties, techData, wrenchUser} from "../../../../configuration/properties";
import {ManageTechPage} from "../../../../page-objects/manage-tech-page";

const manageAccountPage = new ManageAccountPage();
const blocklistPage = new BlocklistPage();
const basePage = new BasePage();
const manageTechPage = new ManageTechPage();

let user = wrenchUser;
let market = techData.market;

describe('Tech, blocklist', () => {

    it('verify adding tech to blocklist', () => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.householdButton().click();
        blocklistPage.blockListsPage().click();
        basePage.addButton().click();
        blocklistPage.addTechField().type(properties.techToBlock);
        basePage.firstOption().click();
        blocklistPage.addToBlocklistButton().click();
        basePage.successToast();
        manageTechPage.navigateToManageTech();
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.searchButton().click();
        basePage.firstRow().click();
        manageTechPage.blocklistTab().click();
        manageTechPage.firstHousehold().should('include.text', user.lastName + ' Household');
        manageTechPage.removeButton().first().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
})