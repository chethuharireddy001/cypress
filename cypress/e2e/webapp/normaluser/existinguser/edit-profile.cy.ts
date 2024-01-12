import { fleetUsers, lmFleetUser, lmNormalUser } from "../../../../configuration/properties";
import { LoginPage } from "../../../../page-objects/webapp/login-page";
import { AccountsPage } from "../../../../page-objects/webapp/accounts-page";
import { AppointmentsPage } from "../../../../page-objects/webapp/appointments-page";
import { LmUserPage } from "../../../../page-objects/webapp/lm-user-page";
import { isLubemobile } from "../../../../support/utils";


const loginPage = new LoginPage();
const lmUserPage = new LmUserPage();
const appointmentsPage = new AppointmentsPage();
const accountsPage = new AccountsPage();

const lm = isLubemobile();
const Data = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;
const User = lmNormalUser



describe('webapp/normaluser/existinguser/edit-profile.cy.ts', () => {

    before(() => {

        lmUserPage.loginNormalUserLm(User.normalUser1, User.password);
        appointmentsPage.verifyAppointmentsPage();
        lmUserPage.lmMenu();
        accountsPage.navigateToProfilePage();
    });

    it("1. verify change password functinality in profile screen", () => {

        accountsPage.changePassword().click();
        accountsPage.oldPassworrd().type(User.password);
        accountsPage.passwordEntry().type(User.newPassword);
        accountsPage.passwordConfirm().type(User.newPassword);
        accountsPage.resetPasswordBtn().click();
        cy.avgWait();
    });

    it("2. verify user able login with old password", () => {

        lmUserPage.loginNormalUserLm(User.normalUser1, User.password);
        loginPage.verifyLoginError(Data.errorMessage)

    });

    it("3. verify user able login with new password and update password to old ", () => {

        lmUserPage.loginNormalUserLm(User.normalUser1, User.newPassword);
        appointmentsPage.verifyAppointmentsPage();
        lmUserPage.lmMenu();
        accountsPage.navigateToProfilePage();
        accountsPage.changePassword().click();
        accountsPage.oldPassworrd().type(User.newPassword);
        accountsPage.passwordEntry().type(User.password);
        accountsPage.passwordConfirm().type(User.password);
        accountsPage.resetPasswordBtn().click();
        cy.avgWait();

    });

    it("4 .edit userinfo and test update button", () => {
        
        lmUserPage.loginNormalUserLm(User.normalUser1, User.password);
        appointmentsPage.verifyAppointmentsPage();
        lmUserPage.lmMenu();
        accountsPage.navigateToProfilePage();
        accountsPage.lastName().clear().type(User.userLastname);
        accountsPage.phonenumber().clear().type(Data.originalphoneNo);
        accountsPage.updateButton().click();
    })

});

