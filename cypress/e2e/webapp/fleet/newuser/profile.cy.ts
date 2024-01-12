
import { PaymentPage } from "../../../../page-objects/webapp/payment-page";
import { ServicesPage } from "../../../../page-objects/webapp/services-page";
import { SignUpPage } from "../../../../page-objects/webapp/signup-page";
import { fleetUsers, lmFleetUser } from "../../../../configuration/properties";
import { AccountsPage } from "../../../../page-objects/webapp/accounts-page";
import { ZipPage } from "../../../../page-objects/webapp/zip-page";
import { LoginPage } from "../../../../page-objects/webapp/login-page";
import { isLubemobile } from "../../../../support/utils";
import { getfeatures } from "../../../../support/features";

const signUpPage = new SignUpPage();
const servicesPage = new ServicesPage();
const paymentPage = new PaymentPage();
const accountsPage = new AccountsPage();
const zipPage = new ZipPage();
const loginPage = new LoginPage();

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/newuser/profile.cy.ts', () => {

    beforeEach(() => {
        signUpPage.navigateToSignUpPageAndVerify();
        signUpPage.signUpDetails(fleet);
        signUpPage.clickHearAboutUs().click();
        signUpPage.selectHearAboutUs(fleet.hearAboutUs);
        signUpPage.createAccountSignUp().click();
        servicesPage.verifyBookVehiclePage();
        zipPage.navigateToAccountPage();

    });

    it('1.verifying all functinality in profile screen', () => {
        
        if (getfeatures().addPayment) {
            // 1. Add payment, set default and delete payment from profile scree
            paymentPage.addPaymentBtn().click();
            paymentPage.fillCreditCardDetails();
            paymentPage.addPaymentdetails().click();
            accountsPage.verifyAccountsPage();
            cy.avgWait();
            paymentPage.deleteFirstPaymentmethod().click();
            accountsPage.warningCancel().click();
            accountsPage.verifyAccountsPage();
            paymentPage.deleteFirstPaymentmethod().click({ force: true });
            accountsPage.warningOk().click();
            cy.minWait();
            accountsPage.verifyAccountsPage();
        }
        // 2. Reset password and Verify user able to login with old passowrd"
        accountsPage.changePassword().click();
        accountsPage.oldPassworrd().type(fleet.migratedFleetPassword);
        accountsPage.passwordEntry().type(fleet.newPassword);
        accountsPage.passwordConfirm().type(fleet.newPassword);
        accountsPage.resetPasswordBtn().click();
        zipPage.navigateToAccountPage();
        // 3. Edit userinfo and test update button"
        accountsPage.lastName().clear().type(fleet.editedLastname);
        accountsPage.phonenumber().clear().type(fleet.editedPhonenumber);
        accountsPage.updateButton().click();
        cy.reload()
        accountsPage.lastName().clear().type(fleet.originalLastname);
        accountsPage.phonenumber().clear().type(fleet.originalphoneNo);
        accountsPage.updateButton().click();
    });

});
