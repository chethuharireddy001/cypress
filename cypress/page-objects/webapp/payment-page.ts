import { fleetUsers } from "../../configuration/properties";

export class PaymentPage {

    paymentNextButton() {
        return cy.get('[data-cy=paymentNext]').should('be.visible').click({ force: true });
    }

    paymentBack() {
        return cy.get('[data-cy=paymentBack]').should('be.visible');
    }

    paymentHash() {
        return cy.hash().should('eq', '#newPayment');
    }
    fillCreditCardDetails() {
        cy.get('[data-cy=newPaymentName]').should('be.visible').type(fleetUsers.creditCardUserName);
        cy.getCardNumberIframeBody().find('#credit-card-number').scrollIntoView().should('be.visible').type(fleetUsers.creditCardNumber);
        cy.getExpiryMonthIframeBody().find('#expiration-month').should('be.visible').type(fleetUsers.creditCardExpiryMonth);
        cy.getExpiryYearIframeBody().find('#expiration-year').should('be.visible').type(fleetUsers.creditCardExpiryYear);
        cy.getCVVIframeBody().find('#cvv').should('be.visible').type(fleetUsers.creditCardCVVNumber);
        cy.getZipCodeIframeBody().find('#postal-code').should('be.visible').type(fleetUsers.pinCode);
    }

    paymentBackButton() {
        return cy.get('[data-cy=newPaymentBack]').should('be.visible').should('contain', 'Back');
    }

    paymentPageEmailTxtField() {
        return cy.typeNewUserEmail('[data-cy=accountEmail]').should('be.visible');
    }

    verifyNewUserPaymentPage() {
        return cy.url().should('include', '/newuser#newPayment');
    }

    verifyNewUserAccountPage() {
        return cy.url().should('include', '/newuser#create_account');
    }

    accountName() {
        return cy.get('[data-cy=accountName]').should('be.visible');
    }

    accountNextButton() {
        return cy.get('[data-cy=create_accountNext]').should('be.visible');
    }

    addPayment() {
        cy.get('.mat-select-arrow').click();
        cy.get('.mat-option-text').contains('+ Add Payment').then(option => {
            option[0].click();
        });
    }

    accountPhone() {
        return cy.get('[data-cy=accountPhone]').should('be.visible');
    }

    newaccountPhone() {
        return cy.get('#phone').should('be.visible');
    }

    selectPaymentDropdown() {
        return cy.get('.mat-select-arrow-wrapper').should('be.visible');
    }

    selectOtherPayment() {
        return cy.get('.mat-option-text').contains('Visa ending in 1112');
    }

    accountCompany() {
        return cy.get('[data-cy=accountCompany]').should('be.visible');
    }

    paymentBookAppointment() {
        return cy.get('[data-cy=paymentBookAppointment]').should('be.visible');
    }

    paymentPageNewPhoneno() {
        return cy.get('[data-cy=newPaymentPhone]').should('be.visible').type('(999) 999-9999');
    }

    signupPhone() {
        return cy.get('[data-cy=signupPhone]').should('be.visible');
    }

    signupName() {
        return cy.get('[data-cy=signupName]').should('be.visible');
    }

    outOfAreaGetAQuote() {
        return cy.get('[data-cy=outOfAreaGetAQuote]').should('be.visible');
    }

    closeOutOfAreaModal() {
        return cy.get('[data-cy=closeOutOfAreaModal]').should('be.visible');
    }

    paymentPageNewPasswordField() {
        return cy.get('[data-cy=newPaymentPassword]').should('be.visible').type('smokeTest');
    }

    passwordTxtField() {
        return cy.get('[data-cy=newPaymentPassword]').should('be.visible');
    }

    paymentNewPasswordConfirmField() {
        return cy.get('[data-cy=newPaymentPasswordConfirm]').should('be.visible').type('smokeTest');
    }

    confirmPasswordTxtField() {
        return cy.get('[data-cy=newPaymentPasswordConfirm]').should('be.visible');
    }

    paymentPagePasswordTxtField() {
        return cy.get('[data-cy=accountPassword]').should('be.visible');
    }

    paymentPageConfirmPasswordTxtField() {
        return cy.get('[data-cy=accountPasswordConfirm]').should('be.visible');
    }

    bookAppointmentButton() {
        return cy.get('[data-cy=paymentConfirmButton]').should('be.visible');
    }

    bookNewAppointmentButton() {
        return cy.get('[data-cy=paymentConfirmButton]').should('be.visible');
    }

    paymentConfirmBackButton() {
        return cy.get('[data-cy=paymentConfirmBack]').should('be.visible');
    }

    confirmBookAppointment() {
        return cy.get('[data-cy=confirmBookAppointment]').should('be.visible');
    }

    verifyOffer20seaPaymentPage() {
        return cy.url().should('include', '/offerup/offerup20sea#newPayment');
    }

    verifyOfferPaymentPage() {
        return cy.url().should('include', '/offerup#newPayment');
    }

    paymentDropdowndriver(){
        return cy.get('#paymentMethods').should('be.visible');
    }

    paymentNxtBtn() {
        return cy.get('[data-cy=nextButton]').should('be.visible');
    }

    bookAppointmentBtn() {
        return cy.get('[data-cy=nextButton]').should('be.visible');
    }

    addPaymentBtn() {
        return cy.get('[data-cy=addPaymentMethod]').should('be.visible');
    }

    addPaymentdetails(){
        return cy.get('[data-cy=addPayment]').should('be.visible');
    }

    setDefaultBtn() {
        return cy.get('.set-default').should('be.visible');
    }

    deletePayment() {

        return cy.get('[data-cy-paymentmethodid="158295"] > td.ng-star-inserted > .remove-payment-method');
    }

    deleteFirstPaymentmethod(){
        
        return cy.get(':nth-child(1) > .payment-method > [data-cy=deletePaymentMethod]').should('be.visible');
    }

    closePayment() {
        return cy.get('[data-cy=closePaymentMethod]').should('be.visible');
    }

    addPaymentSelector() {
        cy.get('[data-cy=paymentSelector]').type('Add Payment');
        cy.get('.mat-option').contains('Add Payment').click();
    }
    fillNewCreditCardDetails() {
        cy.get('[data-cy=newPaymentName]').should('be.visible').type(fleetUsers.creditCardUserName);
        cy.getCardNumberIframeBody().find('#credit-card-number').scrollIntoView().should('be.visible').type(fleetUsers.creditCardNumber);
        cy.getExpiryMonthIframeBody().find('#expiration-month').should('be.visible').type(fleetUsers.creditCardExpiryMonth);
        cy.getExpiryYearIframeBody().find('#expiration-year').should('be.visible').type(fleetUsers.creditCardExpiryYear);
        cy.getCVVIframeBody().find('#cvv').should('be.visible').type(fleetUsers.creditCardCVVNumber);
        cy.getZipCodeIframeBody().find('#postal-code').should('be.visible').type(fleetUsers.pinCode);
        cy.get('[data-cy="ModalButton"]').should('be.visible').click();
    }

    diffPaymentSelector() {
        cy.get('[data-cy=paymentSelector]').type('Visa ending in 1111');
        cy.get('.mat-option').contains('Visa ending in 1111').click();
    }

    navigatePaymentPage() {
        cy.visit('/book#payment'); 
        cy.url().should('include', '/book#payment');
        }

}

