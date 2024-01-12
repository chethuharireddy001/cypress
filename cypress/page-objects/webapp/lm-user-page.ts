export class LmUserPage {

   loginNormalUserLm(username, password) {
      cy.visit('/login')
      cy.url().should('include', '/login');
      cy.get(".mat-form-field").contains('Email');
      cy.get('#username').should('be.visible').click().type(username);
      cy.get('[data-cy=submitEmailButton]').click();
      cy.get(".mat-form-field").contains('Password');
      cy.get('#password').should('be.visible').click().type(password);
      cy.get('[data-cy=submitLoginButton]').should('be.visible').should('be.enabled').click();
   }

   lmMenu() {
      return cy.get('app-fab-nav.ng-star-inserted > .mat-focus-indicator').should('be.visible').click();

   }

   menuRequestService() {
       return cy.get('.mat-menu-content').contains('Request Service').should('be.visible');
   }

   vehicleDropdown() {
      return cy.get('[data-cy=vehicleSelectorDropDownBtn]').should('be.visible');
   }

   addVehicleBtnFromDropdown() {
     return cy.get('.mat-option-text').contains('Add Vehicle').should('be.visible')
   }

   stateDropdownBtn() {
      return cy.get('[data-cy="state"] ').should('be.visible')
   }

   stateSelection(state) {
      return cy.get('.mat-option-text').contains(state).should('be.visible');
   }

   locationNextBtn() {
      return cy.get('[data-cy=locationNext]').should('be.visible');
   }
   profileButton(){
      return cy.get('.mat-menu-content').contains('Your Profile').should('be.visible')
   }

}