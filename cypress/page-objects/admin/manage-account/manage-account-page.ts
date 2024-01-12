import {auAddress, lmOrg, lmUser, properties, usAddress, wrenchOrg, wrenchUser} from "../../../configuration/properties";
import {isLubeMobile, getRandomNumber} from "../../../support/utils";
import {BasePage} from "../base-page";
import {VehiclePage} from "./vehicle-page";
import {LocationPage} from "./location-page";
import {PaymentPage} from "./payment-page";

const basePage = new BasePage();
const vehiclePage = new VehiclePage();
const locationPage = new LocationPage();
const paymentPage = new PaymentPage();

let auth = 'Basic dGVzdDprZXk=';
let organization = wrenchOrg;
let address = usAddress;
if (isLubeMobile()) {
    auth = 'Basic dGVzdGVtYWlsOmtleQ==';
    organization = lmOrg;
    address = auAddress;
}

export class ManageAccountPage {

    navigateToManageAccount() {
        cy.intercept('POST', 'admin/findproviders').as('authRequest');
        cy.visit('ng/account');
    }

    searchButton() {
        return cy.getDataCy('searchButton');
    }

    findUser() {
        let email = wrenchUser.email;
        if (isLubeMobile()) email = lmUser.email;
        cy.getDataCy('emailSearch').type(email);
        this.searchButton().first().click();
        cy.intercept('user/getcommunicationpreferences').as('getComPref');
        cy.wait('@getComPref');
    }

    organizationTab() {
        return cy.getDataCy('organizationSectionTab').should('be.visible');
    }

    findOrg() {
        cy.getDataCy('searchOrgName').type(properties.testOrg);
        cy.getDataCy('searchButton').last().click();
    }

    findOrg2() {
        cy.getDataCy('searchOrgId').type(organization.organizationID);
        if (!isLubeMobile()) {
            cy.getDataCy('searchRepId').click();
            cy.get('mat-option[role=option]').contains(organization.salesRepName).click();
        }
        cy.getDataCy('searchManagerId').click();
        cy.get('mat-option[role=option]').contains(organization.managerName).click();
        cy.getDataCy('searchOrgName').type(organization.organizationName);
    }

    verifyChips() {
        const firstWord = organization.organizationName.split(" ")[0];
        cy.get('.mat-chip-list-wrapper > :nth-child(1)').invoke('text')
            .then(text => {
                expect(text).to.include('Fleet');
            })
        cy.get('.mat-chip-list-wrapper > :nth-child(2)').invoke('text')
            .then(text => {
                expect(text).to.include(organization.organizationID);
            })
        cy.get('.crumb > .mat-focus-indicator').contains(firstWord);
    }

    verifyOrg() {
        cy.getDataCy('searchOrgId').should('not.have.attr', 'ng-reflect-model');
        cy.getDataCy('searchRepId').should('not.have.attr', 'ng-reflect-model');
        cy.getDataCy('searchManagerId').should('not.have.attr', 'ng-reflect-model');
        cy.getDataCy('searchOrgName').should('not.have.attr', 'ng-reflect-model');
    }

    resetButton() {
        return cy.getDataCy('resetButton');
    }

    firstUser() {
        cy.get('[role="row"]').then($row => {
            if ($row.length > 2) {
                cy.windowHandle('tbody > :nth-child(1) > .cdk-column-firstName');
            }
        })
    }

    addUser() {
        cy.getDataCy('addUser').click();
        basePage.header().should('include.text', 'Add User');
    }

    confirmButton() {
        return cy.get('button').contains('Confirm');
    }

    firstNameTab() {
        return cy.getDataCy('firstName');
    }

    lastNameTab() {
        return cy.getDataCy('lastName');
    }

    nickNameTab() {
        return cy.getDataCy('nickName');
    }

    emailTab() {
        return cy.getDataCy('email');
    }

    phoneTab() {
        return cy.getDataCy('phoneNumber').eq(1);
    }

    altPhoneTab() {
        return cy.getDataCy('altPhoneNumber');
    }

    howTheCustomerHeard() {
        cy.getDataCy('howCustomerHeard').click();
        cy.get('.mat-option-text').eq(getRandomNumber(3)).click();
    }

    selectPartnerTab() {
        cy.getDataCy('selectPartner').click();
        if (!isLubeMobile()) basePage.firstOption().click();
    }

    vipCheckBox() {
        return cy.getDataCy('vipCheck').should('be.visible');
    }

    requiredFieldsErrorMessages() {
        for (let i = 1; i < 4; i++) { // change this to 5 if phone error message ticket gets attention one day
            cy.get('[aria-live="polite"]').eq(i).should('be.visible');
        }
    }

    addOrgButton() {
        return cy.getDataCy('addOrganization').should('be.visible');
    }

    createNewAccount() {
        return cy.getDataCy('createNewAccount').should('be.visible').click();
    }

    addOrganization() {
        basePage.header().contains('Add Organization');
        cy.getDataCy('companyName').type(properties.organizationName2);
        cy.getDataCy('notes').type(properties.orgNotes);
        cy.getDataCy('fleetSizeDropdown').click();
        basePage.secondOption().click();
        cy.getDataCy('marketingStatus').click();
        basePage.firstOption().click();
        cy.getDataCy('testingPurposes').click();
    }

    userId() {
        return cy.getDataCy('userIdSearch');
    }

    userFirstName() {
        return cy.getDataCy('firstNameSearch');
    }

    userLastName() {
        return cy.getDataCy('lastNameSearch');
    }

