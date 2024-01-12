import {BasePage} from "../../../../page-objects/webapp/base-page";
import {ManageTechPage} from "../../../../page-objects/manage-tech-page";
import {seaAddress, techData} from "../../../../configuration/properties";

const basePage = new BasePage();
const manageTechPage = new ManageTechPage();

let market = techData.market;
let tech = techData;
let address = seaAddress;

describe('Technician profile', () => {

    beforeEach(() => {
        cy.login();
        manageTechPage.navigateToManageTech();
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.statusDropdown().click();
        manageTechPage.thisOption('Disabled').click();
        basePage.backDrop();
        manageTechPage.searchButton().click();
        basePage.firstRow().click();
    })

    it('1. verify technician about', () => {
        manageTechPage.firstName().clear().type(tech.firstName);
        manageTechPage.updateButton().first().click();
        basePage.successToast();
        manageTechPage.lastName().clear().type(tech.lastName);
        manageTechPage.updateButton().first().click();
        basePage.successToast();
        manageTechPage.email().clear().type(tech.email);
        manageTechPage.updateButton().first().click();
        basePage.successToast();
        manageTechPage.profileUrl().clear().type('/' + tech.profileUrl);
        manageTechPage.updateButton().first().click();
        basePage.successToast();
    })

    it('2. verify technician contact details', () => {
        manageTechPage.techAddress().clear().type(address.address);
        manageTechPage.techPhone().clear().type(tech.phone);
        manageTechPage.techCity().clear().type(address.city);
        manageTechPage.techStateDropdown().click();
        manageTechPage.thisOption(address.state).click();
        manageTechPage.techZipCode().clear().type(address.zip);
        manageTechPage.updateButton().eq(1).click();
        basePage.successToast();
    })
})