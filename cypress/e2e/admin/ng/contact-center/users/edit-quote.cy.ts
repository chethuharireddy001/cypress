import { QuotesPage } from "../../../../../page-objects/admin/quotes-page";
import { SchedulePage } from '../../../../../page-objects/admin/schedule-page';
import { JobsPage } from '../../../../../page-objects/admin/jobs-page';
import { wrenchUser, lmUser, properties } from "../../../../../configuration/properties";
import { BasePage } from "../../../../../page-objects/admin/base-page";
import { InfoPage } from "../../../../../page-objects/admin/manage-account/info-page";
import { ManageAccountPage } from "../../../../../page-objects/admin/manage-account/manage-account-page";
import { isLubeMobile } from "../../../../../support/utils";
import { ContactCenter } from "../../../../../page-objects/admin/contact-center-page";
import { CreateJobPage } from "../../../../../page-objects/admin/job-test-pages/create-job-page";

const jobsPage = new JobsPage()
const schedulePage = new SchedulePage();
const contactCenter = new ContactCenter();
const quotesPage = new QuotesPage();
const manageAccountPage = new ManageAccountPage();
const basePage = new BasePage();
const infoPage = new InfoPage();
const createJobPage = new CreateJobPage();

let quoteId;
let user = wrenchUser;
if (isLubeMobile()) user = lmUser;

describe("Create a quote", () => {
    //TODO: (@Kadir) set the quote through UI in one test and use api to set up the quote for the rest

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        cy.createUserViaApi(user);
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.householdButton().click();
        manageAccountPage.getUserReady();
        manageAccountPage.navigateToManageAccount();
        manageAccountPage.findUser();
        basePage.userActionsButton().click();
        cy.windowHandle(infoPage.addJob());
        createJobPage.addService().scrollIntoView().click({timeout: 20000});
        if (isLubeMobile()) {
            createJobPage.serviceInput().click();
            basePage.secondOption().click();
        } else {
            createJobPage.serviceInput().type(properties.service);
            cy.minWait();
            basePage.firstOption().click();
        }
        createJobPage.addServicesButton().click();
        cy.avgWait();
    })

    it('1. Verify canceling quote', () => {
        quotesPage.cancelQuoteButton().click();
        basePage.firstRadioButton().click();
        basePage.confirmButton().click();
        basePage.header().should('include.text', 'Find Quotes');
    })

    it('2. Verify changing quote status to Waiting for User', () => {
        const status = 'Waiting for User';
        quotesPage.selectActionButton().first().click();
        quotesPage.editQuoteButton().click();
        quotesPage.verifyEditQuoteModal();
        quotesPage.changeQuoteStatusTo(status);
        quotesPage.setNoLeadTime();
        quotesPage.editQuoteSaveButton().click();
        quotesPage.verifyQuoteStatusAs(status);
    })

    it('3. Verify changing quote status to Ready to Schedule', () => {
        const status = 'Ready to Schedule';
        quotesPage.selectActionButton().first().click();
        quotesPage.editQuoteButton().click();
        quotesPage.verifyEditQuoteModal();
        quotesPage.changeQuoteStatusTo(status);
        quotesPage.setNoLeadTime();
        quotesPage.datePicker().click();
        quotesPage.scheduleForTomorrow();
        quotesPage.sameAsCustomerNameCheckBox().click();
        quotesPage.howWasTheJobApproved(properties.jobApprovedOnline);
        quotesPage.editQuoteSaveButton().click();
        quotesPage.successToast();
    })

    it('4. Verify adding parts to the quote', () => {
        quotesPage.addPartButton().click();
        quotesPage.partNameBox().click();
        basePage.firstOption().click();
        quotesPage.selectVendorFromDropDown();
        quotesPage.sellPrice().type(properties.price);
        quotesPage.saveButton().click();
        quotesPage.successToast();
    })

    it('5. Verify editing a part in quote', () => {
        if (isLubeMobile()) {
            quotesPage.addPartButton().click();
            quotesPage.partNameBox().click();
            basePage.firstOption().click();
            quotesPage.selectVendorFromDropDown();
            quotesPage.sellPrice().type(properties.price);
            quotesPage.saveButton().click();
            cy.minWait();
        }
        quotesPage.editPartButton().first().click();
        quotesPage.selectVendorFromDropDown();
        quotesPage.sellPrice().clear().type(properties.price);
        quotesPage.quantity().clear().type(properties.quantity);
        quotesPage.saveButton().click();
        if (isLubeMobile()) quotesPage.secondSuccessToast();
        else quotesPage.successToast();
    })

    it('6. Verify deleting part from quote', () => {
        if (isLubeMobile()) {
            quotesPage.addPartButton().click();
            quotesPage.partNameBox().click();
            basePage.firstOption().click();
            quotesPage.selectVendorFromDropDown();
            quotesPage.sellPrice().type(properties.price);
            quotesPage.saveButton().click();
            cy.minWait();
        }
        quotesPage.deletePartButton().first().click();
        quotesPage.popUpYesButton().click();
        if (isLubeMobile()) quotesPage.secondSuccessToast();
        else quotesPage.successToast();
    })

    it.skip('7. Create Quote and convert from pricing to Ready to schedule then select ready for schedule quote and assign both primary technician', () => {
        //TODO: (@Kadir) look back at this flow

        const status = 'Ready to Schedule';
        quotesPage.selectActionButton().first().click();
        quotesPage.editQuoteButton().click();
        quotesPage.verifyEditQuoteModal();
        quotesPage.changeQuoteStatusTo(status);
        quotesPage.setNoLeadTime();
        quotesPage.datePicker().click();
        quotesPage.scheduleForTomorrow();
        quotesPage.sameAsCustomerNameCheckBox().click();
        quotesPage.howWasTheJobApproved(properties.jobApprovedOnline);
        quotesPage.editQuoteSaveButton().click();
        quotesPage.successToast();
        if (isLubeMobile()) {
            quotesPage.getQuoteID().then(($value) => {
                cy.minWait();
                quoteId = $value.text().trim()
                schedulePage.navigateToSchedulePageAndVerify();
                schedulePage.getAllReadyToScheduleQuotes().each(($el) => {
                    cy.wrap($el).click({force: true});
                    schedulePage.fetchQuoteID().then(($value) => {
                        let fetchedQuoteId = $value.text().replace('Quote', '').trim();
                        cy.log(fetchedQuoteId);
                        if (quoteId === fetchedQuoteId) {
                            schedulePage.assignToTechDropdown().click();
                            basePage.firstOption().click();
                            schedulePage.assignButton().click();
                            cy.avgWait();
                            contactCenter.searchAQuote(quoteId)
                            jobsPage.verifyJobIsScheduled();
                            //may not need this
                            jobsPage.cancelJob();
                        }
                    })
                })
            })
        }
    })

})
