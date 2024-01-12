
import { ServicesPage } from "../../../../page-objects/webapp/services-page";
import { SignUpPage } from "../../../../page-objects/webapp/signup-page";
import { fleetUsers, lmFleetUser } from "../../../../configuration/properties";
import { ZipPage } from "../../../../page-objects/webapp/zip-page";
import { FleetPage } from "../../../../page-objects/webapp/fleet-page";
import { VehiclePage } from "../../../../page-objects/webapp/vehicle-page";
import { isLubemobile } from "../../../../support/utils";
import { getfeatures } from "../../../../support/features";


const signUpPage = new SignUpPage();
const servicesPage = new ServicesPage();
const fleetPage = new FleetPage();
const zipPage = new ZipPage();
const vehiclePage = new VehiclePage
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

describe('webapp/fleet/newuser/add-vehicle.cy.ts', () => {

    beforeEach(() => {
        signUpPage.navigateToSignUpPageAndVerify();
        signUpPage.signUpDetails(fleet);
        signUpPage.clickHearAboutUs().click();
        signUpPage.selectHearAboutUs(fleet.hearAboutUs);
        signUpPage.createAccountSignUp().click();
        servicesPage.verifyBookVehiclePage();
        vehiclePage.navigateToFleetVehiclesPageAndVerify();
        fleetPage.fleetSelectVehiclePage();
        fleetPage.addVehicle().first().click({ force: true });
        fleetPage.fleetSelectVehiclePage();

    });

    it('1. Add vehicle via make, model, year enter mileage', () => {
        fleetPage.yearMakeModelSelect();
        fleetPage.footerNextButton().click();
        fleetPage.regionDropDown().click();
        fleetPage.selectYourRegion('Default Region').click();
        fleetPage.hubDropDown().click();
        fleetPage.selectYourHub('Default Hub').click();
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
    it('2. add vehicle via license', () => {
        vehiclePage.licenseTxtField().click().type(fleet.licensePlateNumber);
        vehiclePage.stateSelection().click();
        vehiclePage.selectStateFromDropDown(fleet.state);
        fleetPage.footerNextButton().click();
        cy.maxWait();
        fleetPage.footerNextButton().click();
        fleetPage.regionDropDown().click();
        fleetPage.selectYourRegion('Default Region').click();
        fleetPage.hubDropDown().click();
        fleetPage.selectYourHub('Default Hub').click();
        fleetPage.minionMileage().type(vehicle.mileage);
        fleetPage.footerNextButton().click();
        fleetPage.refreshVehiclePage();
        fleetPage.verifyVehiicle('I30');
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
            vehiclePage.addVehicleVINBtn().click();
            vehiclePage.vehicleVINTextField().type(vehicle.vin2);
            vehiclePage.addVehicleBtn().click();
            cy.avgWait();
            fleetPage.footerNextButton().click();
            fleetPage.regionDropDown().click();
            fleetPage.selectYourRegion('Default Region').click();
            fleetPage.hubDropDown().click();
            fleetPage.selectYourHub('Default Hub').click();
            fleetPage.footerNextButton().click();
            fleetPage.fleetSelectVehiclePage();
            fleetPage.refreshVehiclePage();
            fleetPage.lastAddedVehicleChkBox().click();
            fleetPage.assignVehicle().first().click();
            fleetPage.assignVehicleToHub();
            fleetPage.assignVehicleToDefferenttHub('Default Region', 'Default Hub');
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
});
