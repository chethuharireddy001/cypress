import { vehicle, properties } from "../../../configuration/properties";
import { BasePage } from "../../../page-objects/admin/base-page";
import { ContactCenter } from "../../../page-objects/admin/contact-center-page";
import { PricingTemplates } from "../../../page-objects/admin/pricing-templates-page";
import { isLubeMobile } from "../../../support/utils";

const contactCenter = new ContactCenter();
const basePage = new BasePage();
const pricingTemplatesPage = new PricingTemplates();

describe("Verify if the user is able to Create Template", () => {

    it("1.Create a template", () => {
        cy.login();
        contactCenter.navigateToContactCenterPage();
        pricingTemplatesPage.menuButton().click();
        pricingTemplatesPage.pricingTemplatesBtn().click();
        pricingTemplatesPage.createTemplateBtn().click({timeout: 30000});
        pricingTemplatesPage.findProductDropdwn().click();
        basePage.secondOption().click();
        pricingTemplatesPage.nextButton().click();
        pricingTemplatesPage.startYearDropdown().click();
        pricingTemplatesPage.yearOption(vehicle.vehicleYear).click();
        pricingTemplatesPage.endYearDropdown().click();
        pricingTemplatesPage.yearOption(vehicle.vehicleYear).click();
        pricingTemplatesPage.vehicleMakeDropdownBtn().click();
        pricingTemplatesPage.vehicleMakeOption(vehicle.vehicleMake).click();
        pricingTemplatesPage.vehicleModelDropdown().click({timeout:30000});
        pricingTemplatesPage.vehicleMakeOption(vehicle.vehicleModel).click();
        pricingTemplatesPage.addVehicleBtn().click({timeout:30000});
        pricingTemplatesPage.finishBtn().click();
        pricingTemplatesPage.createBtn().click();
        pricingTemplatesPage.addNewPartCategoryBtn().click();
        pricingTemplatesPage.partDropdown().click();
        pricingTemplatesPage.firstPartOption().click();
        pricingTemplatesPage.costBox().dblclick().clear().type(properties.cost);
        pricingTemplatesPage.priceBox().dblclick().clear().type(properties.price);
        pricingTemplatesPage.quantityBox().click().type(properties.quantity);
        pricingTemplatesPage.addPartSubmitBtn().click();
        pricingTemplatesPage.addNewLaborBtn().click();
        pricingTemplatesPage.laborBox().click().type(properties.labor);
        pricingTemplatesPage.recommendedCheckBox().click();
        pricingTemplatesPage.addLaborSubmitBtn().click();
        pricingTemplatesPage.fetchTemplateId().then((value) => {
            let dbName = "wrenchDb";
            if (isLubeMobile()) dbName = "lmDb";
            let templateId = value.text().replace('Template Id: ', '').trim();
            let templateID = parseInt(templateId);
            const query = "DELETE FROM PricingTemplate where Id=" + templateID + ";"
            cy.log(query);
            cy.task("queryDb", {dbName, query}).then((result) => { console.log(result); });
        });
    })

})