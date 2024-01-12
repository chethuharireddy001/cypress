import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {properties} from "../../../../../configuration/properties";
import {InfoPage} from "../../../../../page-objects/admin/manage-account/info-page";
import {isLubeMobile, getRandomNumber, Utils} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const basePage = new BasePage();
const infoPage = new InfoPage();
const utils = new Utils();

const faker = require("faker");
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = 'kjankurt+'+firstName+getRandomNumber(9999)+'@wrench.com';

function removeUser() {
    basePage.userActionsButton().click();
    infoPage.disableUser().click();
    infoPage.confirmButton().click();
    basePage.successToast();
}
let phone = properties.wrenchPhoneNumber;
if (isLubeMobile()) phone = properties.lmPhoneNumber;

describe('/manage-account/user/add-new-user.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.createNewAccount();
        manageAccountPage.addUser();
    })
    // @ts-ignore
    it('1. add new user with just the required fields', {tags: '@smoke'}, () => {
        manageAccountPage.firstNameTab().last().type(firstName);
        manageAccountPage.lastNameTab().last().type(lastName);
        manageAccountPage.emailTab().last().type(email);
        manageAccountPage.phoneTab().type(phone);
        basePage.popUpAddButton().click();
        basePage.header().should('include.text', 'Edit Person');
        utils.assertViaVal(manageAccountPage.firstNameTab().last(), firstName);
        removeUser();
    })
    it('2. add new user with all fields', () => {
        manageAccountPage.firstNameTab().last().type(firstName);
        manageAccountPage.lastNameTab().last().type(lastName);
        manageAccountPage.nickNameTab().last().type(lastName+firstName);
        manageAccountPage.emailTab().last().type(email);
        manageAccountPage.phoneTab().type(phone);
        manageAccountPage.altPhoneTab().last().type(phone);
        manageAccountPage.howTheCustomerHeard();
        manageAccountPage.vipCheckBox().click();
        basePage.popUpAddButton().click();
        basePage.successToast();
        removeUser();
    })
    it('3. verify the error messages in required fields', () => {
        manageAccountPage.firstNameTab().last().click();
        manageAccountPage.lastNameTab().last().click();
        manageAccountPage.emailTab().last().click();
        manageAccountPage.phoneTab().last().click();
        manageAccountPage.altPhoneTab().last().click();
        manageAccountPage.requiredFieldsErrorMessages();
    })
    it('4. verify x button', () => {
        basePage.header().should('include.text', 'Add User');
        basePage.xButton();
        basePage.header().should('not.include.text', 'Add User');
    })
})

