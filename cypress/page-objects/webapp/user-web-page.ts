import {lmUser, properties, wrenchUser} from "../../configuration/properties";
import {isLubeMobile} from "../../support/utils";

let user = wrenchUser;
let webapp = Cypress.env('wrenchWebAppUrl');
if (isLubeMobile()) {
    user = lmUser;
    webapp = Cypress.env('lmWebAppUrl');
}

export class UserWebPage {

    visitWebAppLogin() {
        cy.visit(webapp + 'login#email', {timeout: 50000});
    }

    logIntoWebApp() {
        cy.get('[id="username"]').type(user.email);
        cy.getDataCy('submitEmailButton').click();
        cy.get('[id="password"]').type(properties.password);
        cy.getDataCy('submitLoginButton').click();
    }

    navigateToQuotes() {
        if (!isLubeMobile()) cy.get('[href="/quotes"]').first().click();
        else {
            cy.url().should('include','appointments');
            cy.get('.material-icons').click();
            cy.get('button').contains('Quotes').click();
        }
    }

    scheduleAppointmentButton() {
        return cy.get('button').contains('Schedule appointment');
    }

    locationNotes() {
        return cy.getDataCy('locationNotes');
    }

    keyHandoffDetails() {
        return cy.getDataCy('locationKeyDetails');
    }

    nextButton() {
        return cy.getDataCy('nextButton');
    }

    datePicker() {
        return cy.get('[aria-label="Open calendar"]');
    }

    tomorrow() {
        return cy.get('[aria-selected="false"]:not([aria-disabled="true"])').first();
    }

    toast() {
        return cy.get('.mat-snack-bar-container');
    }
}