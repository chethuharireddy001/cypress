import { fleetUsers } from "../../configuration/properties";
export class VehiclePage {

    navigateToGaragePage() {
        cy.visit("/garage");
        return cy.url().should('include', '/garage');
    }
    navigateToBookandSelectVehicle() {
        cy.visit('/book/fleet');
        cy.scrollTo(500, 0);
        cy.get('[data-cy=selectOneVehicle]').first().click();
    }
    verifynewVehiclePage(){
        cy.url().should('include','/book#vehicle');
    }
    
    navigateToBookVehicles() {
        cy.visit('/book/fleet');
       // cy.scrollTo(500, 0);
    }
    selectingSpecificVehicle(vehicle) {
        cy.get('[data-cy=vehicleSelectorDropDownBtn]').type(vehicle);
        cy.get('.mat-option').contains(vehicle).click();

    }
    newVehicleSelector(){
        cy.minWait();
        cy.get('[data-cy=vehicleSelectorDropDownBtn]').should('be.visible').type('Add Vehicle');
        cy.get('.mat-option').contains('Add Vehicle').click();

    }
    
    vehicleVINTxtField(vehicleVin = null) {
        return cy.get('#VIN').should('be.visible');
    }

    vehicleNxtBtn() {
        return cy.get('[data-cy=vehicleNext]').should('be.visible');
    }

    milageTextFill() {
        cy.get('[data-cy=mileage]').should('be.visible').click().type('30000');
        cy.get('[data-cy=vehicleNext]').should('be.visible').click();
        };

    addVehicleNxtButton() {
        return cy.get('[data-cy=modalFooterNextButton]').should('be.visible');
    }

    mileageField() {
        return cy.get('[data-cy=mileage]').should('be.visible').type('30000');
    }

    vehicleBreadCrumb() {
        return cy.get('[data-cy=bread-crumb] > :nth-child(1)').should('be.visible');
    }
    selectOneVehicleSitewide() {
        return cy.get('[data-cy=selectOneVehicle]').should('be.visible');
     }
     vehicleNextButton() {
        cy.get('[data-cy=vehicleNext]').should('be.visible').should('include.text', 'Next').click({ force: true });
    }
    mileageTitle() {
        return cy.get('h2').should('be.visible').contains('Update Mileage');
    }
    updateMilageOneField() {
        return cy.get(':nth-child(1) > .cdk-column-mileage > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > [data-cy=mileage]').should('be.visible').type('3000');
    }
    updateMilageTwoField() {
        return cy.get(':nth-child(2) > .cdk-column-mileage > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > [data-cy=mileage]').should('be.visible').type('4000');
    }

    verifyNewUserVehiclePage() {
        return cy.url().should('include', '/newuser#vehicle');
    }
    navigateToFleetVehiclesPageAndVerify(...args: []) {
        cy.visit('/fleet/vehicles');
        cy.url().should('include', '/fleet/vehicles');
        cy.get('[data-cy="addVehicle"]').should('be.visible');
    }

    verifyFleetVehiclePage() {
        cy.url().should('include', '/fleet/vehicles');
    }

    addVehicleBtn() {
        return cy.get('[data-cy="modalFooterNextButton"]').should('be.visible');
    }

    addVehicleVINBtn() {
        return cy.get('.toggle-group > :nth-child(2)').should('be.visible');
    }

    vehicleVINTextField() {
        return cy.get('#VIN').should('be.visible');
    }

    licenseTxtField() {
        return cy.get('[data-cy=license]').should('be.visible');
    }

    stateSelection() {
        return cy.get('#state').should('be.visible');
    }

    selectStateFromDropDown(state) {
        cy.get('.mat-option').contains(state).then(option => {
            cy.wrap(option).contains(state);
            option[0].click();
            cy.get('#state').contains(state);
        });
    }

