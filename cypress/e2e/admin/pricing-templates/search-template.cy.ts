import { PricingTemplates } from "../../../page-objects/admin/pricing-templates-page";
import {vehicle} from "../../../configuration/properties";
import {Utils} from "../../../support/utils";
import { ContactCenter } from "../../../page-objects/admin/contact-center-page";

const contactCenter = new ContactCenter();
const utils = new Utils();
const pricingTemplatesPage = new PricingTemplates();

describe("Verify Pricing Templates", () => {

    it("Search template with start year, end year, make and model", () => {
        cy.login();
        contactCenter.navigateToContactCenterPage();
        pricingTemplatesPage.menuButton().click();
        pricingTemplatesPage.pricingTemplatesBtn().click();
        pricingTemplatesPage.selectStartYearFromDropdown(parseInt(vehicle.vehicleYear) - 2);
        pricingTemplatesPage.selectEndYearFromDropdown(parseInt(vehicle.vehicleYear) + 2);
        pricingTemplatesPage.vehicleMakeDropdownBtn().click();
        pricingTemplatesPage.vehicleMakeOption(vehicle.vehicleMake).click();
        pricingTemplatesPage.vehicleModelDropdown().click();
        pricingTemplatesPage.vehicleModelOption(vehicle.vehicleModel).click();
        pricingTemplatesPage.pricingTemplatesSearchBtn().click();
        utils.assertViaText(pricingTemplatesPage.vehicleMakeInList(), vehicle.vehicleMake);
        utils.assertViaText(pricingTemplatesPage.vehicleMakeInList(), vehicle.vehicleModel);
        pricingTemplatesPage.vehicleMakeInList().invoke('text').then(text => {
            const year = parseInt(text.split(" ")[0]);
            expect(year).to.not.be.greaterThan(parseInt(vehicle.vehicleYear) + 2);
            expect(year).to.not.be.lessThan(parseInt(vehicle.vehicleYear) - 2);
        });
    })

})
