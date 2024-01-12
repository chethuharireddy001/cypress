import {DiscountsPage} from "../../../../page-objects/admin/discounts-page";
import {discountData, properties, wrenchUser} from "../../../../configuration/properties";
import {BasePage} from "../../../../page-objects/admin/base-page";
import {CreateJobPage} from "../../../../page-objects/admin/job-test-pages/create-job-page";
import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {ManageAccountPage} from "../../../../page-objects/admin/manage-account/manage-account-page";
import {InfoPage} from "../../../../page-objects/admin/manage-account/info-page";
import {DbUtils} from "../../../../page-objects/db-utils";

const discountsPage = new DiscountsPage();
const basePage = new BasePage();
const createJobPage = new CreateJobPage();
const jobsPage = new JobsPage();
const manageAccountPage = new ManageAccountPage();
const infoPage = new InfoPage();
const dbUtils = new DbUtils();

let user = wrenchUser;
let discount = discountData;

//TODO: Add more scripts
describe("Verify discount scenarios", () => {

    beforeEach(() => {
        cy.login();
        dbUtils.deleteDiscount();
        discountsPage.navigateToDiscountsPage();
        discountsPage.addDiscountButton().click();
    })

    it("1. Verify adding, searching, deleting discount (promo type)", () => {
        discountsPage.codeField().type(discount.code);
        discountsPage.amountField().type(discount.amount);
        discountsPage.statusDropdown().click();
        basePage.firstOption().click();
        discountsPage.consumeByDate().type(discount.consumeByDate);
        discountsPage.combinableDropdown().click();
        basePage.secondOption().click();
        discountsPage.descriptionField().type(discount.description);
        discountsPage.explanationField().type(discount.explanation);
        discountsPage.addButton().click();
        basePage.successToast();
        discountsPage.searchFilter().type(discount.code);
        cy.minWait();
        basePage.firstRow().click();
        discountsPage.statusDropdown().click();
        basePage.theOtherDropdownOption().click();
        discountsPage.addButton().click();
        basePage.successToast();
        discountsPage.foundDiscount().should('not.exist');
    })

    it("2. Verify adding, searching, deleting discount (sale type)", () => {
        discountsPage.codeField().type(discount.code);
        discountsPage.amountField().type(discount.amount);
        discountsPage.typeDropdown().click();
        basePage.theOtherDropdownOption().click();
        discountsPage.statusDropdown().click();
        basePage.firstOption().click();
        discountsPage.consumeByDate().type(discount.consumeByDate);
        discountsPage.combinableDropdown().click();
        basePage.secondOption().click();
        discountsPage.descriptionField().type(discount.description);
        discountsPage.explanationField().type(discount.explanation);
        discountsPage.addButton().click();
        basePage.successToast();
        discountsPage.searchFilter().type(discount.code);
        cy.minWait();
        basePage.firstRow().click();
        discountsPage.statusDropdown().click();
        basePage.theOtherDropdownOption().click();
        discountsPage.addButton().click();
        basePage.successToast();
        discountsPage.foundDiscount().should('not.exist');
    })

    it("3. Apply created promo type discount in the quote", () => {
        const discountCode = discount.code;
        discountsPage.codeField().type(discountCode);
        discountsPage.amountField().type(discount.amount);
        discountsPage.statusDropdown().click();
        basePage.firstOption().click();
        discountsPage.consumeByDate().type(discount.consumeByDate);
        discountsPage.combinableDropdown().click();
        basePage.secondOption().click();
        discountsPage.descriptionField().type(discount.description);
        discountsPage.explanationField().type(discount.explanation);
        discountsPage.addButton().click();

        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        manageAccountPage.getUserReady();
        manageAccountPage.peopleTab().click();
        basePage.firstRow().click();
        basePage.userActionsButton().click();
        cy.windowHandle(infoPage.addJob());

        createJobPage.addService().click();
        cy.minWait();
        createJobPage.serviceInput().type(properties.service);
        cy.minWait();
        basePage.firstOption().click();
        createJobPage.addServicesButton().click();
        basePage.header().should('contain.text', 'Quote');

        basePage.waitForPageToLoad();
        jobsPage.addDiscountButton().click();
        basePage.h3().should('include.text', 'Discount');
        basePage.waitForPageToLoad();
        jobsPage.discountTab().type(discountCode);
        jobsPage.saveDiscount().click();
        jobsPage.successToast();
        basePage.td().should('include.text', discountCode);
    })
})