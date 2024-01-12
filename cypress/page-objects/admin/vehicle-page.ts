export class VehiclePage {
    navigateToBookandSelectVehicle() {
        cy.visit('/book/fleet');
        cy.scrollTo(500, 0);
        cy.get('[data-cy=selectOneVehicle]').first().click();
    }
    vehicleNextButton() {
        return cy.get('[data-cy=vehicleNext]').should('be.visible');
    }
    mileageTitle() {
        return cy.get('h2').should('be.visible').contains('Update Mileage');
    }
    updateMilageOneField() {
        return cy.get(':nth-child(1) > .cdk-column-mileage > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > [data-cy=mileage]').should('be.visible').type('3000');
    }
    vehiclePageNavigation() {
        cy.getDataCy('Vehicles').click();
    }

    filterTab(){
        return cy.get('[data-placeholder="Filter results"]').should('be.visible');
    }
}