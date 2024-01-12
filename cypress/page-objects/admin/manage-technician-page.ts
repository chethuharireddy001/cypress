import { ok } from "assert"

export class ManageTechnicianPage {

    manageTechnician() {
        cy.visit('/#/find_mechanic')
        cy.url().should('include','/find_mechanic')
    }
    
    selectOnSearch() {
        return cy.get("[type='search']").should('be.visible')
    }
    
    verifyFindTechnician() {
        return cy.get("[class='sorting_1']").should('have.length.least', 1)
    }
    
    verifyFindTechnicianNoResults() {
        return cy.get("[class='dataTables_empty'][.='No matching records found']").should('be.visible')
    }

    selectEndDate() {
        return cy.get("[id='mat-input-2']").scrollIntoView().should('be.visible')
    }

    choseMonth() {
        return cy.get("[aria-label='Next month']").should('be.visible')
    }

    selectOnDays() {
        return cy.get("[class='mat-select-placeholder mat-select-min-line ng-tns-c10-4 ng-star-inserted']").should('be.visible')
    }

    validateDays() {
        return cy.get('[class="mat-option-text"]').should('include.text',"day")
    }

    choseDays() {
        return cy.get('[class="mat-option-text"]')
    }

    selectOnMarket() {
        return cy.get("[class='mat-select-placeholder mat-select-min-line ng-tns-c10-6 ng-star-inserted']").should('be.visible')
    }

    selectOnServiceArea() {
        return cy.get("[class='mat-select-placeholder mat-select-min-line ng-tns-c10-8 ng-star-inserted']").should('be.visible')
    }

    selectOnStartTime(){
        return cy.get("[class='mat-select-placeholder mat-select-min-line ng-tns-c10-10 ng-star-inserted']").should('be.visible')
    }

    removeProviderHours() {
        cy.get('#mat-checkbox-2-input').then(($checkbox) => {
           if($checkbox){
               cy.get('#mat-checkbox-2-input').click({force: true})
               cy.get("[class='mat-button-wrapper'][.=' delete ']").click({force: true})
           }
           else{
                assert(ok)
           }
       })  
    }
    
    selectSubmit(){
        return cy.get("[ng-reflect-color='primary']").should('have.text','submit').click({force: true})
    }
    
    verifySubmit(){
        return cy.get('[class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"]').should('have.length.at.least', 1)
    }
}