export class JobsPage {

    cancelledJobs() {
        cy.get('select#status').select('Cancelled').should('be.visible');
    }

    scheduledJobs() {
        cy.get('select#status').select('Scheduled').should('be.visible');
    }

    searchJobsButton() {
        return cy.getDataCy('searchJobsButton');
    }

    goToFirstJob() {
        cy.get('[class="sorting_1"]').eq(0).should('be.visible').click();
    }

    cancelJobsButton() {
        cy.get('[ng-click="openCancelJobModal()"]').should('be.visible').click();
    }

    cancellationReason() {
        cy.get('[class="mat-radio-label-content"]').eq(0).should('be.visible').click();
    }

    cancellationConfirmButton() {
        cy.get('[class="mat-focus-indicator mat-flat-button mat-button-base mat-primary"]').should('be.visible').click();
    }

    reopenJobsButton() {
        cy.get('[class="inline-menu display-flex pull-right"]').should('be.visible').click();
    }

    reopenJobYes() {
        cy.get('[ng-click="reopenJob(job)"]').should('be.enabled').click();
    }

    scheduledValidation() {
        expect(cy.get('h1').contains('Scheduled'));
    }

    cancelJobButtonValidation() {
        cy.get('[ng-click="openCancelJobModal()"]').should('be.visible');
    }

    addAccountNotesBtn() {
        return cy.getDataCy('addAccountNotes');
    }

    closeModalBtn() {
        return cy.get('[ng-click="closeModal()"]');
    }

    saveNotesBtn() {
        return cy.get('[ng-click="saveUserNotes()"]');
    }

    goToJobsScreen() {
        cy.getDataCy('jobsScreen').click();
    }

    jobStatusScheduled() {
        cy.getDataCy('jobStatus').select(2);
    }

    notesTab() {
        return cy.get('[name=notes]').first();
    }

    assertNote() {
        cy.getDataCy('accountNotes').invoke('val').then(note => {
            expect(note).to.include(Cypress.env('note'));
        });
    }

    sameAsCustomerNameChkBox() {
        return cy.getDataCy('sameAsCustomerName');
    }

    whoApprovedTab() {
        return cy.getDataCy('whoApproved');
    }

    howWasJobApproved() {
        return cy.getDataCy('howWasApproved');
    }

    approvalPhone() {
        return cy.getDataCy('approvalPhone');
    }

    sameAsCustomerPhone() {
        return cy.getDataCy('sameAsCustomerPhone');
    }

    approvalEmail() {
        return cy.getDataCy('approvalEmail');
    }

    sameAsCustomerEmail() {
        return cy.getDataCy('sameAsCustomerEmail');
    }

    dontSendApprovalEmailChkBox() {
        return cy.getDataCy('dontSendApprovalEmail');
    }

    priceChangesBtn() {
        return cy.getDataCy('priceChangesButton');
    }

    priceHistory() {
        return cy.get('[ng-repeat="price in priceHistory"]');
    }

    addDiscountBtn() {
        return cy.getDataCy('addDiscountButton');
    }

    discountTab() {
        return cy.get('[id=promoCode]');
    }

    removeDiscountBtn() {
        return cy.get('[ng-click="removeDiscount(discount)"]');
    }

    interceptDiscountModal() {
        cy.intercept('app/utilities/views/discount_modal.html?v=3.1').as('discountModal');
    }

    selectActionBtn() {
        return cy.getDataCy('selectActionButton').should('be.visible');
    }

    rescheduleJobOption() {
        return cy.get('[ng-click="openRescheduleModal()"]');
    }

    sendEmailChkBox() {
        return cy.get('[name="sendEmail"]');
    }

    cancellationFeeChkBox() {
        return cy.get('[name="fee"]');
    }

    radioButtons() {
        return cy.get('[class="mat-radio-container"]');
    }

    reasonTextBox() {
        return cy.get('[placeholder="State your reason"]');
    }

    changeJobStatus() {
        return cy.getDataCy('changeJobStatus');
    }

    statusDropdown() {
        return cy.get('[name="status"]');
    }

    openPaymentStatus() {
        return cy.get('[ng-click="openChangePaymentStatusModal()"]');
    }

    changeJobType() {
        return cy.getDataCy('changeJobType');
    }

    jobTypeDropdown() {
        return cy.get('[name="jobType"]');
    }

    previousJob() {
        return cy.get('[name="jobId"]');
    }

    warrantyNotes() {
        return cy.get('[name="warrantynotes"]');
    }

    updateJobType() {
        return cy.get('[ng-click="updateJobType()"]');
    }

    changeJobContact() {
        return cy.getDataCy('changeJobContact');
    }

