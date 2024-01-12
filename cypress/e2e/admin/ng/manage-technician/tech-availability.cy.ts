import {BasePage} from "../../../../page-objects/admin/base-page";
import {ManageTechPage} from "../../../../page-objects/manage-tech-page";
import {addDaysToToday} from "../../../../support/utils";
import {techData} from "../../../../configuration/properties";
import {DbUtils} from "../../../../page-objects/db-utils";
import {ApiUtils} from "../../../../page-objects/api-utils";

const basePage = new BasePage();
const manageTechPage = new ManageTechPage();
const dbUtils = new DbUtils();
const apiUtils = new ApiUtils();

let market = techData.market;

describe('Technician availability', () => {

    beforeEach(() => {
        cy.login();
        manageTechPage.navigateToManageTech();
        cy.intercept('/admin/findproviders').as('findProviders');
        dbUtils.deleteTech();
        manageTechPage.searchButton().click();
        apiUtils.createAndGoToTech();
        manageTechPage.availabilityTab().click();
    })

    it('1. add and delete current availability', () => {
        manageTechPage.addButton().click();
        manageTechPage.endDate().click();
        manageTechPage.today().click();
        manageTechPage.daysDropdown().click();
        basePage.firstOption().click();
        basePage.backDrop();
        manageTechPage.startTimeDropdown().click();
        manageTechPage.thisOption('9:00am').click();
        manageTechPage.endTimeDropdown().click();
        manageTechPage.thisOption('5:00pm').click();
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.serviceAreaDropdown().click();
        basePage.firstOption().click();
        manageTechPage.addHoursButton().click();
        basePage.successToast();
        manageTechPage.checkBoxes().first().click();
        manageTechPage.deleteAvailabilityButton().click();
        basePage.successToast();
    })

    it('2. add and delete upcoming availability', () => {
        const day = addDaysToToday(1).split("/")[1];
        manageTechPage.addButton().click();
        manageTechPage.startDate().click();
        manageTechPage.addAvailabilityBackdrop().click();
        manageTechPage.startDate().clear().type(addDaysToToday(1));
        manageTechPage.endDate().click();
        manageTechPage.selectDay(day).click();
        manageTechPage.daysDropdown().click();
        basePage.firstOption().click();
        basePage.backDrop();
        manageTechPage.startTimeDropdown().click();
        manageTechPage.thisOption('9:00am').click();
        manageTechPage.endTimeDropdown().click();
        manageTechPage.thisOption('5:00pm').click();
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.serviceAreaDropdown().click();
        basePage.firstOption().click();
        manageTechPage.addHoursButton().click();
        basePage.successToast();
        manageTechPage.upcomingAvailabilityTab().click();
        manageTechPage.checkBoxes().last().click();
        manageTechPage.deleteAvailabilityButton().last().click();
        basePage.successToast();
    })
})