import {BasePage} from "../base-page";
import {LocationPage} from "./location-page";

const basePage = new BasePage();
const locationPage = new LocationPage();

export class OrgLocationPage {

    orgLocationTab() {
        return cy.getDataCy('Locations').should('be.visible');
    }

    fillAddLocation(location) {
        cy.getDataCy('hubDropDown').click();
        basePage.firstOption().click();
        locationPage.fillAddLocationPopUp(location);
    }

    findLocation(location) {
        return cy.get('[role="cell"]').contains(location).should('be.visible');
    }

    findLocationTab() {
        return cy.getDataCy('findLocationTab').should('be.visible');
    }

    dontFillAddLocation(){
        cy.getDataCy('address').click();
        cy.getDataCy('city').click();
        cy.getDataCy('zip').click();
        this.findLocationTab().click();
        cy.getDataCy('addressErrorMessage').should('be.visible');
        cy.getDataCy('cityErrorMessage').should('be.visible');
        cy.getDataCy('zipErrorMessage').should('be.visible');
    }

    removeLocation(){
        return cy.getDataCy('removeLocation').should('be.visible');
    }

    markAsValid(){
        return cy.getDataCy('markAsValid').should('be.visible');
    }

    hubDropdown() {
        return cy.getDataCy('hubDropDown');
    }

    hubErrorMessage() {
        return cy.getDataCy('hubErrorMessage');
    }
}