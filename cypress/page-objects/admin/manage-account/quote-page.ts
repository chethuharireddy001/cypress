export class QuotePage {

    quotesPage() {
        return cy.getDataCy('Quotes').should('be.visible');
    }

    addQuote() {
        return ('[data-cy="addButton"]');
    }
}