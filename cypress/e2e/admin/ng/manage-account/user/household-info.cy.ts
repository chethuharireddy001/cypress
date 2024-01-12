import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {wrenchUser} from "../../../../../configuration/properties";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {getRandomNumber, Utils} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const infoPage = new InfoPage();
const basePage = new BasePage();
const utils = new Utils();
const text = ' (Edited)';
const idNumber = getRandomNumber(9999);

let user = wrenchUser;

describe('Verify adding/editing household information', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        infoPage.infoTab().click();
    })

    it('1. Edit Household name', () => {
        infoPage.householdName().type(text);
        basePage.popUpAddButton().click();
        basePage.successToast();
    })

    it('2. Enter household notes and edit', () => {
        infoPage.houseHoldNotes().type(text);
        basePage.popUpAddButton().click();
        basePage.successToast();
        infoPage.houseHoldNotes().type(text);
        basePage.popUpAddButton().click();
        basePage.successToast();
    })

    it.skip('3. Clear household notes', () => { // wait until GEN-10340 gets resolved
        infoPage.houseHoldNotes().type(text);
        basePage.popUpAddButton().click();
        basePage.successToast();
        infoPage.houseHoldNotes().clear();
        cy.intercept('user/findorganizations').as('findOrg');
        basePage.popUpAddButton().click();
        cy.wait('@findOrg');
        infoPage.houseHoldNotes().invoke('val').then(notes => {
            expect(notes).to.be.empty;
        })
    })

    it('4. Initialize marketing status and edit', () => {
        infoPage.marketingStatus().click();
        basePage.firstOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        infoPage.marketingStatus().click();
        basePage.lastOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
    })

    it('5. Initialize external ID and edit', () => {
        infoPage.externalId().type(idNumber.toString());
        cy.intercept('user/findorganizations').as('findOrg');
        basePage.popUpAddButton().click();
        cy.wait('@findOrg');
        basePage.successToast();
        utils.assertViaVal(infoPage.externalId(), idNumber);
        infoPage.externalId().clear().type((idNumber + 1).toString());
        cy.intercept('user/findorganizations').as('findOrg');
        basePage.popUpAddButton().click();
        cy.wait('@findOrg');
        basePage.successToast();
        utils.assertViaVal(infoPage.externalId(), (idNumber + 1).toString());
    })

    it('6. Initialize partner and edit', () => {
        infoPage.partner().click();
        basePage.firstOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        infoPage.partner().click();
        basePage.secondOption().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
    })

    it('7. Check and uncheck VIP checkbox', () => {
        infoPage.editVipCheckBox();
        infoPage.editVipCheckBox();
    })
})