import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {getRandomNumber} from "../../../../../support/utils";
import {properties} from "../../../../../configuration/properties";

const manageAccountPage = new ManageAccountPage();
const infoPage = new InfoPage();
const basePage = new BasePage();

const faker = require("faker");
const sentence = faker.lorem.sentence(2);
const number = faker.datatype.number({max:200});

describe('/manage-account/organization/verify-info.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.deleteOrgViaSQL();
        manageAccountPage.organizationTab().click();
        manageAccountPage.createOrgViaApi();
        manageAccountPage.findOrg();
    })
    it('verify editing organization', () => {
        infoPage.companyName().type('a');
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        infoPage.notes().clear().type(sentence);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        infoPage.fleetSize().click();
        basePage.theOtherDropdownOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        infoPage.marketingStatus().click();
        basePage.theOtherDropdownOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        infoPage.externalId().clear().type(getRandomNumber(9999).toString());
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        infoPage.salesRepresentative().click();
        basePage.theOtherDropdownOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        infoPage.fleetRep().click();
        basePage.theOtherDropdownOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        infoPage.fleetRepEmail().type(properties.fleetRepEmail);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();

        infoPage.status();

        infoPage.partner().click();
        basePage.theOtherDropdownOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
    })
    it('verify organization checkboxes', () => { //TODO: wait for GEN-10415 to resolve to automate the rest of the checkboxes
        infoPage.taxExemptCheckBox().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        infoPage.taxExemptInnerCheckBox().should('be.checked');

        infoPage.disableFollowupsCheckBox().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        infoPage.disableFollowUpsInnerCheckbox().should('be.checked');

        infoPage.testingPurposes().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        infoPage.testingPurposesInnerCheckbox().should('not.be.checked');

        infoPage.editVipCheckBox();
    })
    it('verify changing organization labor rate', () => {
        infoPage.orgLabor();
        infoPage.newLaborRate().type(number);
        infoPage.confirmButton().click();
        basePage.successToast();
    })
    it('verify account management button', () => {
        basePage.accountManagementButton().click();
        basePage.header().contains('Organizations');
    })
})