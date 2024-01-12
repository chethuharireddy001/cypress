import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {lmUser, wrenchUser} from "../../../../../configuration/properties";
import {isLubeMobile} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const infoPage = new InfoPage();
const basePage = new BasePage();

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('/manage-account/user/verify-user-actions.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.userActionsButton().click();
    })
    it('activate account', () => {
        infoPage.activateAccount().click();
        infoPage.confirmButton().click();
        basePage.successToast();
    })
    it('unsub emails', () => {
        infoPage.unsubEmails().click();
        infoPage.confirmButton().click();
        basePage.successToast();
    })
    it('login as user', () => {
        infoPage.loginAsUser().click();
        cy.windowHandle(infoPage.popUpConfirm());
    })
    it('disable user', () => {
        infoPage.disableUser().click();
        infoPage.disableUserDetails();
    })
    // @ts-ignore
    it('add job', {tags: '@smoke'}, () => {
        cy.windowHandle(infoPage.addJob());
    })
    it('add bulk job', () => {
        cy.windowHandle(infoPage.addBulkJobButton());
    })
})