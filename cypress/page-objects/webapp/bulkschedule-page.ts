export class BulkSchedulePage {

    verifyMinionquotesPage() {
        cy.url().should('include', '/fleet/quotes');
    }

    verifyBulkSchedulerbutton() {
        return cy.get('[data-cy=bulkScheduleButton]');
    }

    verifyBulkScheduleIntroductionPage() {
        cy.get('.quote-header-1').should('be.visible');
        return cy.url().should('include', '/fleet/quotes/#introduction');
    }

    verifyBulkScheduleLocationPage() {
        return cy.url().should('include', '/fleet/quotes/#location');
    }

    verifyBulkScheduleQuotesPage() {
        return cy.url().should('include', '/fleet/quotes/#quotes');
    }

    verifyBulkScheduleSchedulePage() {
        return cy.url().should('include', '/fleet/quotes/#schedule');
    }

    verifyXButton() {
        return cy.get('[data-cy=closebutton]').should('be.visible');
    }

    verifyConfirmationDialogueContinue() {
        return cy.get('[data-cy=modalFooterNextButton]').should('be.visible');
    }

    verifyConfirmationCancelButton() {
        return cy.get('[data-cy=modalFooterBackButton]').should('be.visible');
    }

    verifyLocationButton() {
        return cy.get('[data-cy=nextLocation]').should('be.visible');
    }

    selectLocation() {
        cy.get('[data-cy=locationSelector]').should('be.visible').click();
        cy.get('.mat-option').first().should('be.visible').click();
        cy.get('[data-cy=nextLocation]').should('be.visible').click();
    }

    selectSecondLocation() {

        cy.get('.mat-select-arrow-wrapper').should('be.visible').click();
        cy.get('.mat-option-text').eq(1).should('be.visible').click();
        cy.get('[data-cy=nextLocation]').should('be.visible').click();
    }

    selectQuotesPage() {
        // cy.get(`[data-column-name=" Quote Id "]`).should('be.visible');
        cy.get('#mat-checkbox-2').should('be.visible').click();
        cy.get('#mat-checkbox-3').should('be.visible').click();
    }


    scheduleAppointmentsPage() {
        cy.get('[data-cy=Schedule]').should('be.visible').click();
        cy.get("[data-cy=nextSchedule]").should('be.visible').click();
        cy.get("[data-cy=modalFooterNextButton]").should('be.visible').click();
    }

}