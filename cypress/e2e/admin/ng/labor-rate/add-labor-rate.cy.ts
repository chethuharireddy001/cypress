import {LaborRatePage} from '../../../../page-objects/admin/labor-rate-page';
import {BasePage} from "../../../../page-objects/admin/base-page";
import {lmUser, properties, wrenchUser} from "../../../../configuration/properties";
import {ManageAccountPage} from "../../../../page-objects/admin/manage-account/manage-account-page";
import {isLubeMobile} from "../../../../support/utils";

const laborRatePage = new LaborRatePage();
const basePage = new BasePage();
const manageAccountPage = new ManageAccountPage();
const laborRate = properties.laborRate;
const negativeRate = properties.negativeLaborRate;

let market = properties.laborMarket;
let marketListName = properties.laborMarketListName;
let user = wrenchUser;
if (isLubeMobile()) {
    user = lmUser;
    market = properties.lmLaborMarket;
}
//TODO: Rewrite some of these scripts and add new ones

describe('/labor-rate/add-labor-rate.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        laborRatePage.navigateToLaborRate();
    })
    // @ts-ignore
    it('add labor rate (only required fields)', {tags: '@smoke'}, () => {
        laborRatePage.addLaborRateButton().click();
        basePage.header().should('include.text', 'Add Labor Rate');
        laborRatePage.laborRateTab().type(laborRate);
        laborRatePage.addLaborRate();
        basePage.successToast();
    })
    it('add labor rate modal error message', () => {
        laborRatePage.addLaborRateButton().click();
        laborRatePage.laborRateTab().click();
        laborRatePage.userIdTab().click();
        laborRatePage.laborRateError();
    })
    it('verify x button', () => {
        laborRatePage.addLaborRateButton().click();
        basePage.xButton();
        basePage.header().should('have.text', 'Labor Rates');
    })
    it.skip('add labor rate with userId', () => { // GEN-10428
        manageAccountPage.navigateToManageAccount();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.findUser();
        manageAccountPage.userIdChip().then(chip => {
            const userId = chip.text().split(" ")[1];
            laborRatePage.navigateToLaborRate();
            laborRatePage.addLaborRateButton().click();
            laborRatePage.laborRateTab().type(laborRate);
            laborRatePage.userIdTab().type(userId);
            laborRatePage.addLaborRate();
            basePage.successToast();
            laborRatePage.userIdCell().should('include.text', userId);
        })
    })
    it('negative rate protection', () => {
        laborRatePage.addLaborRateButton().click();
        laborRatePage.laborRateTab().type(negativeRate);
        laborRatePage.addButton().should('not.be.enabled');
    })
    it('add labor rate with market and vehicle fields', () => {
        laborRatePage.interceptFindLaborRates();
        laborRatePage.addLaborRateButton().click();
        laborRatePage.laborRateTab().type(laborRate);
        cy.wait('@findLaborRates');
        laborRatePage.commonLaborRateFlow();
        laborRatePage.addLaborRate();
        basePage.successToast().should('include.text', 'Labor rate was added');
    })
    it('verify filter tab', () => {
        laborRatePage.interceptFindLaborRates();
        laborRatePage.addLaborRateButton().click();
        laborRatePage.laborRateTab().type(laborRate);
        cy.wait('@findLaborRates');
        laborRatePage.commonLaborRateFlow();
        laborRatePage.addLaborRate();
        laborRatePage.filterTab().type(marketListName);
        laborRatePage.marketCell().should('include.text', marketListName);
    })
})