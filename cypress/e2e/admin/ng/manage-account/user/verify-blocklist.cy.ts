import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {BlocklistPage} from "../../../../../page-objects/admin/manage-account/blocklist-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {lmUser, properties, wrenchUser} from "../../../../../configuration/properties";
import {isLubeMobile} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const blocklistPage = new BlocklistPage();
const basePage = new BasePage();

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('/manage-account/user/verify-blocklist.cy.ts', () => {

    it('verify adding a technician to blocklist and removing', () => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        blocklistPage.blockListsPage().click();
        basePage.addButton().click();
        blocklistPage.addTechField().type(properties.techSingleLetter);
        basePage.firstOption().click();
        blocklistPage.interceptGetBlocklist();
        blocklistPage.addToBlocklistButton().click();
        basePage.successToast();
        cy.wait('@getBlocklist');
        blocklistPage.removeTechButton().click();
        manageAccountPage.confirmButton().click();
        basePage.successToast();
    })

})