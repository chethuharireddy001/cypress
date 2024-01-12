import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {EmployeePage} from "../../../../../page-objects/admin/manage-account/employee-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";
import {employee, properties} from "../../../../../configuration/properties";

const manageAccountPage = new ManageAccountPage();
const employeePage = new EmployeePage();
const basePage = new BasePage();
const infoPage = new InfoPage();

export function addEmployee() {
    basePage.addButton().click();
    employeePage.addEmployee();
}
export function removeEmployee() {
    basePage.userActionsButton().click();
    infoPage.disableUser().click();
    infoPage.confirmButton().last().click();
    basePage.successToast();
}
let orgId;

describe('/manage-account/organization/edit-employee.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.deleteOrgViaSQL();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createOrgViaApi();
        manageAccountPage.findOrg();
        manageAccountPage.orgIdChip().invoke('text').then(text => {
            const arr = text.split(" ");
            orgId = parseInt(arr[1]);
        })
        employeePage.employeesPage().click();
        addEmployee();
    })
    it('edit employee notes', () => {
        employeePage.notesSection().click();
        employeePage.addNote().clear().type(properties.orgNotes);
        basePage.header().contains('Customer Service Notes')
        basePage.updateButton().click();
        basePage.successToast();
        cy.location('search').should('contain', 'userId');
        cy.minWait();
        employeePage.addedNote().invoke('val')
            .then(someText => {
                expect(someText).to.include(properties.orgNotes);
            });
        removeEmployee();
    })
    it('edit employee password', () => {
        employeePage.passwordSection().click();
        employeePage.passwordField().type(properties.password);
        employeePage.confirmField().type(properties.password);
        basePage.updateButton().click();
        basePage.successToast();
        removeEmployee();
    })
    it('combine employees', () => {
        basePage.orgButton().click();
        addEmployee();
        basePage.successToastDismiss()
        employeePage.combineSection().click();
        employeePage.findUserToCombine(properties.genericEmployeeEmail);
        basePage.searchButton().last().click();
        basePage.firstRow().click();
        cy.minWait();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('editing communication preferences', () => {
        infoPage.communicationSection();
        basePage.lastCheckBox().click();
        basePage.updateButton().click();
        basePage.successToast();
    })
    // @ts-ignore
    it('edit employee roles (driver)', {tags: '@smoke'}, () => {
        employeePage.rolesSection().click();
        employeePage.addRoles().click();
        employeePage.addDriverRole();
        basePage.successToast();
        cy.minWait();
        employeePage.firstRowRole().invoke('text')
            .then(someText => {
                expect(someText).to.include('driver');
            });
        removeEmployee();
    })
    it('edit employee roles (hub manager)', () => {
        employeePage.rolesSection().click();
        employeePage.addRoles().click();
        employeePage.addHubManagerRole();
        basePage.successToast();
        cy.minWait();
        employeePage.firstRowRole().invoke('text')
            .then(someText => {
                expect(someText).to.include('Hub Manager');
            });
        removeEmployee();
    })
    it('edit employee roles (regional manager)', () => {
        employeePage.rolesSection().click();
        employeePage.addRoles().click();
        employeePage.addRegionalManagerRole();
        basePage.successToast();
        cy.minWait();
        employeePage.firstRowRole().invoke('text')
            .then(someText => {
                expect(someText).to.include('Regional Manager');
            });
        removeEmployee();
    })
    it('edit employee roles (fleet administrator)', () => {
        employeePage.rolesSection().click();
        employeePage.addRoles().click();
        employeePage.addFleetAdministratorRole();
        basePage.successToast();
        cy.minWait();
        employeePage.firstRowRole().invoke('text')
            .then(someText => {
                expect(someText).to.include('Fleet Administrator');
            });
        removeEmployee();
    })
})