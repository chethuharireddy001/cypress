import { isLubemobile } from "../../support/utils";

const selectedServiceIndicies = [];

export class QuotesPage {

    navigateToQuotesPage() {
        return cy.visit('/quotes');
    }

    verifyQuotesPage() {
        return cy.url().should('include', '/quotes');
    }

    verifyProspectPage() {
        return cy.url().should('include', '/newuser#prospect');
    }

    prospectHash() {
        return cy.hash().should('eq', '#prospect');
    }

    nextQuotesButton() {
        return cy.get('[data-cy=nextQuotes]').should('be.visible');
    }

    visitQuotesPage() {
        return cy.visit('/quotes');
    }

    serviceDescription(servicesNotes) {
        return cy.get('[data-cy=serviceDescription]').should('to.contain', servicesNotes).should('be.visible');
    }

    noQuotesDescription() {
        return cy.get('[data-cy=noQuotesMessage]').scrollIntoView().should('be.visible');
    }

    quoteHeaderVisible() {
        return cy.get('[data-cy=quotesHeader]').should('be.visible');
    }

    getQuote() {
        return cy.get('[data-cy=prospectGetAQuote]').should('be.visible');
    }

    addNoThanks() {
        return cy.get('[data-cy=addOnsNoThanks]').should('be.visible').should('include.text', 'No thanks');
    }

    newLocationNext() {
        return cy.get('[data-cy=newLocationNext]').should('be.visible');
    }

    scheduleNext() {
        return cy.get('[data-cy=scheduleNext]').should('be.visible');
    }

    deletePendingQuote() {
        return cy.get('[data-cy=deletePendingQuote]').should('be.visible');
    }

    confirmDeletePendingQuote() {
        return cy.get('[data-cy=confirmDeletePendingQuote]').should('be.visible');
    }

    paymentPass() {
        return cy.get('[data-cy=newPaymentPassword]').should('be.visible');
    }

    paymentPassConfirm() {
        return cy.get('[data-cy=newPaymentPasswordConfirm]').should('be.visible');
    }

    cartGetCustomquote() {
        return cy.get('[data-cy=cartGetCustomQuote]').should('be.visible');
    }

    paymentBookAppointment() {
        return cy.get('[data-cy=newPaymentBookAppointment]').should('be.visible');
    }

    bookNowButton() {
        return cy.get('[data-cy=cartBookNowButton]').should('be.visible');
    }

    addOnsGetCustomQuote() {
        return cy.get('[data-cy=addOnsGetCustomQuote]').should('be.visible');
    }

    signUpCreateAcc() {
        return cy.get('[data-cy=signupCreateAccount]').should('be.visible');
    }

    navigateFleetQuotes() {
        cy.visit('/fleet/quotes');
    }

    masterQuotesApproval() {
        cy.visit('/fleet/quotes');
        cy.url().should('include', '/quotes');
        cy.wait(10000);
        // cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').should('be.visible').click();
        cy.get(':checkbox').first().click({ force: true });
        cy.get('[data-cy=approveButton]').should('be.visible').click();
        cy.maxWait();
        cy.contains('No quotes awaiting approval found').should('be.visible');
    }

    servGetCustomQuote() {
        return cy.get('[data-cy=servicesGetCustomQuote]').should('be.visible');
    }

    signupGetCustomQuote() {
        return cy.get('[data-cy=signupGetCustomQuote]').should('be.visible');
    }

    vinLicenseContinue() {
        return cy.get('[data-cy=vinLicenseContinue]').should('be.visible');
    }

    validateStateContains() {
        return cy.get('[data-cy=state]').contains('WA').should('be.visible');
    }

    deleteWaitingForUserQuote() {
        return cy.get('[data-cy=deleteWaitingForUserQuote]').should('be.visible');
    }

    stateSelectValidation() {
        return cy.get('[data-cy=state]').contains('WA');
    }

    validateSelectedVehicle() {
        return cy.get('[data-cy="makeSelect"] .mat-select-value').should('be.visible').contains('Toyota');
    }

    containsVehicleSelected() {
        return cy.get('.quote-text').contains('Toyota');
    }

    validateURL() {
        return cy.url().should('include', '/quotes');
    }

    validateNewUserURL() {
        return cy.url().should('include', '/newuser');
    }

