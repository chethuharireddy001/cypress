import {lmUser, properties} from "../../../configuration/properties";
import {isLubeMobile, Utils} from "../../../support/utils";
import {BasePage} from "../base-page";

const utils = new Utils();
const basePage = new BasePage();

export class InfoPage {

    notesSection() {
        cy.get('#mat-tab-label-1-1').click();
        basePage.header().should('include.text', 'Notes');
    }

    passwordSection() {
        cy.get('#mat-tab-label-1-2').click();
        basePage.header().should('include.text', 'Password');
    }

    laborRateSection() {
        cy.get('#mat-tab-label-1-3').click();
        basePage.header().should('include.text', 'Labor Rate');
    }

    combineSection() {
        cy.get('#mat-tab-label-1-3').click();
        basePage.header().should('include.text', 'Combine');
    }

    communicationSection() {
        cy.get('#mat-tab-label-1-4').click();
        basePage.header().should('include.text', 'Communication');
    }

    rolesSection() {
        cy.get('#mat-tab-label-1-5').click();
    }

    rightArrow() {
        cy.get('.mat-tab-header-pagination-after').click();
    }

    firstName() {
        return cy.getDataCy('firstName');
    }

    lastName() {
        return cy.getDataCy('lastName');
    }

    nickName() {
        return cy.getDataCy('nickName');
    }

    email() {
        return cy.getDataCy('email');
    }

    phoneNumber() {
        return cy.getDataCy('phone')
    }

    altPhoneNumber() {
        return cy.getDataCy('altPhone')
    }

    blockedStatus() {
        const faker = require("faker");
        const number = faker.datatype.number({max:2});
        cy.getDataCy('selectBlockedStatus').click();
        cy.get('[class="mat-option-text"]').eq(number).click();
    }

    notesField() {
        return cy.getDataCy('addedNotes').should('be.visible');
    }

    addNotesField() {
        return cy.getDataCy('addNote').should('be.visible');
    }

    passwordChange() {
        return cy.getDataCy('password').should('be.visible');
    }

    passwordConfirm() {
        return  cy.getDataCy('confirm').should('be.visible');
    }

    passwordNotMatch() {
        return cy.getDataCy('passwordMatchError').should('be.visible');
    }

    newLaborRate() {
        return cy.getDataCy('laborRateInput').should('be.visible');
    }

    confirmButton() {
        return cy.getDataCy('confirmButton').should('be.visible');
    }

    laborRateRequired() {
        return cy.getDataCy('laborRateError').should('be.visible');
    }

    clickAway() {
        return cy.getDataCy('laborRateHeader').click();
    }

    firstUserToCombine() {
        return cy.get('[role="cell"]').first().should('be.visible');
    }

    /**
     * ORGANIZATION PART
     */

    companyName() {
        return cy.getDataCy('companyName').should('be.visible');
    }

    notes() {
        return cy.getDataCy('notes').should('be.visible');
    }

    fleetSize() {
        return cy.getDataCy('fleetSizeDropdown').should('be.visible');
    }

    marketingStatus() {
        return cy.getDataCy('marketingStatus').should('be.visible');
    }

    salesRepresentative() {
        return cy.getDataCy('salesRep').should('be.visible');
    }

    fleetRep() {
        return cy.getDataCy('managerRep').should('be.visible');
    }

    fleetRepEmail() {
        return cy.getDataCy('managerRepEmail');
    }

    status() {
        return cy.getDataCy('status').should('be.visible');
    }

    taxExemptCheckBox() {
        return cy.getDataCy('taxExempt');
    }

    testingPurposes() {
        return cy.getDataCy('testingPurposes').should('be.visible');
    }

    orgLabor() {
        cy.get('#mat-tab-label-0-1').click();
        basePage.header().should('include.text', 'Labor Rate');
    }

    resetPassword() {
        return cy.getDataCy('resetPassword').should('be.visible');
    }

    unsubEmails() {
        return cy.getDataCy('unsubEmails').should('be.visible');
    }

    loginAsUser() {
        return cy.getDataCy('loginAsUser').should('be.visible');
    }

    disableUser() {
        return cy.getDataCy('disableUser').should('be.visible');
    }

    disableUserDetails() {
        return cy.getDataCy('disableUserDetails').should('be.visible');
    }

    addJob() {
        return ('[data-cy="addQuote"]');
    }

    addBulkJobButton() {
        return ('[data-cy="addBulkJob"]');
    }

    popUpConfirm() {
        return ('[data-cy="confirmButton"]');
    }

    findUserForm() {
        return cy.get('app-find-user-form');
    }

