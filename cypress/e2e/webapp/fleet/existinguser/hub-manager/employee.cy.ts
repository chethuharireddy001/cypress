import { fleetUsers, lmFleetUser } from "../../../../../configuration/properties";
import { FleetPage } from "../../../../../page-objects/webapp/fleet-page";
import { LoginPage } from "../../../../../page-objects/webapp/login-page";
import { ServicesPage } from "../../../../../page-objects/webapp/services-page";
import { Utils, generateRandomEmail, isLubemobile } from "../../../../../support/utils";

/// <reference types="cypress" />
const loginPage = new LoginPage();
const servicesPage = new ServicesPage();
const fleetPage = new FleetPage();


const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/existinguser/hub-manager/employee.cy.ts', () => {

    it("1. should add and remove employee", () => {
        loginPage.loginThroughCustomCredentials(fleet.migratedFleetHubManager, fleet.migratedFleetPassword);
        servicesPage.verifyFleetDashboardPage();
        fleetPage.navigateToFleetEmployeesPageAndVerify();
        fleetPage.fleetEmployeeAddButton();
        fleetPage.fleetAddVeiclePopUp();
        fleetPage.addEmployeeModalVisible();
        fleetPage.addEmployeeFirstName().type(fleet.firstName);
        fleetPage.addEmployeeLastName().type(fleet.lastName);
        fleetPage.addEmployeePhone().type(fleet.phoneNumber);
        fleetPage.addEmployeeEmailElement().type(generateRandomEmail());
        fleetPage.assignVehicleToDefaultHub(fleet.Region1, fleet.Region1Hub1);
        fleetPage.addEmployeeBtn().click();
        cy.reload();
        fleetPage.removeLastAddedEmp();
    });
});

