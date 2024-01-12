import { fleetUsers } from "../../configuration/properties";
export class SignUpPage {


    navigateToSignUpPageAndVerify() {
        cy.visit('newaccount?fleet=true');
        cy.url().should('include', '/newaccount');
    }
    navigateToSignUpPage() {
        cy.visit('newaccount');
        cy.url().should('include', '/newaccount');
    }
    
    createAccountButton() {
        return cy.get('[data-cy=ModalButton]').should('be.visible');
    }

    createSignupCustomQuote() {
        return cy.get('[data-cy=signupGetCustomQuote]').should('be.visible');

    }

    createSignupAccountButton() {
        return cy.get('[data-cy=signupCreateAccount]').should('be.visible');
    }

    getCustomQuoteBtn() {
        return cy.get('[data-cy=create_accountNext]').should('be.visible');
    }

    phoneNumberTxtField() {
        return cy.get('#phone').should('be.visible').click().type('(253) 278-3497');
    }

    signUpDetails(fleetUsers) {
        cy.get('#name').type(fleetUsers.name);
        cy.typeNewUserEmail('#signupEmail');
        cy.get('.mat-form-field-infix > [data-cy=phoneNumber]').type(fleetUsers.phoneNumber);
        cy.get('#zip').type(fleetUsers.pinCode);
        cy.get('#company').type('ck');
        cy.get('#password').type(fleetUsers.Password);
        cy.get('#passwordConfirm').type(fleetUsers.Password);   
    }
    normalUserSignUpDetails(normal) {
        cy.get('#name').type(normal.name);
        cy.typeNewUserEmail('#signupEmail');
        cy.get('.mat-form-field-infix > [data-cy=phoneNumber]').type(normal.phoneNumber);
        cy.get('#zip').type(normal.pinCode);
        cy.get('#password').type(normal.Password);
        cy.get('#passwordConfirm').type(normal.Password);   
    }

    clickHearAboutUs() {
        return cy.get('#referral').should('be.visible');
    }

    selectHearAboutUs(Google) {
        cy.get('.mat-option').contains(Google).then(option => {
        cy.wrap(option).contains(Google);
        option[0].click();
        cy.get('#referral').contains(Google);
        });
    }

    createAccountSignUp() {
    return cy.get('[data-cy=createAccountButton]').should('be.visible');
    }


}