import { wrenchUser, properties, lmUser, vehicle } from "../../../../../configuration/properties";
import { BasePage } from "../../../../../page-objects/admin/base-page";
import { ContactCenter } from "../../../../../page-objects/admin/contact-center-page";
import { EstimatePage } from "../../../../../page-objects/admin/estimate-page";
import { QuotesPage } from "../../../../../page-objects/admin/quotes-page";
import { isLubeMobile } from "../../../../../support/utils";

const contactCenter = new ContactCenter();
const quotesPage = new QuotesPage();
const estimatePage = new EstimatePage();
const basePage = new BasePage();

let user = wrenchUser;
let zip = properties.validZip;
if (isLubeMobile()) {
    user = lmUser;
    zip = properties.validPostal;
}

describe("Create an estimate for new user and complete with quote", () => {
    beforeEach(() => {
        cy.login();
        contactCenter.navigateToContactCenterPage();
        contactCenter.registrationNumber().type(vehicle.lmLicensePlate + 1);
        contactCenter.searchButton().click({ force: true });
        contactCenter.verifyEstimatePage();
        estimatePage.phoneField();
        estimatePage.nameField().type(user.firstName);
        estimatePage.lastNameField().type(user.lastName);
        estimatePage.postalCode().type(zip);
        estimatePage.validateZip().click();
        estimatePage.addVehicleNext().click();
        estimatePage.selectVehicleModal();
        estimatePage.verifyEstimatePage();
        estimatePage.addServices();
    })

    it('1. Verify if the user is able to Create estimate and convert it to quote for new user', () => {
        basePage.waitForPageToLoad();
        estimatePage.completeWithQuote();
        estimatePage.cancelQuoteButton().click();
        basePage.firstRadioButton().click();
        basePage.confirmButton().click();
        cy.avgWait();
        quotesPage.errorMessage().then($el => {
            if ($el.is(':visible')) {
                estimatePage.cancelQuoteButton().click();
                basePage.firstRadioButton().click();
                basePage.confirmButton().click();
            }
        })
        quotesPage.verifyFindQuotesPage();
    })
    
    it('2. Add location, Edit time and location details in quote screen', () => {
        estimatePage.completeWithQuote();
        estimatePage.addNewLocation();
        quotesPage.changeJobLocation(1);
        quotesPage.datePicker().click();
        quotesPage.scheduleForTomorrow();
        quotesPage.saveJobLocation();
        estimatePage.cancelQuoteButton().click();
        basePage.firstRadioButton().click();
        basePage.confirmButton().click();
        cy.avgWait();
        quotesPage.errorMessage().then($el => {
            if ($el.is(':visible')) {
                estimatePage.cancelQuoteButton().click();
                basePage.firstRadioButton().click();
                basePage.confirmButton().click();
            }
        })
        quotesPage.verifyFindQuotesPage();
    })
})


