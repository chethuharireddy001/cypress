import { isLubemobile } from "../../support/utils";
export class FleetPage {

    navigateToFleetPageAndVerify() {
        cy.visit("/fleet");
        cy.url().should("include", "/fleet");
    }

    verifyBookFleetPage() {
        cy.url().should('include', '/book/fleet');
    }

    navigateToFleetQuotesPageAndVerify() {
        cy.visit("/fleet/quotes").url().should("include", "/fleet/quotes");
    }

    scheduleServiceButton() {
        return cy.get(".header-button").should("be.visible");
    }

    navigateTOfleetAppointmentspageandVerify() {
        cy.visit("/fleet/appointments");
        cy.url().should("include", "/appointments");
    }

    firstQuote() {
        return cy
            .get(".mat-row > .cdk-column-id > :nth-child(1)")
            .should("be.visible");
    }

    navigateToFleetEmployeesPageAndVerify() {
        return cy.visit("/fleetuser/employees");
    }

    scheduleServicesNavigationButton() {
        return cy.get("[data-cy=scheduleServices]").should("be.visible");
    }

    verifyFleetEmployeesPage() {
        return cy.url().should("include", "/fleetuser/employees");
    }

    pageBusy() {
        return cy.get("[data-cy=pageBusy]").should("not.be.visible");
    }

    fleetEmployeeRemoveButton() {
        return cy.get("body").then(($body) => {
            if ($body.find('tr span:contains("Cypress Minion")').length) {
                cy.get('tr span:contains("Cypress Minion")')
                    .each((row) => {
                        row.parents("tr").find("mat-checkbox label").click();
                    })
                    .then(() => {
                        cy.get("[data-cy=fleetEmployeeRemoveButton]").click();
                    });
            }
        });
    }


    closePaymentMethod() {
        return cy.get(`[data-cy="closePaymentMethod"]`).should("be.visible");
    }

    fleetEmployeeAddButton() {
        return cy.get("[data-cy=fleetEmployeeAddButton]").should("be.visible").click({ force: true });
    }

    fleetEmployeeAddModalHeader() {
        return cy.get("[data-cy=fleetEmployeeAddModal").find(".wrench-header-5").should("be.visible").should("contain", "Add Employee");
    }

    fleetEmployeeAddName() {
        return cy.get('[data-cy="fleetEmployeeAddName"]').should("be.visible");
    }

    fleetEmployeeAddZip() {
        return cy.get('[data-cy="fleetEmployeeAddZip"]').should("be.visible");
    }

    fleetEmployeeAddZipType() {
        return cy.get('[data-cy="fleetEmployeeAddZip"]').should("be.visible");
    }

    fleetEmployeeAddPhone() {
        return cy.get('[data-cy="fleetEmployeeAddPhone"]').should("be.visible");
    }

    fleetEmployeeAddPhoneType() {
        return cy.get('[data-cy="fleetEmployeeAddPhone"]').should("be.visible");
    }

    fleetEmployeeAddEmail() {
        return cy.get('[data-cy="fleetEmployeeAddEmail"]').should("be.visible");
    }

    fleetEmployeeAddEmailType() {
        return cy.get('[data-cy="fleetEmployeeAddEmail"]').should("be.visible");
    }

    fleetEmployeeAddSave() {
        return cy.get('[data-cy="fleetEmployeeAddSave"]').should("be.visible");
    }


    appPaymentMethod() {
        return cy
            .get("app-payment-method-modal mat-dialog-content")
            .should("be.visible");
    }

    addPaymentMethod() {
        return cy.get('[data-cy="addPaymentMethod"]').should("be.visible");
    }


    addEmployeeEmailElement() {
        return cy.get("[data-cy=fleetEmployeeAddEmail]").should("be.visible");
    }

    addEmployeeBtn() {
        return cy.get("[data-cy=fleetEmployeeAddSave]").should("be.visible");
    }
    assignVehicleToDefaultHub(Region,Hub) {
        this.regionDropDown().click();
        this.selectYourRegion(Region).click();
        this.hubDropDown().click();
        this.selectYourHub(Hub).click();
    }

