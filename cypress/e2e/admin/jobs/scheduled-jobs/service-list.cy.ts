import 'cypress-if';
import {JobsPage} from "../../../../page-objects/admin/jobs-page";
import {BasePage} from "../../../../page-objects/admin/base-page";
import { ApiUtils } from '../../../../page-objects/api-utils';
import { properties } from '../../../../configuration/properties';
import { isLubeMobile } from '../../../../support/utils';

const basePage = new BasePage();
const jobsPage = new JobsPage();
const apiUtils = new ApiUtils();

let service = properties.wrenchService;
if (isLubeMobile()) service = properties.lmService;

describe('Service List', () => {
    //TODO (@Kadir) lubemobile configuration needed (waiting on an update)

    beforeEach(() => {
        cy.login();
        cy.deleteUserViaSQL();
        jobsPage.goToJobsScreen();
        apiUtils.createAndGoToJob();
        cy.wait('@findJobs');
        basePage.waitForPageToLoad();
        jobsPage.selectActionBtn().click();
    })

    it('1. add multiple services', () => {
        jobsPage.addServiceFlow(service);
        jobsPage.successToast();
    })

    it('2. dont add multiple services', () => {
        jobsPage.selectServiceAction().click();
        jobsPage.addServiceDropdown().click();
        jobsPage.cancelAddingServices().click();
    })

    it('3. delete service', () => {
        jobsPage.addServiceFlow(service);
        cy.minWait();
        jobsPage.deleteSecondServiceFlow();
    })

    it('4. change service type', () => {
        const serviceType = properties.serviceType;
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.selectServiceType().click();
        jobsPage.sku().contains(serviceType).click();
        jobsPage.serviceName().invoke('val').then(text => {
            expect(text).to.eq(serviceType);
        })
        jobsPage.serviceDetails().invoke('val').then(text => {
                expect(text).to.include(serviceType.split(" ")[0].toLowerCase());
        })
        jobsPage.serviceSave().click();
        jobsPage.popUpOkButton().click()
        jobsPage.successToast();
        jobsPage.serviceNameText().should('include.text', 'Battery Replacement');
    })

    it('5. change service name, notes, and verify details', () => {
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.serviceName().type(' Mod');
        jobsPage.serviceDetails().invoke('val').then(text => {
            expect(text).to.include('a');
        })
        jobsPage.serviceNotes().type('The customer stated bla bla');
        jobsPage.serviceSave().click();
        jobsPage.successToast();
        jobsPage.serviceNameText().should('include.text', 'Mod');
        jobsPage.serviceNotesText().should('include.text', 'The customer stated bla bla');
    })

    it('6. change labor hours', () => {
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.serviceLaborTab().clear().type('2');
        jobsPage.serviceSave().click();
        jobsPage.laborHoursText().should('include.text', '2');
    })

    it('7. check and uncheck provisional service checkbox', () => {
        jobsPage.addServiceFlow(service);
        jobsPage.successToast();
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.provisionalChkBox().click();
        jobsPage.serviceSave().click();
        jobsPage.popUpOkButton().click();
        jobsPage.provisionalChkBox().should('be.checked');
        jobsPage.provisionalText().should('include.text', 'provisional', {multiple: true})
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.provisionalChkBox().click();
        jobsPage.provisionalChkBox().should('not.be.checked');
    })

    it('8. check and uncheck labor only', () => {
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.serviceLaborOnly().click();
        jobsPage.serviceSave().click();
        jobsPage.totalPartsText().should('include.text', '$0.00');
        jobsPage.laborOnlyCheckbox().should('be.checked');
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.serviceLaborOnly().click();
        jobsPage.serviceSave().click();
        jobsPage.serviceLaborOnly().should('not.be.checked');
    })

    it('9. check and uncheck review required', () => {
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.reviewRequiredChkBox().eq(0).click();
        jobsPage.serviceSave().click();
        jobsPage.reviewRequiredChkBox().should('be.checked');
        jobsPage.successToast();
        cy.minWait();
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.reviewRequiredChkBox().first().click();
        jobsPage.serviceSave().click();
        jobsPage.reviewRequiredChkBox().first().should('not.be.checked');
    })

    it('10. fields and buttons', () => {
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.techTypeDropdown().select(3);
        jobsPage.coveragePayer().select(0);
        jobsPage.editServiceChkBoxes();
        jobsPage.serviceSave().click();
        jobsPage.successToast();
    })

    it('11. check and uncheck recommended', () => {
        jobsPage.addServiceFlow(service);
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.recommendedChkBox().click();
        jobsPage.serviceSave().click();
        cy.minWait();
        jobsPage.provisionalChkBox().should('be.checked');
        jobsPage.recommendedChkBox().should('be.checked');
        jobsPage.selectServiceAction().click();
        jobsPage.editService().click();
        jobsPage.provisionalChkBox().click();
        jobsPage.serviceSave().click();
        jobsPage.provisionalChkBox().should('not.be.checked');
        jobsPage.recommendedChkBox().should('not.be.checked');
    })
})