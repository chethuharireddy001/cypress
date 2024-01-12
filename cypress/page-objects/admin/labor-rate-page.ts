import {isLubeMobile} from "../../support/utils";
import {properties} from "../../configuration/properties";

export class LaborRatePage{

    navigateToLaborRate() {
        cy.visit('ng/labor-rate');
    }

    addLaborRateButton() {
        return cy.get('button').contains('Add Labor Rate');
    }

    laborRateTab() {
        return cy.getDataCy('laborRate');
    }

    addLaborRate() {
        cy.getDataCy('laborRateButton').click();
    }

    userIdTab() {
        return cy.getDataCy('userId');
    }

    laborRateError() {
        cy.getDataCy('laboRateError').should('be.visible');
    }

    deleteLaborRateButton() {
        return cy.get('button').contains('Delete');
    }

    firstRowLaborRateCell() {
        return cy.get('[role="cell"]').first();
    }

    userIdCell() {
        return cy.get('tbody > :nth-child(1) > .cdk-column-userId');
    }

    addButton() {
        return cy.getDataCy('laborRateButton');
    }

    commonLaborRateFlow() {
        let city = properties.laborMarket;
        if (isLubeMobile()) city = properties.lmLaborMarket;
        cy.get('[name="market"]').click();
        cy.get('[role="option"]').contains(city).click();
        cy.get('[name="startYear"]').click();
        cy.get('[role="option"]').contains('2019').click();
        cy.get('[name="endYear"]').click();
        cy.get('[role="option"]').contains('2022').click();
        cy.get('[name="make"]').click();
        cy.get('[role="option"]').contains('Audi', {matchCase: false}).click();
        cy.get('[name="vehicleType"]').click();
        cy.get('[role="option"]').contains('SUV').click();
    }

    filterTab() {
        return cy.get('[data-placeholder="Filter results"]');
    }

    marketCell() {
        return cy.get('tbody > :nth-child(1) > .cdk-column-market');
    }

    interceptFindLaborRates() {
        cy.intercept('/admin/findlaborrates').as('findLaborRates');
    }

}