    fleetAddVeiclePopUp() {
        return cy.get("[data-cy=fleetEmployeeAddModal]").should("be.visible");
    }

    fleetEmployeeEmailList() {
        return cy.get('[data-cy-minionemaillabel^="10000"]').should("be.visible");
    }

    fleetSelectVehiclePage() {
        return cy.get('.quote-header-1').should('be.visible');
    }
    refreshVehiclePage(){
        cy.get('.mat-tab-label-content').should('be.visible').contains('Employees').click();
        cy.get('.mat-tab-label-content').should('be.visible').contains('Vehicles').click();
    }

    // fleetvehiclepage//----

    lastAddedVehicleChkBox() {
        cy.avgWait();
        return cy.get('[data-cy="vehicleCheckbox"]').first();
    }

    checkBulkQuoteRequestButtonState() {
        return cy.get('button[data-cy=bulkQuoteRequest]');
    }

    clickOnFleetMinionAllVehiclesCheckBox() {
        cy.get('#mat-checkbox-5').should('be.visible').click();
    }

    clickPricingCheckBox() {
        cy.get('#mat-checkbox-10').should('be.visible').click();
    }

    addVehicle() {
        return cy.get('[data-cy=addVehicle]').should('be.visible');
    }

    footerNextButton() {
        return cy.get('[data-cy=modalFooterNextButton]').should('be.visible');
    }

    minionMileage() {
        return cy.get('[data-cy=minionMileage]').should('be.visible');
    }

    mileageAdded() {
        return cy.get('h3').contains('The mileage added is over 300,000 miles.').should('be.visible');
    }

    buttonNo() {
        return cy.get('button').contains('No').should('be.visible');
    }

    buttonYes() {
        return cy.get('button').contains('Yes').should('be.visible');
    }

    addhVehicle() {
        return cy.get('h2').should('be.visible').contains('Add Vehicle');
    }

    vehicleLicense() {
        return cy.get('#license').should('be.visible');
    }

    assignVehicle() {
        return cy.get('[data-cy=assignVehicle]').should('be.visible');
    }

    assignVehicleToHub() {
        cy.get('h1').contains('Move Vehicles to Hub').should('be.visible');
    }

    assignVehicleToDefferenttHub(Region, hub) {
        this.regionDropDown().click();
        this.selectYourRegion(Region).click();
        this.hubDropDown().click();
        this.selectYourHub(hub).click();
    }

    assignVehicleToNorthMain() {
        this.regionDropDown().click();
        this.selectYourRegion('North').click();
        this.hubDropDown().click();
        this.selectYourHub('North Main').click();
    }

    verifyVehicleAddedSuccefullyMessage() {
        return cy.get('.mat-snack-bar-container').should('contain.text', Cypress.env("vehicleAddedMessage"));
    }


    assignButton() {
        return cy.get('[data-cy=assignButton]').should('be.visible');
    }

    fleetsPageAddVehicleVINBtn() {
        return cy.get('.toggle-group > :nth-child(2)').should('be.visible');
    }

    vehicleVINTxtField(vehicleVin) {
        return cy.get('#VIN').should('be.visible');
    }

        selectMinion() {
        return cy.get('#id-minion').should('be.visible');
    }

    clickUser() {
        return cy.get('.mat-option-text').contains('Multiple Locations');
    }

    selectUser() {
        return cy.get('.mat-option-text').contains('Michael Jeppesen');
    }

    selectDriver() {
        return cy.get('.mat-option-text').contains('DriverRole One');
    }

    selectDriverUser() {
        return cy.get('.mat-option-text').contains('DriverOne Automation');
    }

    selectCompanyUser() {
        return cy.get('.mat-option-text').contains('CompanyHead head');
    }

    selectCompanyAutomationUser() {
        return cy.get('.mat-option-text').contains('CompanyHead Automation');
    }

    selectMasterUser() {
        return cy.get('.mat-option-text').contains('Fleet Master');
    }

    selectRegion() {
        return cy.get('.mat-option-text').contains('Region 01');
    }
    selectYourRegion(Region) {
        return cy.get('.mat-option-text').contains(Region);
    }

