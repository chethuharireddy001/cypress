import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {PaymentPage} from "../../../../../page-objects/admin/manage-account/payment-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {lmUser, wrenchUser} from "../../../../../configuration/properties";
import {isLubeMobile} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const paymentPage = new PaymentPage();
const basePage = new BasePage();

let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe('/manage-account/user/verify-payment.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        paymentPage.paymentsPage().click();
    })
    // @ts-ignore
    it('1. adding and removing payment', {tags: '@smoke'}, () => {
        paymentPage.addPaymentButton().click();
        paymentPage.addPaymentFlow();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        paymentPage.removePaymentButton().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
    it('2. actions button > set as default', () => {
        paymentPage.addPaymentButton().click();
        paymentPage.addPaymentFlow();
        paymentPage.addPaymentPopUp().click();
        paymentPage.interceptPaymentMethods();
        basePage.firstRow().click();
        basePage.kebabButton().click();
        paymentPage.setDefault().click();
        basePage.confirmButton().click();
        basePage.successToast();
        paymentPage.checkMark1();
        basePage.orgButton().click();
        paymentPage.checkMark2();
    })
    it('3. add cash', () => {
        paymentPage.addPaymentButton().click();
        paymentPage.paymentTypesTab().click();
        basePage.thisOption('Cash').click();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
    })
    it.skip('4. add wrench', () => { //billing details are required error?
        paymentPage.addPaymentButton().click();
        paymentPage.paymentTypesTab().click();
        basePage.thisOption('Wrench').click();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
    })
})