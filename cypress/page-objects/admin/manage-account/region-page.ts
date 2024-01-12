import {properties} from "../../../configuration/properties";

export class RegionPage {

    regionsTab() {
        return cy.getDataCy('Regions').should('be.visible');
    }

    addRegionName() {
        return cy.getDataCy('addRegionName').should('be.visible');
    }

    addRegionNotes() {
        return cy.getDataCy('addRegionNotes').should('be.visible');
    }

    findRegion(regionName) {
        return cy.get('[role="cell"]').contains(regionName).should('be.visible');
    }

    removeRegion() {
        return cy.getDataCy('removeRegion').should('be.visible');
    }
}