    contactDropdown() {
        return cy.get('#contact');
    }

    assertContactChange() {
        cy.minWait();
        cy.get('[id="contact"]>option:nth-child(1)')
            .invoke('text').then(someText => {
            cy.get('[ng-click="updateContact()"]').click();
            cy.minWait();
            cy.get('[ng-show="job.contactId > 0"] > :nth-child(2)')
                .invoke('text').then(text => {
                expect(text).to.include(someText);
            })
        })
    }

    changeLeadTime() {
        return cy.getDataCy('changeLeadTime');
    }

    leadTimeTab() {
        return cy.get('[step="1"]');
    }

    changePartner() {
        return cy.getDataCy('changePartner');
    }

    partnerDropdown() {
        return cy.get('[name="partner"]');
    }

    changePoClaim() {
        return cy.getDataCy('changePoClaim');
    }

    poNumberTab() {
        return cy.get('[ng-model="formData.externalId"]');
    }

    poNumber() {
        return cy.get('[ng-show="jobRequest && jobRequest.externalId"]');
    }

    claimNumberTab() {
        return cy.get('[ng-model="formData.authorization"]');
    }

    claimNumber() {
        return cy.get('[ng-show="jobRequest && jobRequest.authorization"]');
    }

    dismissBtn() {
        return cy.get('[ng-click="dismiss()"]');
    }

    changeDeductible() {
        return cy.getDataCy('changeDeductible');
    }

    selectCoveragePayer() {
        return cy.get('[name="insurer"]');
    }

    deductibleTab() {
        return cy.get('[name="deductible"]');
    }

    deductible() {
        return cy.get('[ng-show="jobRequest && jobRequest.deductible"]');
    }

    flexibleScheduling() {
        return cy.get('[class="ng-pristine ng-untouched ng-valid ng-empty"]');
    }

    flexibleSchedulingOption() {
        return cy.get('[ng-if="!job.flexible"]');
    }

    flexibleSchedulingCheckedBox() {
        return cy.get('[class="ng-pristine ng-untouched ng-valid ng-not-empty"]');
    }

    addJobNote() {
        return cy.getDataCy('addJobNote');
    }

    jobNoteTab() {
        return cy.get('.col-sm-12 > .form-control');
    }

    addedJobNotes() {
        return cy.get('[id=jobNotes]');
    }

    locationSelectAction() {
        return cy.getDataCy('selectActionLocationButton');
    }

    changeLocation() {
        return cy.getDataCy('changeLocation');
    }

    locationDropdown() {
        return cy.get('[id=location]');
    }

    changeLocationBtn() {
        return cy.get('[ng-click="changeLocation()"]');
    }

    changeLaborRate() {
        return cy.getDataCy('changeLaborRate');
    }

    laborRateTab() {
        return cy.get('[id=laborRate]');
    }

    changeLaborRateBtn() {
        return cy.get('[ng-click="changeLaborRate()"]');
    }

    changePaymentMethod() {
        return cy.getDataCy('changePaymentMethod');
    }

    paymentDropdown() {
        return cy.get('[id="payment"]');
    }

    addPurchaseOrder() {
        return cy.getDataCy('addPurchaseOrder');
    }

    orderPartsNearCurrJob() {
        cy.get('[ng-click="openPartOrderingModal($event, job, jobRequest, true)"]').click();
        cy.get('h1.ng-star-inserted').should('contain.text', 'Loading').should('be.visible');
        cy.get('[class="mat-select-value"]').should('contain.text', 'Job');
    }

    orderPartsFromHomestores() {
        cy.get('[ng-click="openPartOrderingModal($event, job, jobRequest)"]').click();
        cy.get('[class="mat-select-value"]').should('contain.text', 'Technician Homestores');
    }

    vendorName() {
        return cy.get('.form-horizontal > .table > tbody > :nth-child(1) > :nth-child(1)');
    }

    vendorNameToBeFilled() {
        return cy.get('[placeholder="Please select a vendor above"]').eq(1);
    }

    vendorFillOutBtn() {
        return cy.get('[ng-click="fillVendorFields(homeStore)"]').eq(0);
    }

    vendorNameFilled() {
        return cy.get(':nth-child(3) > .ui-select-container');
    }

    selectVendorFromList() {
        cy.get('[class="selectize-input"]').click();
        cy.get('[role="option"]').contains('Advance Auto Parts').click();
        cy.get('[placeholder="Search by name"]').eq(1).click();
        cy.get('[role="option"]').eq(0).click();
        cy.get('[placeholder="Search by address"]').eq(1).click({force: true});
        cy.get('[role="option"]').eq(0).click({force: true});
        cy.get('[class="glyphicon glyphicon-calendar"]').click();
        cy.get('[class="day current"]').click();
        cy.get('[class="hour"]').contains('5:00 PM').click();
        cy.get('[name="notes"]').eq(0).type('A location note');
        cy.get('button').contains('Save').click();
    }

