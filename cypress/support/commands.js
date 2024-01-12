// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import {ManageAccountPage} from "../page-objects/admin/manage-account/manage-account-page";

import {properties} from "../configuration/properties";
import {isLubeMobile} from "./utils";

const manageAccountPage = new ManageAccountPage();

let email = properties.wrenchEmail;
let password = properties.wrenchPassword;

if (isLubeMobile()) {
    email = properties.lmEmail;
    password = properties.lmPassword;
}

Cypress.Commands.add('login', () => {
    cy.session([email, password], () => {
        cy.visit('ng/login');
        cy.getDataCy('emailField').type(email);
        cy.getDataCy('passwordField').type(password);
        cy.getDataCy('loginButton').click();
        cy.url().should('include', '/dashboard');
    })
});

Cypress.Commands.add('legacyLogin', () => {
        cy.getDataCy('loginUsername').type(email);
        cy.getDataCy('loginPassword').type(password);
        cy.getDataCy('loginSignIn').click();
        cy.url().should('include', '/home');
});

Cypress.Commands.add('typeNewUserEmail', (element, prefix = 'mjeppesen+') => {
    let email = prefix;
    let randomEmail = '';
    const possibleChars = 'abcdefghijklmnopqrestuvwxyz0123456789';
    for (let i = 0; i < 11; i++) {
        randomEmail += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    email = email + randomEmail + '@wrench.com';

    cy.get(element)
        .type(email);
});

Cypress.Commands.add('minWait', () => {
    cy.wait(1000);
});

Cypress.Commands.add('avgWait', () => {
    cy.wait(3000);
});

Cypress.Commands.add('maxWait', () => {
    cy.wait(5000);
});

Cypress.Commands.add('getDataCy', (tag) => {
    cy.get('[data-cy="' + tag + '"]');
});

Cypress.Commands.add('windowHandle', (locator) => {
    cy.window().then((win) => {
        cy.stub(win, 'open', url => {
            win.location.href = url;
        }).as("newWindow");
    })
    cy.get(locator).click();
    cy.get("@newWindow").should('be.called');
});

Cypress.Commands.add('jsAdminWindowHandle', (locator) => {
    cy.window().then((win) => {
        cy.stub(win, 'open', url => {
            win.location.href = Cypress.env('jsAdminBaseUrl') + url;
        }).as("newWindow");
    })
    cy.get(locator).click();
    cy.get("@newWindow").should('be.called');
});

Cypress.Commands.add('webappWindowHandle', (locator) => {
    cy.window().then((win) => {
        cy.stub(win, 'open', url => {
            win.location.href = Cypress.env('webappBaseUrl') + url;
        }).as("newWindow");
    })
    cy.get(locator).click();
    cy.get("@newWindow").should('be.called');
});

Cypress.Commands.add('deleteAllPendingQuotes', () => {
    cy.get('[data-cy=deletePendingQuote]').each(() => {
        cy.wait(500);
        cy.get('[data-cy=deletePendingQuote]').first().click();
        cy.get('[data-cy=confirmDeletePendingQuote]').should('be.visible').click();
        cy.url().should('include', '/quotes');
    });
});

Cypress.Commands.add('createUserViaApi', (user) => {
        manageAccountPage.createProspectViaApi(user).then(response => {
            manageAccountPage.createUserViaApi(user, response.body.prospectId);
        });
})

Cypress.Commands.add('deleteUserViaSQL', () => {
    let dbName = "wrenchDb";
    let query = "DELETE FROM User WHERE Email LIKE 'kjankurt+kaanTest@wrench.com'";
    if (isLubeMobile()) {
        query = "DELETE FROM User WHERE Email LIKE 'kjankurt+kaanTestLubeMobile@wrench.com'";
        dbName = "lmDb";
    }
    cy.log(query);
    cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
})

Cypress.Commands.add('dropdownHandle', (option) => {
    cy.get('mat-option[role=option]').each(function ($ele, index, list) {
        if ($ele.text() === option) {
            cy.wrap($ele).click();
        }
    })
})

Cypress.Commands.add('iframe', { prevSubject: 'element' }, (iframe) => {
    return new Cypress.Promise((resolve) => {
        iframe.on('load', () => {
            resolve(iframe.contents().find('body'));
        });
    });
});


// commands to try

Cypress.Commands.add('isVisible', {
    prevSubject: true
}, (subject) => {
    const isVisible = (elem) => !!(
        elem.offsetWidth ||
        elem.offsetHeight ||
        elem.getClientRects().length
    )
    expect(isVisible(subject[0])).to.be.true
})

Cypress.Commands.add('fillAddressAutocomplete', (address, city, state, zip) => {
    cy.get('[data-cy=addressAutocomplete]').should('be.visible').click().type(address, { delay: 100 });
    cy.wait(1000)
    cy.get("div[class='pac-item']").first().click();
    //cy.matSelect(state, '[data-cy=locationState]');
    //cy.get('[data-cy=locationZip]').should('be.visible').clear().type(zip);
})

Cypress.Commands.add('throttleTypeInput', (selector, value) => {
    const lastChar = value.substr(value.length - 1, 1);
    value = value.substr(0, value.length - 1);
    cy.get(selector).click().invoke('val', value).type(lastChar);
});

Cypress.Commands.add('getCardNumberIframeBody', () => {
    return cy.getCardNumberIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
});

Cypress.Commands.add('getCardNumberIframeDocument', () => {
    return cy
        .get('iframe[name=braintree-hosted-field-number]')
        .its('0.contentDocument').should('exist');
});

Cypress.Commands.add('getExpiryMonthIframeBody', () => {
    return cy.getExpiryMonthIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
});

Cypress.Commands.add('getExpiryMonthIframeDocument', () => {
    return cy
        .get('iframe[name=braintree-hosted-field-expirationMonth]')
        .its('0.contentDocument').should('exist');
});

Cypress.Commands.add('getExpiryYearIframeBody', () => {
    return cy.getExpiryYearIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
});

Cypress.Commands.add('getZipCodeIframeBody', () => {
    return cy.getZipCodeIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
});

Cypress.Commands.add('getZipCodeIframeDocument', () => {
    return cy
        .get('iframe[name=braintree-hosted-field-postalCode]')
        .its('0.contentDocument').should('exist');
});

Cypress.Commands.add('getExpiryYearIframeDocument', () => {
    return cy
        .get('iframe[name=braintree-hosted-field-expirationYear]')
        .its('0.contentDocument').should('exist');
});

Cypress.Commands.add('getExpiryYearIframeBody', () => {
    return cy.getExpiryYearIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
});
Cypress.Commands.add('getCVVIframeBody', () => {
    return cy.getCVVIframeDocument()
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
});
Cypress.Commands.add('getCVVIframeDocument', () => {
    return cy
        .get('iframe[name=braintree-hosted-field-cvv]')
        .its('0.contentDocument').should('exist');
});

Cypress.Commands.add('matSelect', (selection, dataCy) => {
    cy.get(dataCy).click();
    // note how to select from material dropdown
    cy.get('.mat-option').contains(selection).then(option => {
        // Confirm have correct option
        cy.wrap(option).contains(selection);
        option[0].click({ force: true });
        // After click, mdc-select should hold the text of the selected option
        cy.get(dataCy).contains(selection);
    });
});

Cypress.Commands.add('deleteAllPendingJobs', () => {
    cy.wait(2000);
    cy.get('.mat-expansion-panel').each(() => {
        cy.wait(1000);
        cy.get('[data-cy=pendingCancel]', { timeout: 10000 }).should('be.visible').should('contain', 'Cancel appointment').click();
        // cy.get('.mat-select-placeholder').should('be.visible').select('Weather');
        cy.get('.mat-select-arrow').should('be.visible').click();
        cy.contains('Weather').should('be.visible').click();
        cy.get('[data-cy=cancelAppointment]').should('be.visible').should('contain', 'Confirm').click({ force: true });
        cy.url().should('include', '/appointments');
    });
});