    vehicleSpecs() {
        return cy.get('[data-cy="makeSelect"] .mat-select-value').contains('Toyota');
    }

    newPayment() {
        return cy.get('[data-cy=newPaymentBack]').should('be.visible');
    }

    scheduleBack() {
        return cy.get('[data-cy=scheduleBack]').should('be.visible');
    }

    newLocationBack() {
        return cy.get('[data-cy=newLocationBack]').should('be.visible');
    }

    serviceBack() {
        return cy.get('[data-cy=servicesBack]').should('be.visible');
    }

    vehicleBack() {
        return cy.get('[data-cy=vehicleBack]').should('be.visible');
    }

    bookAppointment() {
        return cy.get('[data-cy=newPaymentBookAppointment]').should('be.visible');
    }

    bookNowCartButton() {
        return cy.get('[data-cy=cartBookNowButton]').should('be.visible');
    }

    verifyApprovalLimits() {
        return cy.visit('/account/approvallimits');
    }

    urlApprovalLimits() {
        return cy.url().should('include', '/account/approvallimits');
    }

    approvalQuoteLimitField() {
        return cy.get('[data-cy=approvalQuoteLimitField]').should('be.visible');
    }

    approvalQuoteLimitFieldInput() {
        return cy.get('[data-cy=approvalQuoteLimitField] input').should('be.visible');
    }

    approvalIncreaseLimitField() {
        return cy.get('[data-cy=approvalIncreaseLimitField]').should('be.visible');
    }

    approvalIncreaseLimitFieldInput() {
        return cy.get('[data-cy=approvalIncreaseLimitField] input').clear().should('be.visible');
    }

    catalogEntries() {

        let everyOther = false;
        return cy.get('[formarrayname=catalogEntries] mat-checkbox').each((entry, index) => {
            if (entry.hasClass('mat-checkbox-checked')) {
                entry.click();
            }

            if (everyOther) {
                entry.click();
                selectedServiceIndicies.push(index);
            }

            everyOther = !everyOther;
        });
    }

    approvalsUpdate() {
        return cy.get('[data-cy=approvalsUpdate]').should('be.visible');
    }

    approvalsCancel() {
        return cy.get('[data-cy=approvalsCancel]').should('be.visible');
    }

    selectedServiceIndicies() {
        return cy.get('[formarrayname=catalogEntries] mat-checkbox').each((entry, index) => {
            if (selectedServiceIndicies.includes(index)) {
                expect(entry).to.have.class('mat-checkbox-checked');
            } else {
                expect(entry).to.not.have.class('mat-checkbox-checked');
            }
        });
    };

    approvalQuoteLimitFieldValue() {
        return cy.get('[data-cy=approvalQuoteLimitField] input').should('be.visible').should('have.value', "0");
    }
    
    approvalQuoteOff() {
        return cy.get('[data-cy=approvalQuoteOff]').should('be.visible');
    }

    approvalIncreaseOff() {
        return cy.get('[data-cy=approvalIncreaseOff]').should('be.visible');
    }
    approvalIncreaseLimitFieldValueCheck() {
        return cy.get('[data-cy=approvalIncreaseLimitField] input').should('be.visible').should('have.value', "0");
    }

    approvalQuoteOffRadio() {
        return cy.get('[data-cy=approvalQuoteOff]').should('have.class', 'mat-radio-checked');
    }

    approvalIncreaseOffRadio() {
        return cy.get('[data-cy=approvalIncreaseOff]').should('have.class', 'mat-radio-checked');
    }

    approvalsQuoteOn() {
        return cy.get('[data-cy=approvalQuoteOn]').should('be.visible');
    }

    approvalIncreaseOn() {
        return cy.get('[data-cy=approvalIncreaseOn] span.text-light').should('be.visible');
    }

    approvalsQuoteOnRadio() {
        return cy.get('[data-cy=approvalQuoteOn]').should('have.class', 'mat-radio-checked');
    }

    approvalsIncreaseOnRadio() {
        return cy.get('[data-cy=approvalIncreaseOn]').should('have.class', 'mat-radio-checked');
    }

    approvalQuoteLimitFieldMax() {
        return cy.get('[data-cy=approvalQuoteLimitField] input').clear().should('be.visible');
    }