    checkForBanner(){
    return  cy.get('#banner').contains('For emergency towing and roadside assistance, call us at').should('be.visible');
    }
    bannerCloseButton() {
        return cy.get('.banner-close-button').should('be.visible');
    }
    closeBannerIfExist() {
        cy.get("body").then($body => {
            if ($body.find('.banner-close-button').length > 0) {
                cy.get('.banner-close-button').should('be.visible').click();
            }
            else{
                assert.isOk("Banner is not prasent");

            }
        });
    }


    clickOnFleetMinionAllVehiclesCheckBox() {
       return cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').should('be.visible')
        //cy.get(':checkbox').first().check({ force: true });
    }

    selectAllVehiclesChkBox() {
        cy.get('[data-cy=selectOneVehicle]').first().click();
    }

    checkBulkQuoteRequestButtonState() {
        return cy.get('[data-cy=bulkQuoteRequest]').should('be.visible');
    }

    selectVehicleFromDropDown(vehicleName) {
        cy.get('[data-cy=vehicleSelector]').type('cypress').wait(100);
        if (vehicleName) {
            cy.get('.mat-option').contains(vehicleName).click();
        } else {
            cy.get('.mat-option').contains('Chevrolet').click();
        }
    }
    verifyVehicleNextButton() {
        return cy.get('[data-cy=vehicleNext]').should('be.visible');
    }

    selectVehicleForCarvanaDropdown(vehicleName) {
        cy.get('[data-cy=vehicleSelectorDropDownBtn]').type('Toyota').wait(100);
        if(vehicleName) {
            cy.get('.mat-option').contains(vehicleName).click();

        }
    }

    deleteVehicleFromGaragePage(){
        return cy.get('[data-cy=Vehicle]').should('be.visible');
    }

    /*****************************************************************************/

    visitVehiclePage() {
        cy.visit("/newuser#vehicle");
        return cy.url().should('include', '/newuser#vehicle');
    }

    completeYourVehicleSpectitleVerification() {
        return cy.get(':nth-child(2) > .col-xs-12 > .title').scrollIntoView().should('be.visible').and('include.text', 'Confirm your vehicle specifications');
        // return cy.get('.row.ng-star-inserted > .col-xs-12 > .title').scrollIntoView().should('be.visible').and('include.text', 'Confirm your vehicle specifications');
        // .row.ng-star-inserted > .col-xs-12 > .title
    }

    completeYourVehicle() {
        return cy.get(':nth-child(3) > .col-xs-12 > .title').scrollIntoView().should('be.visible').and('include.text', 'Confirm your vehicle specifications');
    }

    completeYourVehicleSpectitle() {
        return cy.get(':nth-child(2) > .title').scrollIntoView().should('be.visible').and('include.text', 'Confirm your vehicle specifications');
    }

    togglerSelect() {
        return cy.get('.toggler').eq(1).should('be.visible');
    }

    yearMakeModelSelect() {
        cy.get('[data-cy=yearSelect]').eq(0).click();
        cy.get('.mat-option-text').contains('2015').click();
        cy.get('[data-cy=makeSelect]').eq(0).click();
        cy.get('.mat-option-text').contains('Audi').click();
        cy.wait(2000);
        cy.get('[data-cy=modelSelect]').eq(0).click({ force: true });
        cy.get('.mat-option-text').contains('A4').click({ force: true });
        cy.get('[data-cy=trimSelect]').eq(0).click();
        cy.get('.mat-option-text').contains('Premium').click();
        cy.get('[data-cy=engineSelect]').eq(0).click();
        cy.get('.mat-option-text').contains('2.0L L4 (CAED) Turbocharged GAS FI').click();
        cy.get('[data-cy=transmissionSelect]').eq(0).click();
        cy.get('.mat-option-text').contains('Automatic').click();
        cy.get('[data-cy=drivetrainSelect]').eq(0).click();
        cy.get('.mat-option-text').contains('Rear Wheel Drive').click();
    }

