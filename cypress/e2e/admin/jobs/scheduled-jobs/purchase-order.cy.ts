import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { usAddress, properties } from "../../../../configuration/properties";
import { ApiUtils } from "../../../../page-objects/api-utils";

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();
let address = usAddress;
let phoneNumber = properties.wrenchPhoneNumber;

describe.skip('Purchase Order', () => {
    //TODO: (@Kadir) rewrite these scripts

    beforeEach(() => {
        cy.login();
        jobsPage.goToJobsScreen();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
    })

    it('1. order parts near current job', () => {
        jobsPage.addPurchaseOrder().click();
        jobsPage.orderPartsNearCurrJob();
    })

    it('2. order parts from Homestores', () => {
        jobsPage.addPurchaseOrder().click();
        jobsPage.orderPartsFromHomestores();
    })

    it('3. verify Homestore fillout', () => {
        jobsPage.addPurchaseOrder().click();
        jobsPage.vendorName().invoke('text').then(theText => {
            jobsPage.vendorNameToBeFilled().should('be.disabled');
            jobsPage.vendorFillOutBtn().click();
            jobsPage.vendorNameFilled().should('include.text', theText);
        })
    })

    it('4. selecting a vendor from the list', () => {
        jobsPage.addPurchaseOrder().click();
        jobsPage.selectVendorFromList();
        jobsPage.successToast();
    })

    it('5. cancel on purchase order', () => {
        jobsPage.addPurchaseOrder().click();
        basePage.cancelButton().should('be.visible').click();
    })

    it('6. add a new location with an address', () => {
        jobsPage.addPurchaseOrder().click();
        jobsPage.addNewLocationWithAddress(address, phoneNumber);
        jobsPage.successToast();
    })

    it('7. add a new location without an address', () => {
        jobsPage.addPurchaseOrder().click();
        jobsPage.addNewLocationWithoutAddress();
        jobsPage.successToast();
    })

    it('8. add a new vendor', () => {
        jobsPage.addPurchaseOrder().click();
        jobsPage.addNewVendor();
        basePage.saveButton().click();
        basePage.h3().should('include.text', 'New Inventory Location');
    })
})