import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { ApiUtils } from "../../../../page-objects/api-utils";
import { properties } from "../../../../configuration/properties";
import { isLubeMobile } from "../../../../support/utils";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();

let discountCode = properties.promoCode;
if (isLubeMobile()) discountCode = properties.lmPromoCode;

describe('Discounts', () => {

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
    })

    it('1. adding a discount', () => {
        jobsPage.addDiscountButton().click();
        basePage.h3().should('include.text', 'Discount');
        jobsPage.discountTab().clear().type(discountCode);
        jobsPage.saveDiscount().click();
        jobsPage.successToast();
        basePage.td().should('include.text', discountCode);
    })

    it('2. cancelling on a discount', () => {
        jobsPage.addDiscountButton().click();
        basePage.cancelButton().click();
    })

    it('3. removing discount', () => {
        jobsPage.addDiscountButton().click();
        jobsPage.discountTab().clear().type(discountCode);
        jobsPage.saveDiscount().click();
        cy.avgWait();
        jobsPage.removeDiscountBtn().click();
        jobsPage.successToast();
    })
})