import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { AccountsPage } from "../../../../../page-objects/webapp/accounts-page";
import { LocationPage } from "../../../../../page-objects/webapp/location-page";
import { PaymentPage } from "../../../../../page-objects/webapp/payment-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { ZipPage } from "../../../../../page-objects/webapp/zip-page";
import { isLubemobile } from "../../../../../support/utils";
import { getfeatures } from "../../../../../support/features";

const servicesPage = new ServicesPage();
const loginPage = new LoginPage();
const accountsPage = new AccountsPage();
const locationPage = new LocationPage();
const paymentPage = new PaymentPage();
const zipPage = new ZipPage();

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/hub-manager/edit-profile.cy.ts', () => {

    beforeEach(() => {
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetHubManager, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        zipPage.navigateToAccountPage();

    });

    it("1.Reset password and Verify user able to login with old passowrd", () => {

        accountsPage.changePassword().click();
        accountsPage.oldPassworrd().type(fleet.migratedFleetPassword);
        accountsPage.passwordEntry().type(fleet.newPassword);
        accountsPage.passwordConfirm().type(fleet.newPassword);
        accountsPage.resetPasswordBtn().click();
        zipPage.navigateToAccountPage();
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetHubManager, fleet.migratedFleetPassword);
        loginPage.verifyLoginError(fleet.errorMessage)
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetHubManager, fleet.newPassword);
        servicesPage.verifyFleetDashboardPage();
        zipPage.navigateToAccountPage();
        accountsPage.changePassword().click();
        accountsPage.oldPassworrd().type(fleet.newPassword);
        accountsPage.passwordEntry().type(fleet.migratedFleetPassword);
        accountsPage.passwordConfirm().type(fleet.migratedFleetPassword);
        accountsPage.resetPasswordBtn().click();
        zipPage.navigateToAccountPage();
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetHubManager, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
    });

    it("2. edit userinfo and test update button", () => {

        accountsPage.lastName().clear().type(fleet.editedLastname);
        accountsPage.phonenumber().clear().type(fleet.editedPhonenumber);
        accountsPage.updateButton().click();
        cy.reload()
        accountsPage.lastName().clear().type(fleet.originalhubmngrname);
        accountsPage.phonenumber().clear().type(fleet.originalphoneNo);
        accountsPage.updateButton().click();
    })
    
    if (getfeatures().addPayment) {
        it("3. Add payment, set default and delete payment from profile screen", () => {
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
        });
    }
});