    addNewLocationWithAddress() {
        cy.get('[ng-click="newInventoryLocation(provider.market)"]').click();
        cy.get('[placeholder="Search vendors"]').eq(1).click();
        cy.get('[role="option"]')
            .eq(Math.floor(Math.random() * 10) + 1).click();
        cy.get('[name="address"]')
            .type(Cypress.env('validStreet'));
        cy.get('[name="city"]')
            .type(Cypress.env('validCity'));
        cy.get('[name="zip"]')
            .type(Cypress.env('validZip'));
        cy.get('[name="state"]').select('WA');
        cy.get('[name="market"]').select('SEA');
        cy.get('[name="contact"]')
            .type('Contact Person');
        cy.get('[name="phone"]')
            .type(Cypress.env('phoneNumber'));
        cy.get('[name="commercialPhone"]')
            .type(Cypress.env('phoneNumber'));
        cy.get('[name="notes"]')
            .eq(0).type('This is a note');
        cy.get('button').contains('Save').click();
    }

    addNewLocationWithoutAddress() {
        cy.get('[ng-click="newInventoryLocation(provider.market)"]').click();
        cy.get('[placeholder="Search vendors"]').eq(1).click();
        cy.get('[role="option"]')
            .contains('Amazon').click();
        cy.get('[name="addressRequired"]')
            .click();
        cy.get('[name="market"]').select('SEA');
        cy.get('button').contains('Save').click();
    }

    addNewVendor() {
        cy.get('[ng-click="newInventoryLocation(provider.market)"]').click();
        cy.get('[ng-click="newVendor()"]').click();
        cy.get('h3')
            .should('contain.text', 'Add Vendor');
        cy.get('[name=name]')
            .eq(0).type('Test Vendor');
        cy.get('[name=descirption]')
            .type('This is a test vendor');
        cy.get('[name="dealership"]')
            .select('no');
        cy.get(':nth-child(3) > .col-sm-offset-1 > .checkbox > label')
            .should('contain.text', 'AUS').click();
    }

    selectServiceAction() {
        return cy.getDataCy('selectServiceAction0');
    }

    addServiceDropdown() {
        return cy.getDataCy('addServiceDropdown0');
    }

    addServiceTab() {
        return cy.get('[aria-autocomplete="list"]');
    }

    addServicesButton() {
        return cy.getDataCy('addServicesButton');
    }

    addServiceFlow() {
        this.selectServiceAction().click();
        this.addServiceDropdown().click();
        cy.get('h2').should('have.text', 'Add New Services');
        this.addServiceTab().type('Battery Replacement');
        this.addServicesButton().click();
        cy.get('[id="bot2-Msg1"]').click();
    }

    cancelAddingServices() {
        return cy.get('[color="cancel"]');
    }

    deleteSecondServiceFlow() {
        cy.getDataCy('selectServiceAction1').click();
        cy.getDataCy('deleteServiceDropdown1').click();
        cy.get('[id="bot2-Msg1"]').click();
        cy.get('.MsgTitle').should('include.text', 'The job was rescheduled');
    }

    editService() {
        return cy.getDataCy('editServiceDropdown0');
    }

    selectServiceType() {
        return cy.getDataCy('selectServiceType');
    }

    sku() {
        return cy.getDataCy('sku');
    }

    serviceName() {
        return cy.getDataCy('serviceModalName');
    }

    serviceDetails() {
        return cy.getDataCy('serviceDesc');
    }

    serviceSave() {
        return cy.getDataCy('serviceModalSave');
    }

    popUpOkButton() {
        return cy.get('[id="bot1-Msg1"]', {timeout: 2000});
    }

    serviceNameText() {
        return cy.getDataCy('nameText');
    }

    serviceNotes() {
        return cy.get('[placeholder="Visible to user and technician"]');
    }

    serviceNotesText() {
        return cy.getDataCy('serviceNotesText');
    }

    serviceLaborTab() {
        return cy.getDataCy('serviceModalLabor');
    }

    laborHoursText() {
        return cy.getDataCy('laborHoursText');
    }

    provisionalChkBox() {
        return cy.get('[name="provisional"]').eq(0);
    }

    provisionalText() {
        return cy.get('[ng-show="service.status == 1 && !service.recommended"]');
    }

    laborOnlyChkBox() {
        return cy.getDataCy('serviceLaborOnly');
    }

    totalPartsText() {
        return cy.getDataCy('totalPartsText');
    }

