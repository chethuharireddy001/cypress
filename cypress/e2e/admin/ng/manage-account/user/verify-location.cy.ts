import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {LocationPage} from "../../../../../page-objects/admin/manage-account/location-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {
    auAddress,
    lmUser,
    properties,
    usAddress,
    usFullAddress,
    wrenchUser
} from "../../../../../configuration/properties";
import {isLubeMobile, Utils} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const locationPage = new LocationPage();
const basePage = new BasePage();
const utils = new Utils();
const note = properties.testNote;

let user = wrenchUser;
let address = usAddress;
let secondAddress = usFullAddress;
if (isLubeMobile()) {
    user = lmUser;
    address = auAddress;
}

describe('/manage-account/user/verify-location.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.householdButton().click();
        locationPage.locationsPage().click();
        basePage.addButton().click();
    })
    // @ts-ignore
    it('1. adding and removing location', {tags: '@smoke'}, () => {
        locationPage.fillAddLocationPopUp(address);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.householdButton().click();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        locationPage.removeLocation().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('2. Edit location details', () => {
        locationPage.fillAddLocationPopUp(address);
        cy.intercept('user/updatelocation').as('updateLocation');
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        locationPage.address().clear().type(secondAddress.address);
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();
        utils.assertViaVal(locationPage.address(), secondAddress.address);

        locationPage.city().clear().type(secondAddress.city);
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();
        utils.assertViaVal(locationPage.city(), secondAddress.city);

        locationPage.zip().clear().type(secondAddress.zip);
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();
        utils.assertViaVal(locationPage.zip(), secondAddress.zip);

        locationPage.locationType().click();
        basePage.theOtherDropdownOption().click();
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();

        locationPage.label().click();
        basePage.theOtherDropdownOption().click();
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();

        locationPage.keyDetails().clear().type(note);
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();
        utils.assertViaVal(locationPage.keyDetails(), note);

        locationPage.notes().clear().type(note);
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();
        utils.assertViaVal(locationPage.notes(), note);
    })
    it('3. actions button > mark as valid', () => {
        locationPage.fillAddLocationPopUp(address);
        locationPage.interceptGetLocations();
        basePage.popUpAddButton().click();
        cy.wait('@getLocations');
        basePage.householdButton().click();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        locationPage.markAsValid().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('4. Error messages in add location modal', () => {
        locationPage.address().click();
        locationPage.addLocationBackdrop();
        locationPage.addressErrorMessage().should('be.visible');
        locationPage.city().click();
        locationPage.addLocationBackdrop();
        locationPage.cityErrorMessage().should('be.visible');
        locationPage.state().click();
        basePage.backDrop();
        locationPage.stateErrorMessage().should('be.visible');
        locationPage.country().clear();
        locationPage.addLocationBackdrop();
        locationPage.countryErrorMessage().should('be.visible');
        locationPage.zip().click();
        locationPage.addLocationBackdrop();
        locationPage.zipErrorMessage().should('be.visible');
        locationPage.locationType().click();
        basePage.backDrop();
        locationPage.typeErrorMessage().should('be.visible');
        locationPage.label().click();
        basePage.backDrop();
        locationPage.labelErrorMessage().should('be.visible');
        basePage.popUpAddButton().should('not.be.enabled');
    })
    it('5. Location override', () => {
        locationPage.fillInvalidLocation(address);
        basePage.popUpAddButton().click();
        basePage.confirmButton().click();
        basePage.header().should('include.text', 'Address not valid').and('be.visible');
    })
})