    selectHub() {
        return cy.get('.mat-option-text').contains('hub one');
    }
    selectYourHub(Hub) {
        return cy.get('.mat-option-text').contains(Hub);
    }

    selectMinionUser() {
        return cy.get('.mat-option-text').contains('Fleet Minion One');
    }

    selectAllCheckBox() {
        return cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').should('be.visible');
    }

    removeVehicleButton() {
        return cy.get('.quote-flow-navigation.hidden-sm > :nth-child(1) > .mat-focus-indicator').should('be.visible');
    }

    removeConfirmVehicleButton() {
        cy.get('.white-header-1').should('be.visible');
        cy.minWait();
        return cy.get('[data-cy=removeVehicles]').should('be.visible');
    }
    removeVehicleConfirmMessage() {
        return cy.contains('One or more vehicles has been removed successfully.').should('be.visible');
    }

    backButton() {
        return cy.get('.mat-modal > :nth-child(2) > .mat-focus-indicator').should('be.visible');
    }

    yearMakeModelSelect() {
        if (isLubemobile()) {
            cy.get('.toggler').eq(1).click();
            cy.get('[data-cy=yearSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('2022').click();
            cy.get('[data-cy=makeSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('AUDI').scrollIntoView().click();
            cy.avgWait();
            cy.get('[data-cy=modelSelect]').eq(0).click({ force: true });
            cy.get('.mat-option-text').contains('A6').click({ force: true });
            cy.get('[data-cy="fyelTypeSelect"]').eq(0).click();
            cy.get('.mat-option-text').contains('Petrol').click();
            cy.get('[data-cy="drivetrainSelect"]').eq(0).click();
            cy.get('.mat-option-text').contains('Front Wheel Drive').click();
            cy.get('[data-cy=trimSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('2.0L 4CYL FWD TURBO PETROL DIRECT C8 4A 40 TFSI DKY DOHC 16V(20-22)').click();
            cy.get('[data-cy="transmissionSelect"]').eq(0).click();
            cy.get('.mat-option-text').contains('Automatic').click();
            // cy.get('[data-cy="engineSelect"]').eq(0).click();
            // cy.get('.mat-option-text').contains('2.0L I4 1984cc 0 16V SUPERCHARGED PETROL').click();
        } else {
            cy.get('.toggler').eq(1).click();
            cy.get('[data-cy=yearSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('2015').click();
            cy.get('[data-cy=makeSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('Audi').click();
            cy.avgWait();
            cy.get('[data-cy=modelSelect]').eq(0).click({ force: true });
            cy.get('.mat-option-text').contains('A4').click({ force: true });
            cy.get('[data-cy=trimSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('Premium').click();
            cy.get('[data-cy=engineSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('2.0L L4 1984cc CAED DOHC 16V Turbocharged GAS FI 220HP').click();
            cy.get('[data-cy=transmissionSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('Automatic').click();
            cy.get('[data-cy=drivetrainSelect]').eq(0).click();
            cy.get('.mat-option-text').contains('Rear Wheel Drive').click();
        }
    
    }
    regionDropDown() {
        return cy.get('[data-cy="regionDropDown"]').should("be.visible");
    }
    checkbox(){
        return  cy.get('.mat-checkbox-inner-container').should("be.visible");
    }

    searchBox(){
        return cy.get('#searchTerm').should("be.visible");
    }
    
    hubDropDown() {
        return cy.get('[data-cy="hubDropDown"]').should("be.visible");
    }

    fleetEmployeeCheckbox() {
        return cy.get('[data-cy-checkminion^="10000"]').should("be.visible");
    }

    AddRemoveEmployees(text) {
        cy.contains(text).invoke("attr", "data-cy-minionemaillabel").then((val) => {
            cy.get(`[data-cy-editminion='${val}']`).should("be.visible").click();
            cy.get(`[data-cy-minionrow='${val}'] > :nth-child(4)`).should("be.visible").click().focused().clear().wait(2000).type("2014222730");
            cy.get(`[data-cy-saveminion='${val}']`).should("be.visible").click();
            cy.get(`[data-cy-editminion='${val}']`).should("be.visible").click();
            cy.get(`[data-cy-minionrow='${val}'] > :nth-child(4`).click().focused().invoke("val").should("eq", "2014222730");
            cy.get(`[data-cy-saveminion='${val}']`).should("be.visible").click();
            //remove employee
            cy.wait(2000);
            //wait for table to load
            cy.get(`[data-cy-checkminion='${val}']`).should("be.visible").click();
            cy.get('[data-cy="fleetEmployeeRemoveButton"]').should("be.visible").click();
            cy.get(`[data-cy-minionemaillabel='${val}']`).should("not.exist");
        });
    }

    setDefaultPayment() {
        cy.get('[data-cy-setdefaultpaymentmethod^="1"]').invoke("attr", "data-cy-setdefaultpaymentmethod").then((val1) => {
            return val1;
        });
    }

    validateDefault() {
        var val1 = this.setDefaultPayment();
        cy.get(`[data-cy-setdefaultpaymentmethod='${val1}']`).should("not.exist");
    }

    selectRegionDropdown() {
        return cy.get('#id-region ').should("be.visible");
    }

    selectHubDropdown() {
        return cy.get('#id-hub ').should("be.visible");
    }

    deletePaymentMethod() {
        cy.wait(2000);
        //Script to remove delete payment
        cy.get('[data-cy-setdefaultpaymentmethod^="1"]')
            .invoke("attr", "data-cy-setdefaultpaymentmethod")
            .then((val2) => {
                cy.get(`[data-cy-removepaymentmethod='${val2}']`).should("be.visible").click();
                cy.get(`[data-cy-removepaymentmethod='${val2}']`).should("not.exist");
            });
    }

    closePaymentBtn() {
        return cy.get('[data-cy=closePaymentMethod]').should('be.visible');
    }

    removeEmployee(text) {
        cy.contains(text).invoke('attr', 'data-cy-minionemaillabel').then((val) => {
            cy.get(`[data-cy-checkminion='${val}']`).should('be.visible').click();
            cy.get(`[data-cy=fleetEmployeeRemoveButton]`).should('be.visible').click();
            cy.get(`[data-cy-minionemaillabel='${val}']`).should('not.exist');
        });
    }

    selectRow(text) {
        cy.contains(text).invoke("attr", "data-cy-minionemaillabel").then((val) => {
            cy.get(`[data-cy-checkminion='${val}']`).should("be.visible").click({ force: true });
        });
    }

    addEmployeeModalVisible() {
        return cy.get('[data-cy=fleetEmployeeAddModal]').should('be.visible');
    }

    addEmployeeFirstName() {
        return cy.get('[data-cy="fleetEmployeeAddFirstName"]').should("be.visible");
    }
    addEmployeeLastName() {
        return cy.get('[data-cy="fleetEmployeeAddLastName"]').should("be.visible");
    }
    addEmployeePhone() {
        return cy.get('.mat-form-field-infix > [data-cy="phoneNumber"]').should("be.visible");
    }

    paymentPopUpVisible() {
        return cy.get('[data-cy=managePaymentHeader]').should('be.visible');
    }

    selectRequestService() {
        return cy.contains('Request Service').should('be.visible');
    }

    selectUsers() {
        return cy.contains('Employees').should('be.visible');
    }

    removeLastAddedEmp() {
        cy.get('[class="mat-checkbox-layout"]').eq(1).click();
        cy.get('[data-cy="fleetEmployeeRemoveButton"]').click();
    }

    addVehiclePop() {
        return cy.get('[data-cy="ModalButton"]').should('be.visible');
    }
    regionDropdown() {
        return cy.get('#mat-select-value-17 > .mat-select-placeholder').should("be.visible");
    }
    hubDropdown() {
        return cy.get('#mat-select-value-19 > .mat-select-placeholder').should("be.visible");
    }
    verifyVehiicle(vehicle){
       return cy.get('tr.ng-star-inserted').contains(vehicle);
    }

}
