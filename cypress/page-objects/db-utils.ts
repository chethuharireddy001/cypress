import {isLubeMobile} from "../support/utils";
import {properties} from "../configuration/properties";

let dbName = properties.wrenchDb;
if (isLubeMobile()) dbName = properties.lmDb;

export class DbUtils {

    deleteUser() {
        let query = "DELETE FROM User WHERE Email LIKE 'kjankurt+kaanTest@wrench.com'";
        if (isLubeMobile()) query = "DELETE FROM User WHERE Email LIKE 'kjankurt+kaanTestLubeMobile@wrench.com'";
        cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
    }

    deleteJob(jobId) {
        const query = "DELETE FROM Job WHERE Id LIKE " + jobId + ";"
        cy.task("queryDb", {dbName, query}).then(result => {console.log(result)})
    }

    deleteOrganization() {
        const query = "DELETE FROM Organization WHERE Company LIKE 'Test Org'";
        cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
    }

    deleteSecondUser() {
        let query = "DELETE FROM User WHERE Email LIKE 'kjankurt+kaanTest2@wrench.com'";
        if (isLubeMobile()) query = "DELETE FROM User WHERE Email LIKE 'kjankurt+kaanTestLubeMobile2@wrench.com'";
        cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
    }

    deleteContact() {
        let query = "DELETE FROM User WHERE Email LIKE 'kjankurt+contactTest@wrench.com'";
        cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
    }

    deleteTech() { //TODO: pass the data from properties/techData
        let query = "DELETE FROM Provider WHERE ProfileUrl LIKE 'techBroKadir'";
        cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
    }

    deleteDiscount() {
        let query = "DELETE FROM Discount WHERE Code LIKE 'KJ%'";
        cy.task("queryDb", {dbName, query}).then((result) => {console.log(result)});
    }
}