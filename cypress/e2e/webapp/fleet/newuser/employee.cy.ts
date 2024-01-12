
import { ServicesPage } from "../../../../page-objects/webapp/services-page";
import { SignUpPage } from "../../../../page-objects/webapp/signup-page";
import { fleetUsers, lmFleetUser } from "../../../../configuration/properties";
import { ZipPage } from "../../../../page-objects/webapp/zip-page";
import { FleetPage } from "../../../../page-objects/webapp/fleet-page";
import { Utils, generateRandomEmail, isLubemobile } from "../../../../support/utils";

const signUpPage = new SignUpPage();
const servicesPage = new ServicesPage();
const fleetPage=new FleetPage();
const zipPage=new ZipPage();


const lm = isLubemobile();
const fleet = lm ? { ...fleetUsers, ...lmFleetUser } : fleetUsers;

describe('webapp/fleet/newuser/profile.cy.ts',() => {

    beforeEach(()  => {
        signUpPage.navigateToSignUpPageAndVerify();
        signUpPage.signUpDetails(fleet);
        signUpPage.clickHearAboutUs().click();
        signUpPage.selectHearAboutUs(fleet.hearAboutUs);
        signUpPage.createAccountSignUp().click();
        servicesPage.verifyBookVehiclePage();
        zipPage.navigateToAccountPage();

    });

    it("1.should add and remove employee", () => {
        
        fleetPage.navigateToFleetEmployeesPageAndVerify();
        fleetPage.fleetEmployeeAddButton();
        fleetPage.fleetAddVeiclePopUp();
        fleetPage.addEmployeeModalVisible();
        fleetPage.addEmployeeFirstName().type(fleet.firstName);
        fleetPage.addEmployeeLastName().type(fleet.lastName);
        fleetPage.addEmployeePhone().type(fleet.phoneNumber);
        fleetPage.addEmployeeEmailElement().type(generateRandomEmail());
        fleetPage.assignVehicleToDefaultHub('Default Region', 'Default Hub');
        fleetPage.addEmployeeBtn().click();
        cy.reload();
        fleetPage.removeLastAddedEmp();

    });
});
