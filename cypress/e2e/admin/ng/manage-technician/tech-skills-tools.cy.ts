import {BasePage} from "../../../../page-objects/admin/base-page";
import {ManageTechPage} from "../../../../page-objects/manage-tech-page";
import {properties, techData} from "../../../../configuration/properties";

const basePage = new BasePage();
const manageTechPage = new ManageTechPage();

let market = techData.market;
let serialNo = properties.toolSerialNo;

describe('Technician skills and tools', () => {

    beforeEach(() => {
        cy.login();
        manageTechPage.navigateToManageTech();
        manageTechPage.marketDropdown().click();
        manageTechPage.thisOption(market).click();
        manageTechPage.statusDropdown().click();
        manageTechPage.thisOption('Active').click();
        basePage.backDrop();
        manageTechPage.searchButton().click();
        basePage.firstRow().click();
    })

    it('1. verify adding a skill', () => { //might wanna verify the added skill on the list
        manageTechPage.skillsAndToolsTab().click();
        manageTechPage.addSkillsButton().click();
        manageTechPage.skillSetDropdown().click();
        basePage.firstOption().click();
        manageTechPage.checkBoxes().click({multiple: true});
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
    })

    it('2. verify editing a skill', () => {
        manageTechPage.skillsAndToolsTab().click();
        manageTechPage.addSkillsButton().click();
        manageTechPage.skillSetDropdown().click();
        basePage.secondOption().click();
        manageTechPage.checkBoxes().first();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
        manageTechPage.editButton().first().click();
        manageTechPage.checkBoxes().first().click();
        manageTechPage.checkBoxes().last().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
    })

    it('3. verify deleting a skill', () => {
        manageTechPage.skillsAndToolsTab().click();
        manageTechPage.addSkillsButton().click();
        manageTechPage.skillSetDropdown().click();
        basePage.secondOption().click();
        manageTechPage.checkBoxes().first();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
        manageTechPage.deleteButton().first().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })

    it('4. verify adding a tool', () => { //might wanna verify the added tool on the list
        manageTechPage.skillsAndToolsTab().click();
        manageTechPage.addToolsButton().click();
        manageTechPage.toolDropdown().click();
        basePage.firstOption().click();
        manageTechPage.serialNumber().type(serialNo);
        manageTechPage.description().type('This is ' + serialNo);
        manageTechPage.checkBoxes().click({multiple: true});
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
    })

    it('5. verify editing a tool', () => {
        manageTechPage.skillsAndToolsTab().click();
        manageTechPage.addToolsButton().click();
        manageTechPage.toolDropdown().click();
        basePage.firstOption().click();
        manageTechPage.checkBoxes().first().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
        manageTechPage.firstToolEditButton().click();
        manageTechPage.serialNumber().type(serialNo);
        manageTechPage.description().type('This is ' + serialNo);
        manageTechPage.checkBoxes().first().click();
        manageTechPage.checkBoxes().last().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
    })

    it('6. verify deleting a tool', () => {
        manageTechPage.skillsAndToolsTab().click();
        manageTechPage.addToolsButton().click();
        manageTechPage.toolDropdown().click();
        basePage.firstOption().click();
        manageTechPage.checkBoxes().first().click();
        manageTechPage.addUpdateButton().click();
        basePage.successToast();
        manageTechPage.firstToolDeleteButton().click();
        basePage.confirmButton().click();
        basePage.successToast();
    })
})