    reviewRequiredChkBox() {
        return cy.getDataCy('reviewRequiredCheckbox');
    }

    techTypeDropdown() {
        return cy.getDataCy('serviceSkillset');
    }

    coveragePayer() {
        return cy.getDataCy('servicePayerId');
    }

    totalPriceText() {
        return cy.getDataCy('totalPriceText');
    }

    editServiceChkBoxes() {
        for (let i = 0; i < 9; i++) {
            cy.get('[type="checkbox"]').eq(i).should('be.enabled');
        }
    }

    recommendedChkBox() {
        return cy.get('[name="recommended"]').eq(0);
    }

    addPartBtn() {
        return cy.getDataCy('addPartButton');
    }

    addPartModalHeader() {
        return cy.get('[ng-show="!edittingPart"]');
    }

    partNameTab() {
        return cy.get('[role="combobox"]').eq(0);
    }

    partOption() {
        return cy.get('mat-option[role=option]').eq(0);
    }

    partNumber() {
        return cy.get('[name="partNumber"]');
    }

    vendorQuoted() {
        return cy.get('[type="search"]');
    }

    vendorOption() {
        return cy.get('[role="option"]');
    }

    itemType() {
        return cy.getDataCy('itemType');
    }

    itemQuality() {
        return cy.getDataCy('itemQuality');
    }

    partCost() {
        return cy.get('[name="partCost"]');
    }

    partTotal() {
        return cy.get('[name="partTotal"]');
    }

    partQuantity() {
        return cy.get('[name="partQuantity"]');
    }

    partNotes() {
        return cy.get('[placeholder="Notes"]');
    }

    saveParts() {
        return cy.get('[type="submit"]');
    }

    vendorText() {
        return cy.get('tbody > :nth-child(2) > :nth-child(6)');
    }

    editPartBtn() {
        return cy.getDataCy('editPartButton').eq(0);
    }

    editPartModalHeader() {
        return cy.get('[ng-show="edittingPart"]');
    }

    thisFieldRequired() {
        return cy.get('[class="alert alert-danger"]');
    }

    vendorTextEdit() {
        return cy.get('tbody > :nth-child(1) > :nth-child(6)');
    }

    deletePartBtn() {
        return cy.getDataCy('deletePartButton').eq(0);
    }

    deletePartPopUpHeader() {
        return cy.get('[class="MsgTitle"]');
    }

    changeVehicleBtn() {
        return cy.getDataCy('changeVehicle');
    }

    vehicleDropdown() {
        return cy.get('[id="vehicle"]');
    }

    cancelJobBtn() {
        return cy.get('[ng-click="openCancelJobModal()"]');
    }

    cancellingReason() {
        return cy.get('.mat-radio-label-content');
    }

    cancellingStatement() {
        return cy.get('[formcontrolname="description"]');
    }

    chargeCancelFee() {
        return cy.get('.mat-checkbox-inner-container');
    }

    jobStatusDropdown() {
        return cy.getDataCy('jobStatus');
    }

    cancelReasonText() {
        return cy.get('[class="col-sm-8 form-control-static"]').eq(0);
    }

    cancelNotes() {
        return cy.get('[class="col-sm-8 form-control-static"]').eq(1);
    }

    cancelFee() {
        return cy.get('[class="col-sm-8 form-control-static"]').eq(4);
    }

    saveBtn() {
        return cy.get('[type="submit"]');
    }

    completeJobTotalText() {
        return cy.get('[ng-show="totals.total"]');
    }

    duplicateJob() {
        return '[ng-click="cloneJob(job.id)"]';
    }

    jobTotalText() {
        return cy.getDataCy('jobTotalText');
    }

    adjustBtn() {
        return cy.getDataCy('adjustButton');
    }

    fullRefundBtn() {
        return cy.getDataCy('fullRefund');
    }

    refundsText() {
        return cy.get('[ng-if="totals.refunds"]');
    }

    manualTransBtn() {
        return cy.getDataCy('manualTransaction');
    }

    balanceText() {
        return cy.get('[ng-if="!job.altPayer"] > :nth-child(2)');
    }

    applyPayment() {
        return cy.getDataCy('applyPayment');
    }

    onHoldReasonText() {
        return cy.get('label[class="control-label"]+div');
    }

    successToast() {
        return cy.get('[ng-show="success"]');
    }

    sendQuoteOption() {
        return cy.get('[ng-click="clickSendQuote()"]');
    }

    viewUser() {
        return cy.getDataCy('viewUserLabel');
    }

    quoteStatus() {
        return cy.getDataCy('quoteStatusLabel');
    }

    leadTimeInput() {
        return cy.get('#leadTimeInput');
    }
}