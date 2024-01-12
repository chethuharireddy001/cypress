import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {OrgLocationPage} from "../../../../../page-objects/admin/manage-account/org-location-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {auAddress, properties, usAddress, usFullAddress} from "../../../../../configuration/properties";
import {LocationPage} from "../../../../../page-objects/admin/manage-account/location-page";
import {isLubeMobile, Utils} from "../../../../../support/utils";
import {HubPage} from "../../../../../page-objects/admin/manage-account/hub-page";

const manageAccountPage = new ManageAccountPage();
const orgLocationPage = new OrgLocationPage();
const basePage = new BasePage();
const locationPage = new LocationPage();
const hubPage = new HubPage();
const utils = new Utils();
const note = properties.testNote;

let location = usAddress;
let secondLocation = usFullAddress;
let hubName = properties.hubName;
if (isLubeMobile()) location = auAddress;

describe('/manage-account/organization/verify-location.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.deleteOrgViaSQL();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createOrgViaApi();
        manageAccountPage.findOrg();
        orgLocationPage.orgLocationTab().click();
        basePage.addButton().click();
    })
    // @ts-ignore
    it('1. verify adding and removing location', {tags: '@smoke'}, () => {
        orgLocationPage.fillAddLocation(location);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.backToListButton().click();
        orgLocationPage.findLocation(location.streetAddress);
        basePage.firstRow().click();
        basePage.kebabButton().click();
        orgLocationPage.removeLocation().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('2. verify error messages in add location modal', () => {
        orgLocationPage.hubDropdown().click();
        basePage.backDrop();
        orgLocationPage.hubErrorMessage().should('be.visible');
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
        basePage.popUpAddButton().should('be.disabled');
        basePage.xButton();
        manageAccountPage.header().should('not.include.text', 'Add Location');
    })
    it('3. verify actions button > remove location', () => {
        orgLocationPage.fillAddLocation(location);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.backToListButton().click();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        orgLocationPage.removeLocation().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('4. verify actions button > mark as valid', () => {
        orgLocationPage.fillAddLocation(location);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.backToListButton().click();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        orgLocationPage.markAsValid().click();
        basePage.confirmButton().click();
        basePage.successToast();
        basePage.kebabButton().click();
        orgLocationPage.removeLocation().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('5. verify location override', () => {
        orgLocationPage.hubDropdown().click();
        basePage.firstOption().click();
        locationPage.fillInvalidLocation(location);
        basePage.popUpAddButton().click();
        basePage.confirmButton().click();
        basePage.header().should('include.text', 'Address not valid').and('be.visible');
    })
    it('6. verify editing location details', () => {
        orgLocationPage.hubDropdown().click();
        basePage.firstOption().click();
        locationPage.fillAddLocationPopUp(location);
        cy.intercept('user/updatelocation').as('updateLocation');
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        locationPage.address().clear().type(secondLocation.address);
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();
        utils.assertViaVal(locationPage.address(), secondLocation.address);

        locationPage.city().clear().type(secondLocation.city);
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();
        utils.assertViaVal(locationPage.city(), secondLocation.city);

        locationPage.zip().clear().type(secondLocation.zip);
        basePage.popUpAddButton().click();
        cy.wait('@updateLocation');
        basePage.successToast();
        basePage.successToastDismiss();
        utils.assertViaVal(locationPage.zip(), secondLocation.zip);

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
    it('7. assign location to a different hub', () => {
        orgLocationPage.fillAddLocation(location);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.backToListButton().click();

        hubPage.hubsTab().click();
        basePage.addButton().click();
        hubPage.selectRegion().click();
        basePage.firstOption().click();
        hubPage.addHubName().type(hubName);
        hubPage.addHubNotes().type('Test hub');
        basePage.popUpAddButton().click();
        basePage.successToast();

        basePage.backToListButton().click();
        orgLocationPage.orgLocationTab().click();
        basePage.firstRow().click();
        orgLocationPage.hubDropdown().click();
        basePage.theOtherDropdownOption().click();
        basePage.successToastDismiss();
        basePage.popUpAddButton().click();
        basePage.ngWaitForPageToLoad();
        basePage.successToast();
        utils.assertViaText(orgLocationPage.hubDropdown(), hubName);
    })
})