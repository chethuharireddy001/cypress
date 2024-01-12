/// <reference types="cypress" />

/* implemented via https://github.com/cypress-io/cypress-example-todomvc#cypress-intellisense
 * extra: https://docs.cypress.io/guides/tooling/intelligent-code-completion.html#Writing-Tests
 *
 * removes linting errors within the tests for our defined commands
 *
 * Every new test will require a type to be defined within this file
 */

declare namespace Cypress {
    interface Chainable<Subject> {
        login(email?: any, password?: any): Chainable<any>;

        legacyLogin(email?: any, password?: any): Chainable<any>;

        minWait(): Chainable<any>;

        avgWait(): Chainable<any>;

        maxWait(): Chainable<any>;

        windowHandle(locator: any): Chainable<any>;

        jsAdminWindowHandle(locator: any): Chainable<any>;

        webappWindowHandle(locator: any): Chainable<any>;

        getDataCy(tag?: any): Chainable<any>;

        windowHandle(locator?: any): Chainable<any>;

        createUserViaApi(user: any): Chainable<any>;

        deleteUserViaSQL(): Chainable<any>;

        dropdownHandle(option?: any): Chainable<any>;

        iframe(): Chainable<any>;

        isVisible(subject: any): Chainable<any>;

        throttleTypeInput(selector: string, value: string): Chainable<void>;

        getCardNumberIframeBody(): Chainable<any>;

        getExpiryMonthIframeBody(): Chainable<any>;

        typeNewUserEmail(element: any, prefix?: any): Chainable<any>;

        getCVVIframeBody(): Chainable<any>;

        fillAddressAutocomplete(address: string, city: string, state: string, zip: string): Chainable<any>;

        deleteAllPendingQuotes(): Chainable<any>;

        getZipCodeIframeDocument(): Chainable<any>;

        getExpiryYearIframeBody(): Chainable<any>;

        getZipCodeIframeBody(): Chainable<any>;

        deleteAllPendingJobs(): Chainable<any>;

        iframe(): Chainable<any>;

        matSelect(selection: any, dataCy: any): Chainable<any>;
    }
}