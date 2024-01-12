// import { delay } from "cypress/types/bluebird";

import { isLubemobile } from "../../support/utils";

export class LoginPage {

    navigateToLoginPage(){
      return  cy.visit('/login'); 
    }

    navigateToLoginPageAndVerify() {
        cy.visit('/login');
       // cy.contains('Login').click();
        cy.url().should('include', '/login');
    }

    emailTxtField() {
        return cy.get('#username').should('be.visible');
    }

    passwordTxtField() {
        return cy.get('#password').should('be.visible');
    }

    loginThroughCustomCredentials(userName, password) {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get(".mat-form-field").contains('Email');
        cy.get('#username').should('be.visible').click().type(userName);
        cy.get('[data-cy=submitEmailButton]').click();
        cy.get(".mat-form-field").contains('Password');
        cy.get('#password').should('be.visible').click().type(password);
        cy.minWait();
        cy.get('[data-cy=submitLoginButton]').should('be.visible').should('be.enabled').click();
     }
     verifyLoginError(message){
        if (isLubemobile()) {
            cy.get('#wrench-error > :nth-child(3) > .ng-star-inserted').should('be.visible').should('have.text', message);
        } else {
            cy.get('#wrench-error > :nth-child(2)').should('be.visible').should('have.text', message);
        }
     }
    loginButton() {
        return cy.get('[data-cy=submitLoginButton]').should('be.visible');
    }

    submitEmailButton(){
        return cy.get('[data-cy=submitEmailButton]').should('be.visible');
    }

    errorMsg() {
        return cy.get('#wrench-error').should('be.visible');
    }

    radioButton() {
        return cy.get('.mat-radio-inner-circle').should('be.visible');
    }

    continueButton() {
        return cy.get('[data-cy=continueButton]').should('be.visible');
    }

    selectRole() {
        return cy.get('#role-radio-group-label').contains('Select your role').should('be.visible');
    }

    selectheadOfCompany() {
        return cy.get('.padding-bottom-10').contains('Head Of Company').should('be.visible');
    }

    selectDriver(){
        return cy.get('.padding-bottom-10 > :nth-child(1)').contains('Driver').should('be.visible');
    }

}