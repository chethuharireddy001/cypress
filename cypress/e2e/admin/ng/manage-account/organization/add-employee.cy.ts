import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {EmployeePage} from "../../../../../page-objects/admin/manage-account/employee-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";

const infoPage = new InfoPage();
const manageAccountPage = new ManageAccountPage();
const employeePage = new EmployeePage();
const basePage = new BasePage();

describe('/manage-account/organization/add-employee.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.deleteOrgViaSQL();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createOrgViaApi();
        manageAccountPage.findOrg();
        employeePage.employeesPage().click();
    })
    // @ts-ignore
    it('verify adding and deleting employee', {tags: '@smoke'}, () => {
        basePage.addButton().click();
        employeePage.addEmployee();
        basePage.successToast();
        employeePage.email().invoke('val').then(text => {
                expect(text).to.include('kjankurt');
            });
        basePage.backToListButton().click();
        basePage.firstRow().click();
        basePage.userActionsButton().click();
        infoPage.disableUser().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('cancel on adding an employee and verify required field error messages', () => {
        basePage.addButton().click();
        basePage.header().should('include.text', 'Add Employee');
        employeePage.dontAddEmployee();
        manageAccountPage.header().should('not.include.text', 'Add Employee');
    })
})