import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";
import {EmployeePage} from "../../../../../page-objects/admin/manage-account/employee-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";

const manageAccountPage = new ManageAccountPage();
const infoPage = new InfoPage();
const employeePage = new EmployeePage();
const basePage = new BasePage();

export function addEmployee() {
    basePage.addButton().click();
    employeePage.addEmployee();
}
export function removeEmployee() {
    basePage.userActionsButton().click();
    infoPage.disableUser().click();
    basePage.confirmButton().click();
    basePage.successToast();
}

describe('/manage-account/user/verify-employee-actions.cy.ts', () => {
    //TODO: gotta do followup checks for these
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.deleteOrgViaSQL();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createOrgViaApi();
        manageAccountPage.findOrg();
        employeePage.employeesPage().click();
        addEmployee();
        basePage.userActionsButton().click();
    })
    it('reset password', () => {
        infoPage.resetPassword().click();
        infoPage.confirmButton().click();
        basePage.successToast();
        removeEmployee();
    })
    it('unsub emails', () => {
        infoPage.unsubEmails().click();
        infoPage.confirmButton().click();
        basePage.successToast();
        removeEmployee();
    })
    it('disable user', () => {
        infoPage.disableUser().click();
        infoPage.disableUserDetails();
        basePage.xButton();
        removeEmployee();
    })
})
describe('/manage-account/user/verify-employee-actions.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.deleteOrgViaSQL();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createOrgViaApi();
        manageAccountPage.findOrg();
        employeePage.employeesPage().click();
        addEmployee();
        basePage.userActionsButton().click();
    }) //TODO: additional validations all around like user name validation etc.
    // @ts-ignore
    it('login as user', {tags: '@smoke'}, () => { //TODO: verify the url
        infoPage.loginAsUser().click();
        cy.windowHandle(infoPage.popUpConfirm());
    })
    it('add job', () => {
        cy.windowHandle(infoPage.addJob());
        cy.url().should('include', 'create_quote');
    })
    it('add bulk job', () => {
        cy.windowHandle(infoPage.addBulkJobButton());
        cy.url().should('include', 'create_bulk_job');
    })
})
