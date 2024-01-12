import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { FleetPage } from "../../../../../page-objects/webapp/fleet-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { VehiclePage } from "../../../../../page-objects/webapp/vehicle-page";
import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { isLubemobile } from "../../../../../support/utils";
import { getfeatures } from "../../../../../support/features";

const servicesPage = new ServicesPage();
const vehiclePage = new VehiclePage();
const loginPage = new LoginPage();
const fleetPage = new FleetPage();


const vehicle = {
    year: '2015',
    make: 'Audi',
    model: 'A4',
    trim: 'Premium',
    engine: '2.0L L4 1984cc CAED DOHC 16V Turbocharged GAS FI 220HP',
    transmission: 'Automatic',
    drivetrain: 'Rear Wheel Drive',
    mileage: '300000',
    license: 'BCJ4761',
    state: 'WA',
    vin1: '1C4RJFBG5DC522189',
    vin2: '2HGES15252H603204'
};

const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/hub-manager/add-vehicle.cy.ts', () => {

    beforeEach(() => {
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetHubManager, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        vehiclePage.navigateToFleetVehiclesPageAndVerify();
        fleetPage.fleetSelectVehiclePage();
    });

    it('1. add vehicle via make, model, year enter mileage', () => {
        fleetPage.addVehicle().first().click({ force: true });
        fleetPage.fleetSelectVehiclePage();
        fleetPage.yearMakeModelSelect();
        fleetPage.footerNextButton().click();
        fleetPage.regionDropDown().click();
        fleetPage.selectYourRegion(fleet.Region1).click();
        fleetPage.hubDropDown().click();
        fleetPage.selectYourHub(fleet.Region1Hub1).click();
        fleetPage.minionMileage().type(vehicle.mileage);
        fleetPage.footerNextButton().click();
        fleetPage.refreshVehiclePage();
        fleetPage.verifyVehiicle(fleet.Audi);
        cy.avgWait();
        fleetPage.lastAddedVehicleChkBox().click();
        cy.avgWait();
        fleetPage.fleetSelectVehiclePage();
        fleetPage.removeVehicleButton().click({ force: true });
        fleetPage.removeConfirmVehicleButton().click({ force: true });
        fleetPage.removeVehicleConfirmMessage();
    });

    it('2. add vehicle via license, assign to hub and delete', () => {

        fleetPage.addVehicle().first().click({ force: true });
        fleetPage.fleetSelectVehiclePage();
        vehiclePage.licenseTxtField().click().type(fleet.licensePlateNumber);
        vehiclePage.stateSelection().click();
        vehiclePage.selectStateFromDropDown(fleet.state);
        fleetPage.footerNextButton().click();
        cy.maxWait();
        fleetPage.footerNextButton().click();
        fleetPage.regionDropDown().click();
        fleetPage.selectYourRegion(fleet.Region1).click();
        fleetPage.hubDropDown().click();
        fleetPage.selectYourHub(fleet.Region1Hub1).click();
        fleetPage.minionMileage().type(vehicle.mileage);
        fleetPage.footerNextButton().click();
        fleetPage.refreshVehiclePage();
        cy.avgWait();
        fleetPage.lastAddedVehicleChkBox().click();
        cy.avgWait();
        fleetPage.fleetSelectVehiclePage();
        fleetPage.removeVehicleButton().click({ force: true });
        fleetPage.removeConfirmVehicleButton().click({ force: true });
        fleetPage.removeVehicleConfirmMessage();
    });

    if (getfeatures().addVehicleViaVIN) {
        it('3. Add vehicle via VIN, assign to a hub', () => {

            fleetPage.addVehicle().first().click({ force: true });
            fleetPage.fleetSelectVehiclePage();
            vehiclePage.addVehicleVINBtn().click();
            vehiclePage.vehicleVINTextField().type(vehicle.vin2);
            vehiclePage.addVehicleBtn().click();
            cy.avgWait();
            fleetPage.footerNextButton().click();
            fleetPage.regionDropDown().click();
            fleetPage.selectYourRegion(fleet.Region1).click();
            fleetPage.hubDropDown().click();
            fleetPage.selectYourHub(fleet.Region1Hub1).click();
            fleetPage.footerNextButton().click();
            fleetPage.fleetSelectVehiclePage();
            fleetPage.refreshVehiclePage();
            fleetPage.lastAddedVehicleChkBox().click();
            fleetPage.assignVehicle().first().click();
            fleetPage.assignVehicleToHub();
            fleetPage.assignVehicleToDefferenttHub(fleet.Region1, fleet.Region1Hub1 );
            fleetPage.assignButton().click();
            fleetPage.refreshVehiclePage();
            cy.avgWait();
            fleetPage.lastAddedVehicleChkBox().click();
            cy.avgWait();
            fleetPage.fleetSelectVehiclePage();
            fleetPage.removeVehicleButton().click({ force: true });
            fleetPage.removeConfirmVehicleButton().click({ force: true });
            fleetPage.removeVehicleConfirmMessage();

        }); 
    }
    
    it('4. filter vehicle by Regions, hubs and vehicle make', () => {
        fleetPage.selectRegionDropdown().click();
        fleetPage.selectYourRegion(fleet.Region1).click();
        fleetPage.selectHubDropdown().click({ force: true });
        fleetPage.selectYourHub(fleet.Region1Hub1).click({ force: true });
        fleetPage.checkbox().should('have.length', fleet.vehicleCountInRegion1Hub1);
        fleetPage.searchBox().click({force: true}).type('1800')
        fleetPage.checkbox().should('have.length', 1);
    });

});
