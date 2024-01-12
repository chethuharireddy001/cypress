import {QuotesPage} from "../../../../../page-objects/admin/quotes-page";
import {JobsPage} from '../../../../../page-objects/admin/jobs-page';
import {getRandomNumber, isLubeMobile} from "../../../../../support/utils";
import {automationTestUser, invalidUser, properties} from "../../../../../configuration/properties";
import { ContactCenter } from "../../../../../page-objects/admin/contact-center-page";

const contactCenter = new ContactCenter();
const quotesPage = new QuotesPage();
const jobsPage = new JobsPage()
const jobId = properties.lmValidJobId;

let zipCode = properties.validZip;
let invalidZipCode = properties.invalidZip;
let quoteId = properties.wrenchValidQuoteId;
if (isLubeMobile()) {
    zipCode = properties.validPostal;
    invalidZipCode = properties.invalidPostal;
    quoteId = properties.lmValidQuoteId;
}

describe("Contact center flows", () => {
    beforeEach(() => {
        cy.login();
        contactCenter.navigateToContactCenterPage();
    })

    it('1. Verify valid zipcode service area verification', () => {
        contactCenter.postalCode().type(zipCode).type('{enter}');
        contactCenter.verifyServiceArea();
    })

    it('2. Verify invalid zipcode service area verification', () => {
        contactCenter.postalCode().clear().type(invalidZipCode).type('{enter}', {delay: 100});
        contactCenter.invalidServiceArea();
    })

    it('3. Search an existing user by first name', () => {
        contactCenter.firstName().type(automationTestUser.firstName, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyManageAccountPage();
    })

    it('4. Search an existing user by last name', () => {
        contactCenter.lastName().type(automationTestUser.lastName, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyManageAccountPage();
    })

    it('5. Search an existing user by user id', () => {
        contactCenter.userId().type(automationTestUser.id, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyManageAccountPage();
    })

    it('6. Search an existing user by Email Id', () => {
        contactCenter.email().type(automationTestUser.email, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyManageAccountPage();
    })

    it('7. Search an existing user by Registration Number', () => {
        contactCenter.registrationNumber().type(automationTestUser.registrationNumber, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyManageAccountPage();
    })

    it('8. Search an existing user by Phone Number', () => {
        contactCenter.phoneNumber().type(properties.lmPhoneNumber, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyManageAccountPage();
    })

    it('9. Search a new user by invalid Phone Number', () => {
        contactCenter.phoneNumber().type(properties.invalidPhoneNumber, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyEstimatePage();
    })

    it('10. Search an user by invalid first name', () => {
        contactCenter.firstName().type(invalidUser.firstName, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyEstimatePage();
    })

    it('11. Search an user by invalid last name', () => {
        contactCenter.lastName().type(invalidUser.lastName, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyEstimatePage();
    })

    it('12. Search an user by invalid user id', () => {
        contactCenter.userId().type(invalidUser.id, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyEstimatePage();
    })

    it('13. Search an user by invalid Email Id', () => {
        contactCenter.email().type(invalidUser.email, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyEstimatePage();
    })

    it('14. Search an user by invalid Registration Number', () => {
        contactCenter.registrationNumber().type(invalidUser.registrationNumber, {delay: 100}).type('{enter}', {delay: 100});
        contactCenter.verifyEstimatePage();
    })

    it('15. Search a Quote by using Quote Id', () => {
        contactCenter.quoteId().type(quoteId).type('{enter}');
        quotesPage.verifyParticularQuotesPage(quoteId);
    })

    it('16. Search a Quote by using invalid Quote Id', () => {
        contactCenter.quoteId().type(quoteId + 1).type('{enter}');
        quotesPage.invalidQuoteIdErrorMessage();
    })

    it('17. Search a Job by using Job Id', () => {
        if (isLubeMobile()) {
            contactCenter.jobId().type(jobId).type('{enter}');
            jobsPage.verifyParticularJobPage(jobId);
        }
    })

    it('18. Search a Job by using invalid Job Id', () => {
        contactCenter.navigateToContactCenterPage();
        contactCenter.jobId().type(getRandomNumber(9999).toString() + getRandomNumber(9999).toString()).type('{enter}');
        jobsPage.noJobsFound();
    })
})