    rolesSubHeader() {
        return basePage.subHeader().should('include.text', 'Editing roles for consumers is not yet supported.');
    }

    howCustomerHeard() {
        return cy.get('[name="referralSource"]');
    }

    // rewrite the phone number
    editPhoneNumber() {
        let phoneNumber = properties.wrenchPhoneNumber;
        if (isLubeMobile()) phoneNumber = lmUser.phone;
        this.phoneNumber().clear().type(phoneNumber);
        cy.getDataCy('popUpAddButton').click();
    }

    verifyEmailChip() {
        this.email().invoke('val').then(textToAssert => {
            utils.assertViaText(cy.get('.mat-chip-list-wrapper > :nth-child(1)'), textToAssert);
        });
    }

    verifyPhoneChip() {
        this.phoneNumber().invoke('val').then(textToAssert => {
            utils.assertViaText(cy.get('.mat-chip-list-wrapper > :nth-child(2)'), textToAssert);
        });
    }

    verifyIdChip() {
        utils.assertViaText(cy.get('.mat-chip-list-wrapper > :nth-child(3)'), 'Id: ');
    }

    statusDropdown() {
        return cy.getDataCy('status');
    }

    combineEmailInput() {
        return cy.getDataCy('findUserEmail').should('be.visible');
    }

    editFirstName() {
        this.firstName().last().type('-');
    }

    editLastName() {
        this.lastName().last().type('-');
    }

    editNickname() {
        this.nickName().last().type('-');
    }

    editAlternatePhoneNumber() {
        this.altPhoneNumber().invoke('val').then(text => {
            if (text.toString.length > 0) {
                this.altPhoneNumber().clear().type('{enter}');
                expect(!(text.toString.length <= 0));
            } else {
                this.altPhoneNumber().type(properties.wrenchPhoneNumber + '{enter}');
                expect(text.toString.length > 0);
            }
        });
    }

    // if default status unset -> whitelist. if whitelist -> unset
    editStatus() {
        cy.getDataCy('blockedStatus').invoke('text').then(text => {
            if (text === 'Default (Unset)') {
                cy.getDataCy('blockedStatus').click();
                cy.get('[class="mat-option-text"]').contains('Whitelist').click();
                cy.getDataCy('popUpAddButton').click();
                cy.getDataCy('blockedStatus').should('include.text', 'Whitelist');
            } else if (text === 'Whitelist') {
                cy.getDataCy('blockedStatus').click();
                cy.get('[class="mat-option-text"]').contains('Default (Unset)').click();
                cy.getDataCy('popUpAddButton').click();
                cy.getDataCy('blockedStatus').should('include.text', 'Default (Unset)');
            }
        });
    }

    // if vip checked function ed, check off. else, check and verify the vip banner
    editVipCheckBox() {
        cy.getDataCy('vipCheck').as('checkBox').invoke('is', ':checked')
            .then(checked => {
                if (checked) {
                    cy.get('@checkBox').click();
                    cy.getDataCy('popUpAddButton').click();
                    cy.get('mat-panel-description').should('not.include.text', 'This account requires extra care and attention.');
                } else {
                    cy.get('@checkBox').click();
                    cy.getDataCy('popUpAddButton').click();
                    cy.get('mat-panel-description').should('include.text', 'This account requires extra care and attention.');
                }
            });
    }

    activateAccount() {
        return cy.getDataCy('activateAccount').should('be.visible');
    }

    infoTab() {
        return cy.getDataCy('Info');
    }

    householdName() {
        return cy.getDataCy('companyName');
    }

    houseHoldNotes() {
        return cy.getDataCy('notes');
    }

    externalId() {
        return cy.get('[name="externalId"]');
    }

    partner() {
        return cy.getDataCy('partner');
    }

    editPersonPhoneNumber() {
        return cy.getDataCy('phoneNumber').first();
    }

    editPersonAltPhoneNumber() {
        return cy.getDataCy('phoneNumber').last();
    }

    activityStatusCell() {
        return cy.get('.mat-row > .cdk-column-userStatus');
    }

    disableFollowupsCheckBox() {
        return cy.getDataCy('disableFollowups');
    }

    taxExemptInnerCheckBox() {
        return cy.get('[type=checkbox]').first();
    }

    disableFollowUpsInnerCheckbox() {
        return cy.get('[type=checkbox]').eq(1);
    }

    testingPurposesInnerCheckbox() {
        return cy.get('[type=checkbox]').eq(2);
    }

    blockedStatusDropdown() {
        return cy.getDataCy('blockedStatus');
    }
}