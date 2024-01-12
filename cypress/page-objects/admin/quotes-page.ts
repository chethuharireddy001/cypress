
import { properties } from "../../configuration/properties";
import { isLubeMobile } from "../../support/utils";
import {BasePage} from "./base-page";
import {CreateJobPage} from "./job-test-pages/create-job-page";

const basePage = new BasePage();
const createJobPage = new CreateJobPage();

export class QuotesPage {
    verifyFleetQuotesPage() {
        return cy.url().should('include', '/fleet/quotes');
    }
    pricingTab() {
        return cy.get("[id^=mat-tab-label]").should('be.visible').contains('Pricing');
    }
    quoteIdInPricingTab() {
        return cy.get('.cdk-column-id > strong').first().should('be.visible');
    }

    verifyParticularQuotesPage(quoteId) {
        cy.get('.page-busy-center', { timeout: 20000 }).should('not.be.visible')
        cy.get('h1').invoke('text').then(text => {
            expect(text).to.include(quoteId)
        })
    }

    invalidQuoteIdErrorMessage() {
        return cy.get("[class='row alert alert-danger']").invoke('text').then((Text) => {
            const val = Text.trim();
            expect(val).to.be.contain('Invalid job request id')
        })
    }

    addServiceButton() {
        return cy.getDataCy('addService');
    }

    serviceSelectionBox() {
        return cy.get('[spellcheck=false]').should('be.visible');
    }

    addServicesButton() {
        return cy.getDataCy('addServicesButton');
    }

    cancelQuoteButton() {
        return cy.getDataCy('cancelQuoteMenu').should('be.visible');
    }

    selectActionButton() {
        return cy.getDataCy('selectActionButton');
    }

    editQuoteButton() {
        return cy.get('[ng-click="openUpdateQuoteModal()"]').last();
    }

    verifyEditQuoteModal() {
        cy.get('#modal-title').should('include.text', 'Edit Quote').should('be.visible');
    }

    changeQuoteStatusTo(status) {
        return cy.get("[name=status]").select(status);
    }

    setNoLeadTime() {
        return cy.get("[name=leadTime]").type('0');
    }

    editQuoteSaveButton() {
        return cy.get("[type=submit]").first();
    }

    verifyQuoteStatusAs(status) {
        return cy.getDataCy('quoteStatusLabel').should('have.text', status);
    }

    successToast() {
        return cy.get('#bigBox1').should('include.text', 'Success').and('be.visible');
    }

    sameAsCustomerNameCheckBox() {
        return cy.get('[ng-change="fillCustomerName()"]').should('be.visible');
    }
    
    howWasTheJobApproved(status) {
        return cy.get("[name=approvalType]").select(status);
    }

    datePicker() {
        return cy.get('#dropdownStart');
    }

    scheduleForTomorrow() {
        cy.get('[class="day"]').first().next().click();
        cy.get('[class="hour"]').eq(10).click();
        cy.get('[class="minute"]').first().click();
    }

    verifyFindQuotesPage() {
        cy.get('h1').should('include.text', 'Find Quotes');
    }

    changeJobLocation(location) {
        cy.minWait();
        cy.get('#location').select(location);
        cy.on('window:alert', (str) => {
            // When the alert appears, this callback function will be called.
            // You can use it to close the alert.
            cy.log(`Alert message: ${str}`);
            cy.get('button').contains('No, thanks').click();
        });

    }

    saveJobLocation() {
        cy.get('[ng-click="changeTimeLocation()"]').should('be.visible').click();
    }

    addPartButton() {
        return cy.getDataCy('addPartButton');
    }

    partNameBox() {
        return cy.get("[role=combobox]").first();
    }

    selectVendorFromDropDown() {
        cy.get("[type=search]").click();
        cy.get('[role=option]').first().click();
    }

    sellPrice() {
        return cy.get("[placeholder='Sell Price']");
    }

    quantity() {
        return cy.get('[name="partQuantity"]');
    }

    saveButton() {
        return cy.get('button').contains('Save');
    }

    editPartButton() {
        return cy.getDataCy('editPartButton');
    }

    deletePartButton() {
        return cy.getDataCy('deletePartButton').should("be.visible");
    }

    popUpYesButton() {
        return cy.get('#bot2-Msg1').should("be.visible");
    }

    getQuoteID() {
        return cy.getDataCy('quote-number').should("be.visible");
    }

    statusLabel() {
        return cy.getDataCy('quoteStatusLabel').should("be.visible");
    }

    scheduleScreenBtn() {
        return cy.get('span').contains('Schedule').should("be.visible");
    }

    selectTechnician(technician) {
        return cy.get('span').contains(technician).should("be.visible");
    }

    secondSuccessToast() {
        cy.get('#bigBox2').should('be.visible').and('include.text', 'Success');
    }

    errorMessage() {
        return cy.get('form-alerts > #wrench-error');
    }

    selectService() {
        if (isLubeMobile()) {
            createJobPage.serviceInput().click();
            basePage.secondOption().click();
        } else {
            createJobPage.serviceInput().type(properties.service);
            cy.minWait();
            basePage.firstOption().click();
        }
    }

    locationDropdown() {
        return cy.get('#location');
    }

    goToQuotesPage() {
        cy.intercept('admin/findproviders').as('findProviders');
        cy.visit('#/find_quotes?status=5&start=0&limit=40');
    }

    // secondServiceSelectionBox() {
    //     return cy.xpath("//input[contains(@id,'mat-input-3')]").should("be.visible");
    // }

    // secondServiceSelection() {
    //     return cy.xpath("//span[contains(.,'Mobile Tyre Replacement')]").should("be.visible");
    // }
}


