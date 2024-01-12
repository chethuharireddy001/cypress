export class AddOnsPage {

    verifyAddOnsPage() {
        return cy.url().should('include', '/book#add_ons');
    }

    verifyAddsOnnPage() {
        return cy.url().should('include', 'newuser#add_ons');
    }

    noThanksAddonButton() {
        return cy.get('[data-cy=addOnsNoThanks]').should('be.visible');
    }

    addonsbackbutton() {
        return cy.get('[data-cy=add_onsBack]').should('be.visible');
    }

    addOnNextButton() {
        return cy.get('[data-cy=add_onsNext]').should('be.visible');
    }

    addonHash() {
        return cy.hash().should('eq', '#addOns');
    }

    addOnClick() {
        return cy.get('[data-cy="Tire Rotation - Add On"]').should('be.visible');
    }

    addOnsBundleSave() {
        return cy.get(':nth-child(1) > .row > .col-xs-9 > [data-cy=cart_add_ons_checkbox]').should('be.visible');
    }


}