export class AppointmentsPage {

    navigateToAppointmentsPageAndVerify() {
        cy.visit('/appointments').url().should('include', '/appointments');
    }
    navigateToFleetAppointmentsPageAndVerify() {
        cy.visit('/fleet/appointments/').url().should('include', '/fleet/appointments');
    }
    
    verifyFleetAppointmentsPage() {
        cy.get('.quote-header-1').should('be.visible');
        cy.url().should('include', '/fleet/appointments/');
    }

    verifyThirdshiftBookPage() {
        cy.visit('/book');
        cy.url().should('include', '/book');
    }

    verifyAppointmentsPage() {
        return cy.url().should('include', '/appointments');
    }

    verifyConfirmationPage(){
        return cy.url().should('include','/book#confirm');
    }

    verifyAppPage() {
        return cy.url().should('include', '/booking');
    }

    verifyAppointmentsForBookingComplete() {
        return cy.url().should('include', '/appointments/newuser/bookingcomplete');
    }

    appointmentsTitle() {
        return cy.get("[data-cy=appointmentsPageTitleTxt]").should('be.visible').and("contain", "Appointments");
    }

    confirmBookAppointment() {
        return cy.get('[data-cy=confirmBookAppointment]').should('be.visible');
    }

    bookAppointmentBtn() {
        return cy.get("[data-cy=bookAppointmentBtn]").should('be.visible').should("contain", "Book appointment");
    }

    cancelAppointmentButton() {
        return cy.get('[data-cy=pendingCancel]').should('be.visible').and("contain", "Cancel appointment");
        // cy.get('[data-cy=pendingCancel]', { timeout: 10000 }).should('be.visible').should('contain','Cancel appointment').click();
    }

    cancelAppointmentConfirmButton() {
        return cy.get('[data-cy=cancelAppointment]').should('be.visible');
    }

    noAppointmentsDescription() {
        // cy.scrollTo(500, 0);
        return cy.get('[data-cy=noQuotesMessage]').scrollIntoView().should('be.visible').contains(Cypress.env('noUpcomingAppointmentsDescription'));
    }

    jobMenuButton() {
        return cy.get('[data-cy=jobMenuButton]').should('be.visible').first();
    }

    cancelButtonFromDropDown() {
        return cy.get('.mat-menu-content').should('be.visible').contains('Cancel');
    }

    noJobsFoundDescription() {
       // cy.scrollTo(500, 0);
        return cy.get('.no-appointments').scrollIntoView().should('be.visible');
    }

    priceBreakDownButton() {
        return cy.get('[data-cy=pendingPriceBreakdownButton]').should('be.visible').should('contain', 'Price breakdown');
    }

    appPriceBreakDownbutton() {
        return cy.get('app-price-breakdown').should('be.visible');
    }

    priceBreakDownModalPopUpCloseButton() {
        return cy.get('[data-cy=priceBreakdownCloseButton]').should('be.visible');
    }

    upcomingPriceBreakDownButton() {
        return cy.get('[data-cy=upcomingpricebreakdownbutton]').should('be.visible');
    }

    jobMenuPriceDownButton() {
        return cy.get('[data-cy=jobMenuPriceBreakdownButton]').should('be.visible');
    }

    verifyAddedJob() {
        return cy.get('.cdk-column-id > .ng-tns-c397-4').should('be.visible');
    }

    cancelAppointmentFlow() {
        // cy.get('.mat-menu-content > :nth-child(1) > :nth-child(4)').should('be.visible').click();

            cy.wait(1000);
            // cy.get('[data-cy=pendingCancel]', { timeout: 10000 }).should('be.visible').should('contain', 'Cancel appointment').click();
            // cy.get('.mat-select-placeholder').should('be.visible').select('Weather');
            // cy.get('.mat-select-placeholder').should('be.visible').first().click();
            cy.contains('Please Select the Reason for Cancelling Appointment').should('be.visible').click();
            cy.contains('Weather').should('be.visible').click();
            cy.get('[data-cy=cancelAppointment]').should('be.visible').should('contain', 'Confirm').click({ force: true });
            cy.minWait();
            cy.url().should('include', '/appointments');


    }

    cancelAllPendingAppointments() {
        cy.get('.cdk-column-actions > [data-cy=jobMenuButton]').each(() => {
        cy.get('[data-cy=jobMenuButton]', { timeout: 10000}).first().should('be.visible').click();
        cy.get('[data-cy=cancelButton]').should('be.visible').click({force: true});
        cy.contains('Please Select the Reason for Cancelling Appointment').should('be.visible').click();
        cy.contains('Weather').should('be.visible').click();
        cy.get('[data-cy=cancelAppointment]').should('be.visible').should('contain', 'Confirm').click({ force: true });
        cy.avgWait();
        cy.url().should('include', '/appointments');});
    }

    getAQuoteBtn() {
        return cy.get('.container > .mat-focus-indicator > .mat-button-wrapper').should('be.visible');
    }

    appointmentsTab() {
        return cy.get('#appointmentsTabs').should('be.visible');
    }

    cancelButton() {
        return cy.get('[data-cy=cancelButton]').should('be.visible');
    }

    serviceNameInAppointments() {
        return cy.get('.job-row > .cdk-column-service').should('be.visible');
    }

    validateAppointmentConfirmed() {
        return cy.get('[data-cy=confirmation] > .margin-bottom-small').invoke('text').then((text) => {
            expect(text.toString().trim()).contains('Appointment confirmed');
        });
    }

    fleetServiceName() {
        return cy.get('[data-column-name=" Services "]').first().should('be.visible');
    }

    cancelBtn() {
        return cy.get('button').contains('Cancel');
    }

    filterByVehicleTxtField() {
        return cy.get("[data-cy=vehicleSelector]").should('be.visible');
    }

    changeButton(){
        return cy.get('[data-cy=changeButton]').should('be.visible');
    }

    modifyAppointmentButton(){
        return cy.get('[data-cy=modifyAppointmentButton]').should('be.visible');
    }

    verifyAppointmentDate(){
        return cy.get('#datePicker').should('be.visible');
    }

    newAppointmentLocationNote(){
        return cy.get('#newLocationNotes').should('be.visible');
    }

    updateAppointmentPageButton(){
        return cy.get('[data-cy=updateAppointment]').should('be.visible');
    }

    selectAppointments(){
        return cy.contains('Appointments').should('be.visible');
    }
    getSummaryPagePrice() {
        return cy.get("div#totalSummary").first().invoke('text');
     }
     compareServicePriceWithSummaryPrice(servicePagePrice, summaryPagePrice) {

         // const summaryPagePrice = summaryPrice.trim();
          return expect(summaryPagePrice).to.eq('$'+servicePagePrice);

     }
     getPriceBreakDownPrice() {
        return   cy.get("div[data-cy='txnTotal']").invoke('text');
     }
      compareServicePriceWithPricebreakdownPrice(summaryPagePrice, final_price) {

       // const summaryPagePrice = summaryPrice.trim();
        return expect(final_price).to.eq(summaryPagePrice);

   }
}

