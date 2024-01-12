import {BasePage} from "../../../../page-objects/admin/base-page";
import {ManageTechPage} from "../../../../page-objects/manage-tech-page";
import {techData} from "../../../../configuration/properties";

const basePage = new BasePage();
const manageTechPage = new ManageTechPage();

let market = techData.market;

describe('Technician search', () => {

    beforeEach(() => {
        cy.login();
        manageTechPage.navigateToManageTech();
    })

    it('1. verify active techs', () => {
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.statusDropdown().click();
        manageTechPage.thisOption('Active').click();
        basePage.backDrop();
        manageTechPage.searchButton().click();
        basePage.firstRow().click();
        manageTechPage.employmentStatus().scrollIntoView().click();
        basePage.firstOption().should('have.attr', 'aria-selected').and('eq', 'true');
    })

    it('2. verify suspended techs', () => {
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.statusDropdown().click();
        manageTechPage.thisOption('Suspended').click();
        basePage.backDrop();
        manageTechPage.searchButton().click();
        basePage.firstRow().click();
        manageTechPage.employmentStatus().scrollIntoView().click();
        basePage.secondOption().should('have.attr', 'aria-selected').and('eq', 'true');
    })

    it('3. verify disabled techs', () => {
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.statusDropdown().click();
        manageTechPage.thisOption('Disabled').click();
        basePage.backDrop();
        manageTechPage.searchButton().click();
        basePage.firstRow().click();
        manageTechPage.employmentStatus().scrollIntoView().click();
        basePage.lastOption().should('have.attr', 'aria-selected').and('eq', 'true');
    })

    it('4. verify reset button', () => {
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.statusDropdown().click();
        manageTechPage.thisOption('Active').click();
        basePage.backDrop();
        manageTechPage.resetButton().click();
        manageTechPage.marketDropdown().click();
        manageTechPage.selectedMarket().scrollIntoView().should('not.have.attr', 'aria-selected');
        basePage.backDrop();
        manageTechPage.statusDropdown().click();
        basePage.firstOption().should('have.attr', 'aria-selected').and('eq', 'false');
    })
})