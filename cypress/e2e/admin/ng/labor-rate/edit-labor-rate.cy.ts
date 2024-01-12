import {LaborRatePage} from '../../../../page-objects/admin/labor-rate-page';
import {BasePage} from "../../../../page-objects/admin/base-page";
import {properties} from "../../../../configuration/properties";

const laborRatePage = new LaborRatePage();
const basePage = new BasePage();
const laborRate = properties.laborRate;
const negativeRate = properties.negativeLaborRate;

describe('/labor-rate/edit-labor-rate.cy.ts', () => {
    beforeEach(() => {
        cy.login();
        laborRatePage.navigateToLaborRate();
    })
    it('update labor rate', () => {
        basePage.firstRow().click();
        laborRatePage.laborRateTab().clear().type(laborRate);
        laborRatePage.addLaborRate();
        laborRatePage.firstRowLaborRateCell().invoke('text').then(text => {
            expect(text).to.eq('$'+laborRate+'.00');
        })
    })
    it('delete labor rate', () => {
        basePage.firstRow().click();
        basePage.header().should('include.text', 'Edit Labor Rate');
        laborRatePage.deleteLaborRateButton().click();
        basePage.successToast().should('include.text', 'Labor rate was removed');
    })
    it('verify x button', () => {
        basePage.firstRow().click();
        basePage.xButton();
        basePage.header().should('have.text', 'Labor Rates');
    })
    it('edit labor rate modal error message', () => {
        laborRatePage.addLaborRateButton().click();
        laborRatePage.laborRateTab().clear();
        laborRatePage.userIdTab().click();
        laborRatePage.laborRateError();
    })
    it('negative rate protection', () => {
        basePage.firstRow().click();
        laborRatePage.laborRateTab().clear().type(negativeRate);
        laborRatePage.addButton().should('not.be.enabled');
    })
})