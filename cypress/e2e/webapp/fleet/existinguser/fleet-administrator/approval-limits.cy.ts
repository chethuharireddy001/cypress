
import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { QuotesPage } from "../../../../../page-objects/webapp/quotes-page";
import { isLubemobile } from "../../../../../support/utils";

/// <reference types="cypress" />
const quotesPage = new QuotesPage();
const loginPage = new LoginPage();

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/fleet-administrator/approval-limits.cy.ts', () => {

    beforeEach(() => {
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetadmin, fleet.migratedFleetPassword);
        cy.avgWait();
        quotesPage.verifyApprovalLimits();
        quotesPage.urlApprovalLimits();

    });

    it('1. should update a fleets approval criteria', () => {
        const randomMaximum = Math.floor(Math.random() * (500 - 10) + 10);
        quotesPage.approvalQuoteLimitField().click();
        quotesPage.approvalQuoteLimitFieldInput().clear().type(randomMaximum.toString());
        const randomMaxIncrease = Math.floor(Math.random() * (90 - 10) + 10);
        quotesPage.approvalIncreaseLimitField().click();
        quotesPage.approvalIncreaseLimitFieldInput().clear().type(randomMaxIncrease.toString());
        quotesPage.catalogEntries();
        quotesPage.approvalsUpdate().click();
        quotesPage.approvalsCancel().click();
        quotesPage.approvalQuoteLimitField();
        quotesPage.approvalIncreaseLimitField();
        quotesPage.selectedServiceIndicies();
    });

    it('2. should update a fleets approval criteria to have no limits', () => {
        quotesPage.approvalQuoteOff().click();
        quotesPage.approvalIncreaseOff().click();
        quotesPage.approvalsUpdate().click();
        quotesPage.approvalsCancel().click();
        quotesPage.approvalQuoteLimitFieldValue();
        quotesPage.approvalIncreaseLimitFieldValueCheck();
        quotesPage.approvalQuoteOffRadio();
        quotesPage.approvalIncreaseOffRadio();
    });

    it('3. should update a fleets approval criteria to have maximum limits', () => {
        quotesPage.approvalsQuoteOn().click();
        quotesPage.approvalIncreaseOn().click();
        quotesPage.approvalsUpdate().click();
        quotesPage.approvalsCancel().click();
        quotesPage.approvalsQuoteOnRadio();
        quotesPage.approvalsIncreaseOnRadio();
    });

    it('4. should test the approval limit `cancel` button functionality', () => {
        const randomMaximum = Math.floor(Math.random() * (500 - 10) + 10);
        quotesPage.approvalQuoteLimitField().click();
        quotesPage.approvalQuoteLimitFieldMax().type(randomMaximum.toString());
        const randomMaxIncrease = Math.floor(Math.random() * (90 - 10) + 10);
        quotesPage.approvalIncreaseLimitField().click();
        quotesPage.approvalIncreaseLimitFieldMax().type(randomMaxIncrease.toString());
        quotesPage.catalogEntriesCheckbox();
        quotesPage.approvalsCancel().click();
        quotesPage.approvalQuoteLimitFieldValue();
        quotesPage.approvalIncreaseLimitFieldValueCheck();
        quotesPage.approvalsQuoteOnRadio();
        quotesPage.approvalsIncreaseOnRadio();
    });
});




