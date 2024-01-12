export class ManageTechPage {

    manageTechNavigator() {
        return cy.get('[href="'+ Cypress.config('baseUrl') +'/technician"]');
    }

    navigateToManageTech() {
        cy.intercept('/admin/getmarkets').as('getMarkets');
        cy.visit('/ng/technician');
    }

    marketDropdown() {
        return cy.getDataCy('marketDropdown');
    }

    statusDropdown() {
        return cy.getDataCy('statusDropdown');
    }

    resetButton() {
        return cy.getDataCy('resetButton');
    }

    searchButton() {
        return cy.getDataCy('searchButton');
    }

    thisOption(option) {
        return cy.get('.mat-option-text').contains(option);
    }

    employmentStatus() {
        return cy.getDataCy('status');
    }

    selectedMarket() {
        return cy.get('[ng-reflect-value="SEA"]');
    }

    firstName() {
        return cy.getDataCy('firstName');
    }

    lastName() {
        return cy.getDataCy('lastName');
    }

    email() {
        return cy.getDataCy('email');
    }

    profileUrl() {
        return cy.getDataCy('profileUrl');
    }

    updateButton() {
        return cy.getDataCy('updateButton');
    }

    techAddress() {
        return cy.getDataCy('address');
    }

    techPhone() {
        return cy.getDataCy('phoneNumber').first();
    }

    techCity() {
        return cy.getDataCy('city');
    }

    techStateDropdown() {
        return cy.getDataCy('state');
    }

    techZipCode() {
        return cy.getDataCy('zip');
    }

    blocklistTab() {
        return cy.get('[ng-reflect-router-link="blocklist"]');
    }

    firstHousehold() {
        return cy.get('tbody > :nth-child(1) > .cdk-column-organizationName');
    }

    removeButton() {
        return cy.getDataCy('removeButton');
    }

    availabilityTab() {
        return cy.get('[ng-reflect-router-link="availability"]');
    }

    partsTab() {
        return cy.get('[ng-reflect-router-link="parts"]');
    }

    skillsAndToolsTab() {
        return cy.get('[ng-reflect-router-link="skills_tools"]');
    }

    addButton() {
        return cy.getDataCy('addButton');
    }

    preference() {
        return cy.getDataCy('preference');
    }

    vendor() {
        return cy.get('[ng-reflect-name="vendorId"]');
    }

    vendorLocation() {
        return cy.getDataCy('vendorLocation');
    }

    addSkillsButton() {
        return cy.getDataCy('addSkillsButton');
    }

    skillSetDropdown() {
        return cy.getDataCy('skillSetId');
    }

    checkBoxes() {
        return cy.get('[class="mat-checkbox-layout"]');
    }

    addUpdateButton() {
        return cy.getDataCy('addUpdateButton');
    }

    editButton() {
        return cy.getDataCy('editButton');
    }

    deleteButton() {
        return cy.getDataCy('deleteButton');
    }

    addToolsButton() {
        return cy.getDataCy('addToolsButton');
    }

    toolDropdown() {
        return cy.getDataCy('toolSetId');
    }

    serialNumber() {
        return cy.getDataCy('serialNumber');
    }

    description() {
        return cy.getDataCy('description');
    }

    firstToolEditButton() {
        return cy.get('app-provider-tools [data-cy="editButton"]').first();
    }

    firstToolDeleteButton() {
        return cy.get('app-provider-tools [data-cy="deleteButton"]').first();
    }

    startDate() {
        return cy.getDataCy('startDate');
    }

    endDate() {
        return cy.getDataCy('endDate');
    }

    daysDropdown() {
        return cy.getDataCy('daysDropdown');
    }

    startTimeDropdown() {
        return cy.getDataCy('startTimeDropdown');
    }

    endTimeDropdown() {
        return cy.getDataCy('endTimeDropdown');
    }

    thirdShiftToggle() {
        return cy.getDataCy('thirdShiftToggle');
    }

    serviceAreaDropdown() {
        return cy.getDataCy('serviceAreaDropdown');
    }

    providerPoolDropdown() {
        return cy.getDataCy('providerPoolDropdown');
    }

    addHoursButton() {
        return cy.getDataCy('addHoursButton');
    }

    today() {
        return cy.get('[aria-current="date"]');
    }

    deleteAvailabilityButton() {
        return cy.get('[color="warn"]');
    }

    addAvailabilityBackdrop() {
        return cy.get('.mat-overlay-transparent-backdrop');
    }

    upcomingAvailabilityTab() {
        return cy.get('[role="tab"]').contains('Upcoming Availability');
    }

    selectDay(day) {
        return cy.get('button').contains(day);
    }

    editHomeStoreButton() {
        return cy.getDataCy('editHomeStore');
    }
}