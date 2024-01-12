import { fleetUsers, lmFleetUser, lmNormalUser } from "../../../../configuration/properties";
import { LoginPage } from "../../../../page-objects/admin/login-page";
import { AppointmentsPage } from "../../../../page-objects/webapp/appointments-page";
import { FleetPage } from "../../../../page-objects/webapp/fleet-page";
import { GaragePage } from "../../../../page-objects/webapp/garage-page";
import { LmUserPage } from "../../../../page-objects/webapp/lm-user-page";
import { VehiclePage } from "../../../../page-objects/webapp/vehicle-page";
import { isLubemobile } from "../../../../support/utils";


const loginPage = new LoginPage();
const lmUserPage = new LmUserPage();
const appointmentsPage = new AppointmentsPage();
const vehiclePage = new VehiclePage();
const fleetPage = new FleetPage()
const garagePage = new GaragePage();

const lm = isLubemobile();
const Data = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;
const User = lmNormalUser



describe('webapp/normaluser/existinguser/garage.cy.ts', () => {

    beforeEach(() => {

        lmUserPage.loginNormalUserLm(User.normalUser1, User.password);
        appointmentsPage.verifyAppointmentsPage();
        lmUserPage.lmMenu();
        garagePage.navigateToGaragePage();
    });

    it('1. should add a vehicle using licence plate, then add a label', () => {

        garagePage.addVehicleButton().click();
        cy.minWait();
        vehiclePage.licenseTxtField().click().type(Data.licensePlateNumber, { delay: 100 });
        vehiclePage.stateSelection().click();
        vehiclePage.selectStateFromDropDown(Data.state);
        vehiclePage.addVehicleNxtButton().click();
        cy.minWait();
        vehiclePage.addVehicleNxtButton().click();
        cy.avgWait();
        garagePage.dropdown().first().click();
        garagePage.addLabel().click();
        garagePage.labelTxtField().type('cypress label test');
        garagePage.saveLabelButton().click();
        garagePage.vehicleText().first().should('contain', 'cypress label test');

    })
    it('2. verify cancel button functionality in delete vehicle', () => {

        garagePage.VehicleDropdown().click();
        garagePage.deleteVehicle().click();
        garagePage.warningCancel().click();
    });

    it('3. should remove vehicle from garage screen', () => {

        garagePage.VehicleDropdown().click();
        garagePage.deleteVehicle().click();
        garagePage.warningConfirm().click();
    });

    it('4. should add a vehicle using year, make and model, then add a label and delete vehicle', () => {

        garagePage.addVehicleButton().click();
        cy.minWait();
        fleetPage.yearMakeModelSelect();
        cy.minWait();
        vehiclePage.addVehicleNxtButton().click();
        cy.avgWait();
        garagePage.dropdown().first().click();
        garagePage.addLabel().click();
        garagePage.labelTxtField().type('cypress label test');
        garagePage.saveLabelButton().click();
        garagePage.vehicleText().first().should('contain', 'cypress label test');
        garagePage.deleteVehicle().click();
        garagePage.warningConfirm().click();

    })

});

