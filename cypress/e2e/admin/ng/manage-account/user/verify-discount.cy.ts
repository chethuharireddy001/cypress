import {ManageAccountPage} from "../../../../../page-objects/admin/manage-account/manage-account-page";
import {DiscountPage} from "../../../../../page-objects/admin/manage-account/discount-page";
import {BasePage} from "../../../../../page-objects/admin/base-page";
import {lmUser, properties, wrenchUser} from "../../../../../configuration/properties";
import {isLubeMobile} from "../../../../../support/utils";

const manageAccountPage = new ManageAccountPage();
const discountPage = new DiscountPage();
const basePage = new BasePage();

let user = wrenchUser;
let discount = properties.existingDiscount;
if (isLubeMobile()) user = lmUser;

describe('/manage-account/user/verify-discount.cy.ts', () => {

    it('verify adding and removing discount', () => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        discountPage.discountsTab().click();
        discountPage.addDiscount().click();
        discountPage.applyPromoCode().type(discount);
        discountPage.applyPromoCodeButton().click();
        basePage.successToast();
        discountPage.discountAdded(discount);
        discountPage.removeTopDiscount().click();
        discountPage.removeConfirm().click();
        basePage.successToast();
    })

})