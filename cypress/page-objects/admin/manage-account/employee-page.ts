import {lmUser, properties, wrenchUser} from "../../../configuration/properties";
import {BasePage} from "../base-page";
import {getRandomNumber, isLubeMobile} from "../../../support/utils";

const basePage = new BasePage();
const faker = require("faker");
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

export class EmployeePage {

    employeesPage() {
        cy.intercept('user/findusers').as('authRequest');
        return cy.getDataCy('Employees').should('be.visible');
    }

    firstName() {
        return cy.getDataCy('firstName').should('be.visible');
    }

    lastName() {
        return cy.getDataCy('lastName');
    }

    nickName() {
        return cy.getDataCy('nickName');
    }

    email() {
        return cy.getDataCy('email');
    }

    phone() {
        return cy.getDataCy('phone');
    }

    altPhone() {
        return cy.getDataCy('altPhone');
    }

    addEmployee() {
        this.firstName().type(firstName);
        this.lastName().type(lastName);
        this.nickName().type(firstName+lastName);
        this.email().type('kjankurt+employee'+getRandomNumber(9999)+'@wrench.com');
        this.phone().type(user.phone);
        this.altPhone().type(user.phone);
        cy.getDataCy('howCustomerHeard').should('be.visible');
        basePage.popUpAddButton().click();
    }

    dontAddEmployee() {
        this.firstName().click();
        this.lastName().click();
        this.email().click();
        this.phone().click();
        this.altPhone().click();
        cy.getDataCy('firstNameError').should('be.visible');
        cy.getDataCy('lastNameError').should('be.visible');
        cy.getDataCy('emailError').should('be.visible');
        // cy.getDataCy('phoneError').should('be.visible'); waiting for GEN-8854
        basePage.xButton();
    }

    notesSection() {
        return cy.get('div[role=tab]').eq(1).should('be.visible');
    }

    addNote() {
        return cy.getDataCy('addNote').should('be.visible');
    }

    addedNote() {
        return cy.getDataCy('addedNotes').should('be.visible');
    }

    passwordSection() {
        return cy.get('div[role=tab]').eq(2).should('be.visible');
    }

    passwordField() {
        return cy.getDataCy('password').should('be.visible');
    }

    confirmField() {
        return cy.getDataCy('confirm').should('be.visible');
    }

    combineSection() {
        return cy.get('div[role=tab]').eq(3).should('be.visible');
    }

    findUserToCombine(userEmail) {
        return cy.getDataCy('findUserEmail').type(userEmail);
    }

    rolesSection() {
        return cy.get('div[role=tab]').eq(5);
    }

    addRoles() {
        return cy.getDataCy('addRoleButton').should('be.visible');
    }

    addDriverRole() {
        cy.getDataCy('roleDropdown').click();
        basePage.firstOption().click();
        cy.getDataCy('regionDropdown').click();
        basePage.firstOption().click();
        cy.getDataCy('hubDropdown').click();
        basePage.firstOption().click();
        basePage.popUpAddButton().click();
    }

    firstRowRole() {
        return cy.get(':nth-child(2) > .cdk-column-roleName').should('be.visible');
    }

    addHubManagerRole() {
        cy.getDataCy('roleDropdown').click();
        basePage.secondOption().click();
        cy.getDataCy('regionDropdown').click();
        basePage.firstOption().click();
        cy.getDataCy('hubDropdown').click();
        basePage.firstOption().click();
        basePage.popUpAddButton().click();
    }

    addRegionalManagerRole() {
        cy.getDataCy('roleDropdown').click();
        cy.get('mat-option[role="option"]').eq(2).click();
        cy.getDataCy('regionDropdown').click();
        basePage.firstOption().click();
        basePage.popUpAddButton().click();
    }

    addFleetAdministratorRole() {
        cy.getDataCy('roleDropdown').click();
        cy.get('mat-option[role="option"]').eq(3).click();
        basePage.popUpAddButton().click();
    }
}