import { wrenchUser, properties, lmUser } from "../../../../../configuration/properties";
import { ContactCenter } from "../../../../../page-objects/admin/contact-center-page";
import { EstimatePage } from "../../../../../page-objects/admin/estimate-page";
import {getRandomNumber, isLubeMobile} from "../../../../../support/utils";

const contactCenter = new ContactCenter();
const estimatePage = new EstimatePage();

let user = wrenchUser;
let zip = properties.validZip;
if (isLubeMobile()) {
    zip = properties.validPostal;
    user = lmUser;
}

describe("1.Create a new estimate and complete without Quote", () => {

    it("1. Create a new estimate", () => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        contactCenter.navigateToContactCenterPage();
        contactCenter.userId().type(getRandomNumber(9999).toString() + getRandomNumber(9999) + '{enter}');
        estimatePage.verifyEstimatePage();
        estimatePage.phoneField();
        estimatePage.nameField().type(user.firstName);
        estimatePage.lastNameField().type(user.lastName);
        estimatePage.postalCode().type(zip);
        estimatePage.validateZip().click();
        estimatePage.addVehicleNext().click();
        estimatePage.selectVehicleModal();
        estimatePage.verifyEstimatePage();
        estimatePage.addServices();
        estimatePage.completeWithoutQuoteButton().click();
        estimatePage.completeWithoutQuoteFinal();
    })
})