    userEmail() {
        return cy.getDataCy('emailSearch');
    }

    userPhone() {
        return cy.getDataCy('phoneSearch');
    }

    userVIN() {
        return cy.getDataCy('vinSearch');
    }

    userLicense() {
        return cy.getDataCy('licenseSearch');
    }

    userIdChip() {
        return cy.get('.mat-chip-list-wrapper > :nth-child(3)');
    }

    userEmailChip() {
        return cy.get('.mat-chip-list-wrapper > :nth-child(1)');
    }

    phoneColumn() {
       return cy.get('.cdk-column-phone');
    }

    firstNameColumn() {
        return cy.get('.cdk-column-firstName');
    }

    lastNameColumn() {
        return cy.get('.cdk-column-lastName');
    }

    orgIdChip() {
        return cy.get('.mat-chip-list-wrapper > :nth-child(2)');
    }

    dontAddOrg() {
        cy.getDataCy('companyName').click();
        cy.getDataCy('notes').click();
        cy.getDataCy('companyNameError').should('be.visible');
        basePage.xButton();
    }

    allSearchFieldsEmpty() {
        for (let i = 1; i < 9; i++) {
            cy.get('input').should('not.have.text');
        }
    }

    deleteSecondUser() {
        let dbName = "wrenchDb";
        let query = "DELETE FROM User WHERE Email LIKE 'kjankurt+kaanTest2@wrench.com'";
        if (isLubeMobile()) {
            query = "DELETE FROM User WHERE Email LIKE 'kjankurt+kaanTestLubeMobile2@wrench.com'";
            dbName = "lmDb";
        }
        cy.log(query);
        cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
    }

    createProspectViaApi(user) {
        return cy.request({
            method: 'POST',
            url: '/user/newprospect',
            headers: {
                authorization: auth,
                type: 'application/json',
                accept: 'application/json, text/plain, */*'
            },
            body: {
                ...user
            }
        })
    }

    createUserViaApi(user, prospectId) {
        cy.request({
            method: 'POST',
            url: '/user/createuser',
            headers: {
                authorization: auth,
                type: 'application/json',
                accept: 'application/json, text/plain, */*'
            },
            body: {
                prospectId: prospectId,
                temporary: true,
                user: user,
                partner: false,
                partnerId: 0,
                payerId: 0,
            }
        }).then(response => {
            console.log(response);
        })
    }

    createEmployeeViaApi(user, prospectId, organizationId) {
        cy.wait('@authRequest').then(({request}) => {

            const bearerToken = request.headers['authorization'];
            expect(bearerToken).to.not.be.null;

            cy.request({
                method: 'POST',
                url: '/user/addsubaccount',
                headers: {
                    authorization: bearerToken,
                    type: 'application/json',
                    accept: 'application/json, text/plain, */*',
                    cognito_sso: true
                },
                body: {
                    prospectId: prospectId,
                    temporary: true,
                    user: {
                        phone: "(313) 355-2890",
                        firstName: "Kaan",
                        lastName: "TestEmp",
                        email: "kjankurt+testEmployee@wrench.com",
                        organizationId: organizationId
                    }
                }
            }).then(response => {
                console.log(response);
            })

        })
    }

    createOrgViaApi() {
        cy.wait('@authRequest').then(({request}) => {

            const bearerToken = request.headers['authorization'];
            expect(bearerToken).to.not.be.null;

            cy.request({
                method: 'POST',
                url: '/user/createorganization',
                headers: {
                    authorization: bearerToken,
                    cognito_sso: true,
                    type: 'application/json',
                    accept: 'application/json, text/plain, */*',
                },
                body: {
                    company: 'Test Org',
                    test: true,
                    type: 2
                }
            }).then(response => {
                console.log(response);
            })
        })

    }

    deleteOrgViaSQL() {
        let dbName = "wrenchDb";
        let query = "DELETE FROM Organization WHERE Company LIKE 'Test Org%'";
        if (isLubeMobile()) {
            dbName = "lmDb";
        }
        cy.log(query);
        cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
    }

    addVehicle() {
        vehiclePage.vehiclePageNavigation();
        basePage.addButton().scrollIntoView().click();
        vehiclePage.vehicleOption().click();
        vehiclePage.yearMakeModelRadioButton().click();
        vehiclePage.ymmOnlyRequiredFields();
        basePage.popUpAddButton().click();
        basePage.header().should('include.text', 'Edit');
    }

    addLocation() {
        locationPage.locationsPage().click();
        basePage.addButton().scrollIntoView().click();
        locationPage.fillAddLocationPopUp(address);
        basePage.popUpAddButton().click();
        basePage.successToast();
    }

    addPayment() {
        paymentPage.paymentsPage().click();
        paymentPage.addPaymentButton().scrollIntoView().click();
        paymentPage.addPaymentFlow();
        paymentPage.addPaymentPopUp().click();
        basePage.successToast();
    }

    getUserReady() {
        this.addVehicle();
        basePage.householdButton().click();
        this.addLocation();
        basePage.householdButton().click();
        if (!isLubeMobile()) {
            this.addPayment();
            basePage.householdButton();
        }
    }

    addPerson(user) {
        this.firstNameTab().type(user.firstName);
        this.lastNameTab().type(user.lastName);
        this.emailTab().type(user.email);
        this.phoneTab().type(user.phone);
        basePage.popUpAddButton().click();
    }

    header() {
        return cy.get('p');
    }

    newPersonPhone() {
        return cy.getDataCy('phoneNumber').first();
    }

    peopleTab() {
        return cy.getDataCy('People');
    }
}