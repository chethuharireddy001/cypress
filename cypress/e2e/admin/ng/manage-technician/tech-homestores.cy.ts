import {BasePage} from "../../../../page-objects/admin/base-page";
import {ManageTechPage} from "../../../../page-objects/manage-tech-page";
import {properties} from "../../../../configuration/properties";
import {ApiUtils} from "../../../../page-objects/api-utils";
import {DbUtils} from "../../../../page-objects/db-utils";

const basePage = new BasePage();
const manageTechPage = new ManageTechPage();
const dbUtils = new DbUtils();
const apiUtils = new ApiUtils();

let vendorName = properties.partVendor;

describe('Technician homestores', () => {
    //TODO: add new tech every time

    beforeEach(() => {
        cy.login();
        manageTechPage.navigateToManageTech();
        cy.intercept('/admin/findproviders').as('findProviders');
        dbUtils.deleteTech();
        manageTechPage.searchButton().click();
        apiUtils.createAndGoToTech();
        manageTechPage.partsTab().click();
    })

    it('1. verify adding home store as first preference', () => {
        manageTechPage.addButton().click();
        manageTechPage.preference().type('1');
        cy.minWait();
        manageTechPage.vendor().type(vendorName.substring(0,1));
        basePage.firstOption().click();
        cy.minWait();
        manageTechPage.vendorLocation().click();
        basePage.firstOption().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
    })

    it('2. verify editing home store as second preference', () => {
        manageTechPage.addButton().click();
        manageTechPage.preference().type('1');
        cy.minWait();
        manageTechPage.vendor().type(vendorName.substring(0,1));
        basePage.firstOption().click();
        cy.minWait();
        manageTechPage.vendorLocation().click();
        basePage.firstOption().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();

        manageTechPage.addButton().click();
        manageTechPage.preference().type('1');
        cy.minWait();
        manageTechPage.vendor().type(vendorName.substring(0,1));
        basePage.firstOption().click();
        cy.minWait();
        manageTechPage.vendorLocation().click();
        basePage.secondOption().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();

        manageTechPage.editHomeStoreButton().first().click();
        cy.avgWait();
        manageTechPage.preference().clear().type('2');
        cy.minWait();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
    })

    it('3. verify editing vendor', () => {
        manageTechPage.addButton().click();
        manageTechPage.preference().type('1');
        cy.minWait();
        manageTechPage.vendor().type(vendorName.substring(0,1));
        basePage.firstOption().click();
        cy.minWait();
        manageTechPage.vendorLocation().click();
        basePage.firstOption().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();

        manageTechPage.editHomeStoreButton().first().click();
        manageTechPage.vendor().click();
        basePage.firstOption().click();
        manageTechPage.vendorLocation().click();
        basePage.firstOption().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
    })

    it('4. verify editing vendor address', () => {
        manageTechPage.addButton().click();
        manageTechPage.preference().type('1');
        cy.minWait();
        manageTechPage.vendor().type(vendorName.substring(0,1));
        basePage.firstOption().click();
        cy.minWait();
        manageTechPage.vendorLocation().click();
        basePage.firstOption().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();

        manageTechPage.editHomeStoreButton().first().click();
        manageTechPage.vendorLocation().click();
        basePage.secondOption().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
    })
})