    approvalIncreaseLimitFieldMax() {
        return cy.get('[data-cy=approvalIncreaseLimitField] input').clear().should('be.visible');
    }

    catalogEntriesCheckbox() {
        let everyOther = false;
        return cy.get('[formarrayname=catalogEntries] mat-checkbox').each((entry, index) => {
            if (entry.hasClass('mat-checkbox-checked')) {
                entry.click();
            }

            if (everyOther) {
                entry.click();
            }

            everyOther = !everyOther;
        });
    }

    pricingTab() {
        return cy.get("[id^=mat-tab-label]").should('be.visible').contains('Pricing');
    }

    quoteIdInPricingTab() {
        return cy.get('.cdk-column-id > strong').first().should('be.visible');
    }

    quoteIdInApproveTab() {
        return cy.get('.mat-row > .cdk-column-id > :nth-child(1)').first().should('be.visible');
    }

    navigateToFleetQuotesPageAndVerify() {
        return cy.visit('/fleet/quotes').url().should('include', '/fleet/quotes');
    }

    verifyFleetQuotesPage() {
        return cy.url().should('include', '/fleet/quotes');
    }

    submitForApprovalBtn() {
        return cy.get('[data-cy=approvalSubmitforApproval]').should('be.visible');
    }

    approveTab() {
        return cy.get('[id^=mat-tab-label]').should('be.visible').contains('Approve');
    }

    scheduleTab() {
        return cy.get('[id^=mat-tab-label]').should('be.visible').contains('Schedule');
    }

    savedTab() {
        return cy.get('[id^=mat-tab-label]').should('be.visible').contains('Saved');
    }

    serviceDescriptionInApproveTab() {
        return cy.get('[data-cy=serviceDescription]').first().should('be.visible');
    }

    serviceDescriptionInScheduleTab() {
        return cy.get('[data-cy=serviceDescription]').first().should('be.visible');
    }

    firstCheckBox() {
        return cy.get('#mat-checkbox-2').should('be.visible');
    }

    checkBoxQuote() {
        return cy.get('[class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"]').eq(1);
    }

    checkQuote() {
        return cy.get('#mat-checkbox-7').should('be.visible');
    }

    clickQuote() {
        return cy.get('#mat-checkbox-6').should('be.visible');
    }

    approveButton() {
        return cy.get('[data-cy=approveButton]').should('be.visible');
    }

    scheduleBtn() {
        return cy.get('[data-cy=scheduleButton]').first().should('be.visible');
    }

    saveBtn() {
        return cy.get('[data-cy=saveButton]').should('be.enabled');
    }

    denyBtn() {
        return cy.get('[data-cy=denyButton]').should('be.enabled');
    }

    fleetQuotesPageTitleTxt() {
        return cy.get('[data-cy=fleetQuotesPageTitleTxt]').should('be.visible');
    }

    selectManageRequests() {
        return cy.contains('Manage Requests').should('be.visible');
    }

    fleetcancelBtn() {
        return cy.get('[data-cy=cancelButton]').should('be.visible');
    }

    deletePricingQuotes() {
        cy.get('#mat-checkbox-8 > .mat-checkbox-layout').should('be.visible').click();
        cy.get('[data-cy=cancelButton]').should('be.visible').click();
    }

    deletePricingQuotesForFleet() {
        cy.get('#mat-checkbox-3 > .mat-checkbox-layout > .mat-checkbox-inner-container').should('be.visible').click();
        cy.get('[data-cy=cancelButton]').should('be.visible').click();
    }

    qoutesInPricing() {
        return cy.get('#mat-tab-label-0-0').should('be.visible');
    }
    scheduleAJobFromScheduleTab(){
        cy.get(' [data-cy="scheduleButton"]').first().should('be.visible').click();
        cy.get('[data-cy="nextButton"]').should('be.visible').click();
        cy.get('[data-cy="warningOk"]').should('be.visible').click();
        cy.get('[data-cy="nextButton"]').should('be.visible').click();
        cy.get('[data-cy="nextButton"]').should('be.visible').click();
        cy.minWait();
        if (!isLubemobile()) {
            cy.get('[data-cy="nextButton"]').should('be.visible').click();
        }
    }

}
