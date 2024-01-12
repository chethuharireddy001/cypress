import { properties } from "../../../../configuration/properties";
import { BasePage } from "../../../../page-objects/admin/base-page";
import { JobsPage } from "../../../../page-objects/admin/jobs-page";
import { ApiUtils } from "../../../../page-objects/api-utils";


const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();

let partNumber = properties.partNumber;
let partVendor = properties.partVendor;
let onlinePartVendor = properties.onlinePartVendor;
let partQuality = properties.partQuality;


describe('Parts', () => {
    //TODO: (@Kadir) make parts and vendors configurable for lubemobile (waiting on an update for this)

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
    })

    it('1. add parts', () => {
        jobsPage.addPartBtn().first().click();
        jobsPage.addPartModalHeader().should('have.text', 'Add New Part');
        jobsPage.partNameTab().click();
        jobsPage.partOption().click();
        jobsPage.partNumber().type(partNumber);
        jobsPage.vendorQuoted().click();
        jobsPage.vendorOption().contains(partVendor).click();
        jobsPage.itemType().select('New');
        jobsPage.itemQuality().select(partQuality);
        jobsPage.partCost().type('5');
        jobsPage.partTotal().type('10');
        jobsPage.partQuantity().clear().type('5');
        jobsPage.partNotes().type('Parts Notes');
        jobsPage.saveParts().click();
        jobsPage.successToast();
        basePage.td().contains(partVendor).should('be.visible');
    })

    it('2. edit parts', () => {
        jobsPage.editPartBtn().click();
        jobsPage.editPartModalHeader().should('have.text', 'Edit Part');
        jobsPage.partNumber().type(partNumber);
        jobsPage.partTotal().clear().type('20');
        jobsPage.partQuantity().clear().type('2');
        jobsPage.saveParts().click();
        jobsPage.thisFieldRequired().should('be.visible');
        jobsPage.vendorQuoted().click();
        jobsPage.vendorOption().contains(onlinePartVendor).click();
        jobsPage.saveParts().click();
        jobsPage.successToast();
        jobsPage.vendorTextEdit().should('include.text', onlinePartVendor);
    })

    it('3. delete parts', () => {
        jobsPage.deletePartBtn().click();
        jobsPage.deletePartPopUpHeader().should('have.text', 'Delete Part');
        basePage.popUpYesButton().click();
    })
})