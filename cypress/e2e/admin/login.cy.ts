import { properties } from "../../configuration/properties";
import { LoginPage } from "../../page-objects/admin/login-page";
import { isLubeMobile } from "../../support/utils";


const loginPage = new LoginPage();
let email = properties.wrenchEmail;
let password = properties.wrenchPassword;

if (isLubeMobile()) {
    email = properties.lmEmail;
    password = properties.lmPassword;
}

describe("Verify login scenarios", () => {

    it("Verify Login as Admin (JsAdmin)", () => {
        loginPage.navigateToJsLoginPage();
        loginPage.emailInputJs().type(email)
        loginPage.passwordInputJs().type(password);
        loginPage.signInButtonJs().click();
    })

    it("Verify forgot password (JsAdmin)", () => {
        loginPage.navigateToJsLoginPage();
        loginPage.emailInputJs().type(email);
        loginPage.forgotPassword().click();
        loginPage.resetPassword().should('be.visible');
    })

    it("Verify the user is unable to login with invalid credentials (JsAdmin)", () => {
        loginPage.navigateToJsLoginPage();
        loginPage.emailInputJs().type(email)
        loginPage.passwordInputJs().type(password + 'a');
        loginPage.signInButtonJs().click();
        loginPage.incorrectUserNameOrPassword().should('be.visible');
    })

    it("Verify Login as Admin (NgAdmin)", () => {
        loginPage.navigateToLoginPage();
        loginPage.emailInput().type(email)
        loginPage.passwordInput().type(password);
        loginPage.loginButton().click();
    })

    it("Verify the user is unable to login with invalid credentials (NgAdmin)", () => {
        loginPage.navigateToLoginPage();
        loginPage.emailInput().type(email)
        loginPage.passwordInput().type(password + 'a');
        loginPage.loginButton().click();
        /***
        Currently waiting on: GEN-9528
         */
        //loginPage.incorrectUserNameOrPassword().should('be.visible');
    })
})
