import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {lmUser, properties, secondLmUser, secondWrenchUser, wrenchUser} from "../../../../../configuration/properties";
import {getRandomNumber, isLubeMobile, Utils} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const infoPage = new InfoPage();
const basePage = new BasePage();
const utils = new Utils();

const faker = require("faker");
const sentence = faker.lorem.sentence(5);
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = 'kjankurt+'+firstName+getRandomNumber(9999)+'@wrench.com';
const emailForSearch = properties.genericUserEmail;

let user = wrenchUser;
let phone = wrenchUser.phone;
if (isLubeMobile()) {
    user = lmUser;
    phone = lmUser.phone;
}
const fakerUser = {
    firstName: firstName,
    lastName: lastName,
    email: 'kjankurt+'+firstName+getRandomNumber(9999)+'@wrench.com',
    phone: phone
}

function addUser(user) {
    manageAccountPage.firstNameTab().last().type(user.firstName);
    manageAccountPage.lastNameTab().last().type(user.lastName);
    manageAccountPage.emailTab().last().type(user.email);
    manageAccountPage.phoneTab().first().type(user.phone);
    basePage.popUpAddButton().click();
}
//TODO: Decide which objects should stay in info page which should go to a new page

describe('/manage-account/user/edit-user.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
    })
    it('1. verify user chips', () => { //may not be necessary
        infoPage.verifyEmailChip();
        if (!isLubeMobile()) infoPage.verifyPhoneChip();
        infoPage.verifyIdChip();
    })
    it('2. editing user credentials from edit tab', () => {
        infoPage.firstName().clear().type(fakerUser.firstName);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        basePage.ngWaitForPageToLoad();
        utils.assertViaVal(infoPage.firstName(), fakerUser.firstName);

        infoPage.lastName().clear().type(fakerUser.lastName);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        basePage.ngWaitForPageToLoad();
        utils.assertViaVal(infoPage.lastName(), fakerUser.lastName);

        infoPage.nickName().clear().type(fakerUser.firstName+fakerUser.lastName);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        basePage.ngWaitForPageToLoad();
        utils.assertViaVal(infoPage.nickName(), fakerUser.firstName+fakerUser.lastName);

        infoPage.email().clear().type(email);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        basePage.ngWaitForPageToLoad();
        utils.assertViaVal(infoPage.email(), email);

        infoPage.editPersonPhoneNumber().clear().type(phone);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        basePage.ngWaitForPageToLoad();
        utils.assertViaVal(infoPage.editPersonPhoneNumber(), phone);

        infoPage.editPersonAltPhoneNumber().clear().type(phone);
        basePage.popUpAddButton().click();
        basePage.successToast();
        basePage.successToastDismiss();
        basePage.ngWaitForPageToLoad();
        utils.assertViaVal(infoPage.editPersonAltPhoneNumber(), phone);

        infoPage.howCustomerHeard().should('not.be.enabled');

        infoPage.editStatus();
        basePage.successToast();
        utils.assertViaText(infoPage.blockedStatusDropdown(), 'Whitelist');
    })
    it('3. editing user notes from notes tab', () => {
        infoPage.notesSection();
        infoPage.addNotesField().type(sentence);
        basePage.updateButton().click();
        basePage.successToast();
        basePage.ngWaitForPageToLoad();
        utils.assertViaVal(infoPage.notesField(), sentence);
    })
    it('4. editing password from password tab (positive) and activate user', () => {
        infoPage.passwordSection();
        infoPage.passwordChange().type(properties.password);
        infoPage.passwordConfirm().type(properties.password);
        basePage.updateButton().click();
        basePage.successToast();
        basePage.householdButton().click();
        utils.assertViaText(infoPage.activityStatusCell(), 'Active');
    })
    it('5. editing password from password tab (negative)', () => {
        infoPage.passwordSection();
        infoPage.passwordChange().type(properties.password);
        infoPage.passwordConfirm().type(properties.password + 'a');
        infoPage.passwordChange().click();
        infoPage.passwordNotMatch();
    })
    it('6. editing communication preferences', () => {
        infoPage.communicationSection();
        basePage.lastCheckBox().click();
        basePage.updateButton().click();
        basePage.successToast();
    })
    it('7. add new person to household', () => {
        basePage.householdButton().click();
        basePage.addButton().click();
        manageAccountPage.firstNameTab().last().type(user.firstName);
        manageAccountPage.lastNameTab().last().type(user.lastName);
        manageAccountPage.emailTab().last().type(user.email);
        manageAccountPage.newPersonPhone().type(user.phone);
        basePage.popUpAddButton().click();
    })
})
describe('/manage-account/user/edit-user.cy.ts', () => {
    it('8. combining accounts (positive)', () => {
        cy.login();
        manageAccountPage.deleteSecondUser();
        if (isLubeMobile()) cy.createUserViaApi(secondLmUser);
        else cy.createUserViaApi(secondWrenchUser);
        manageAccountPage.navigateToManageAccount();
        basePage.accountManagementButton().click();
        manageAccountPage.createNewAccount();
        manageAccountPage.addUser();
        addUser(fakerUser);
        basePage.successToastDismiss();
        basePage.ngWaitForPageToLoad();
        infoPage.combineSection();
        if (isLubeMobile()) infoPage.combineEmailInput().type(emailForSearch);
        else infoPage.combineEmailInput().type(emailForSearch);
        infoPage.findUserForm().within(() => {
            basePage.searchNoDataCy().click();
        })
        infoPage.firstUserToCombine().click();
        cy.avgWait();
        infoPage.confirmButton().click();
        basePage.successToast();
    })
})