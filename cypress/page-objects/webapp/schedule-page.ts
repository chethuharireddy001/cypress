export class SchedulePage {

    scheduleNextButton() {
        return cy.get('[data-cy=scheduleNext]').should('be.visible');
    }

    scheduleHash() {
        return cy.hash().should('eq', '#schedule');
    }

    scheduleServicesNavigationButton() {
        return cy.get('[data-cy=scheduleServices]').should('be.visible');
    }

    scheduleBackButton() {
        return cy.get('[data-cy=scheduleBack]').should('be.visible');
    }

    verifySchedulePage() {
        return cy.url().should('include', '/book#schedule');
    }

    selectTime() {
        return cy.get('.mat-select-placeholder').should('be.visible');
    }

    verifyOffer20seaSchedulePage() {
        return cy.url().should('include', '/offerup/offerup20sea#schedule');
    }

    verifyOfferSchedulePage() {
        return cy.url().should('include', '/offerup#schedule');
    }

    verifyNewUserSchedulePage() {
        return cy.url().should('include', '/newuser#schedule');
    }
    verifyDanUserSchedulePage() {
        return cy.url().should('include', 'lm-user#schedule');
    }

    scheduleNxtBtn() {
        return cy.get('[data-cy=nextButton]').should('be.visible');
    }

    verifyThirdShiftScheduleFlow() {
        cy.get('[data-cy=scheduleNext]').click();
        cy.get('#shift-banner > div > label').eq(4).contains(Cypress.env('thirdShiftMessage'));
        cy.get('[data-cy=summaryNext]').first().click();
    }

    checkingNoAvailability() {
        return cy.get('app-error-mat-card.ng-star-inserted > #wrench-error > div.ng-star-inserted').eq(1).should('have.text', Cypress.env('noAvailabilityMsg'));
    }

    earlierAppointmentCheckbox() {
        return cy.get('[data-cy=earlier_appointment_button]').should('be.visible');
    }

    timeDropDown() {
        return cy.get('#timePicker').should('be.visible');
    }

    timeSelectOption() {
        cy.get('#timePicker-panel').find('>mat-option:nth-child(2)').scrollIntoView().should('be.visible').click().then((matoption) => {
            const titleText = matoption.text();
            cy.log(titleText);
        });
    }

    scheduleHeader() {
        return cy.get('.title-header').should('be.visible').contains('Schedule');

    }
    silverrockScheduleheader() {
        return cy.get('[data-cy=Schedule_mechanic]').should('be.visible').contains('Schedule');

    }

    scheduleContains() {
        return cy.get('.text-center > span').should('be.visible').contains('We may need to reach out to you if a part for your car is unavailable');
    }

    scheduleTime() {
        return cy.get('.mat-select-arrow').should('be.visible');
    }

    scheduleTitle() {
        return cy.get('.marketing-secondary-blurb-title').should('be.visible').contains('No more waiting rooms');
    }

    scheduleMessage() {
        return cy.get('.marketing-secondary-blurb-message').should('be.visible').contains('Finally auto repair that works around YOUR schedule');
    }
    scheduleDayOfterTomorrow() {
        var date = new Date();
        // month start from 0
        var thisMonth = date.getMonth() + 1;
        // setting date for next 2 days
        date.setDate(date.getDate() + 4);
        var Tomorrow = date.getDate();
        var nextMonth = date.getMonth() + 1;
        cy.get("input[id='datePicker']").click();
        if (thisMonth != nextMonth) {
            cy.get("button[aria-label='Next month']").click();

        }
        cy.get("div[class='mat-calendar-body-cell-content mat-focus-indicator']").each(($ele, index, list) => {
            var date = $ele.text();
            if (parseInt(date) == Tomorrow) {
                cy.wrap($ele).click()
            }
        })
        // Not selecting Any time 
        // cy.get("mat-select[role='combobox']").click();
        // cy.get("span[class*='mat-option-text']").eq(12).click();

    }
    
    preferredMechanicDropdown() {
        return cy.get('.mat-select-placeholder').should('be.visible');
    }

    selectPreferredMechanic(mech) {
        cy.contains(mech).click();
    }

}