    restartQuoteVehicleselection(){
        cy.get('[data-cy=yearSelect]').eq(0).click();
        cy.get('.mat-option-text').contains(Cypress.env('Year01')).click();
        cy.get('[data-cy=modalFooterNextButton]').should('be.visible').click();
        cy.get('[data-cy=makeSelect]').eq(0).click();
        cy.get('.mat-option-text').contains(Cypress.env('Make01')).click();
        cy.wait(2000);
        cy.get('[data-cy=modelSelect]').should('be.visible').eq(0).click({ force: true });
        cy.get('.mat-option-text').contains(Cypress.env('Model01')).click({ force: true });
        cy.get('[data-cy=trimSelect]').eq(0).click();
        cy.get('.mat-option-text').contains(Cypress.env('Trim01')).click();
        cy.get('[data-cy=engineSelect]').eq(0).click();
        cy.minWait();
        cy.get('.mat-option-text').contains(Cypress.env('Engine01')).click({ force: true });
        cy.get('[data-cy=transmissionSelect]').eq(0).click();
        cy.get('.mat-option-text').contains(Cypress.env('Transmission01')).click();
        cy.get('[data-cy=drivetrainSelect]').eq(0).click();
        cy.get('.mat-option-text').contains(Cypress.env('drive01')).click();
    }

    selectVehicles() {
        return cy.contains('Vehicles').should('be.visible');
    }

    regionHeader() {
        return cy.get(':nth-child(1) > .display-block').should('be.visible').contains('Region');
    }

    hubHeader() {
        return cy.get(':nth-child(2) > .display-block').should('be.visible').contains('Hub');
    }

    vehicleSearchOption() {
        return cy.get('[data-cy=vehicleSearch]').should('be.visible');
    }

    verifyRegionColumn() {
        return cy.get('table >tbody >tr td:nth-child(6)').each(($ele) =>{
        var rowColmun = $ele.text();
            cy.log(rowColmun);
        })
    }

    verifyHubColumn() {
        return cy.get('table >tbody >tr td:nth-child(7)').each(($ele) =>{
        var HubColmun=$ele.text()
        cy.log(HubColmun);
        })
    }

    verifyYearColumn() {
        return cy.get('table >tbody >tr td:nth-child(3)').each(($ele) =>{
        var Year=$ele.text()
        cy.log(Year);
        })
    }

    verifyMakeColumn() {
        return cy.get('table >tbody >tr td:nth-child(4)').each(($ele) =>{
        var Make=$ele.text()
        cy.log(Make);
        })
    }

    verifyModelColumn() {
        return cy.get('table >tbody >tr td:nth-child(5)').each(($ele) =>{
        var Model=$ele.text()
        cy.log(Model);
        })
    }

    // restartQuoteProcess() {
    //     return cy.get('[data-cy=modalFooterNextButton]').should('be.visible').click();
    // }

    verifyVINColumn() {
        return cy.get('table >tbody >tr td:nth-child(8)').each(($ele) =>{
        var vin=$ele.text()
        cy.log(vin);
        })
    }
    vehicleSearch(){
       return cy.get('#searchTerm').should('be.visible').click();
    }

    deleteAddedVehicle() {
        cy.get('#searchTerm').should('be.visible').type('Porsche').click();
        cy.minWait();
        cy.get('[data-cy=vehicleCheckbox] > .mat-checkbox-layout > .mat-checkbox-inner-container').should('be.visible').click();
        cy.get('.quote-flow-navigation.hidden-sm > :nth-child(1)').should('be.visible').click();
        cy.get('[data-cy=removeVehicles]').should('be.visible').click();
        cy.minWait();
       // cy.get('.mat-snack-bar-container').should('contain', '')
    }

    deleteNewlyAddedVehicle(vehicle){
        cy.get('#searchTerm').should('be.visible').type(vehicle).click();
        cy.minWait();
        cy.get('[data-cy=vehicleCheckbox] > .mat-checkbox-layout > .mat-checkbox-inner-container').should('be.visible').click();
        cy.get('.quote-flow-navigation.hidden-sm > :nth-child(1)').should('be.visible').click();
        cy.get('[data-cy=removeVehicles]').should('be.visible').click();
        cy.minWait();
       // cy.get('.mat-snack-
    }



}

