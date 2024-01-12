export class LoginPage {

    navigateToJsLoginPage() {
        cy.visit(Cypress.env('legacyLoginPage'));
        return cy.url().should("include", "login");
    }

    navigateToLoginPage() {
        cy.visit(Cypress.env('loginPage'));
        return cy.url().should("include", "login");
    }

    emailInputJs() {
        return cy.getDataCy('loginUsername').should('be.visible');
    }

    passwordInputJs() {
        return cy.getDataCy('loginPassword');
    }

    signInButtonJs() {
        return cy.getDataCy('loginSignIn');
    }

    forgotPassword() {
        return cy.getDataCy('forgotPassword').should("be.visible");
    }

    resetPassword() {
        return cy.get('title').contains('Reset Password');
    }

    incorrectUserNameOrPassword() {
        return cy.get('[id="wrench-error"]');
    }

    emailInput() {
        return cy.getDataCy('emailField');
    }

    passwordInput() {
        return cy.getDataCy('passwordField');
    }

    loginButton() {
        return cy.getDataCy('loginButton');
    }
}


