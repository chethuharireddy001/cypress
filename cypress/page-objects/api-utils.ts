import {
    auFullAddress,
    lmUser,
    properties,
    usFullAddress,
    userCar,
    wrenchUser, techData
} from "../configuration/properties";
import {isLubeMobile} from "../support/utils";
import {ApiCalls} from "./api-calls";

const apiCalls = new ApiCalls();

let basicAuth = properties.wrenchBasicAuth;
let user = wrenchUser;
let vehicle = userCar;
let location = usFullAddress;
let tech = techData;
if (isLubeMobile()) {
    basicAuth = properties.lmBasicAuth;
    user = lmUser;
    location = auFullAddress;
}

export class ApiUtils {

    createUser() {
        return apiCalls.createProspect(basicAuth, user).then(response => {
            console.log(response);
            const prospectId = response.body.prospectId;
            apiCalls.createUser(basicAuth, user, prospectId)
        })
    }

    createAndGoToWrenchJob() {
        return cy.wait('@findProviders').then(({request}) => {
            const bearerToken = request.headers['authorization'];
            expect(bearerToken).to.not.be.null;

            this.createUser().then(response => {
                const organizationId = response.body.organizationId;
                const userId = response.body.userId;
                console.log(response);

                apiCalls.findRegions(bearerToken, organizationId).then(response => {
                    const regionId = response.body.regions[0].id;
                    const hubId = response.body.regions[0].hubs[0].id;
                    console.log(response);

                    apiCalls.addVehicle(bearerToken, vehicle, organizationId, regionId, hubId).then(response => {
                        console.log(response);

                        apiCalls.addLocation(bearerToken, location, organizationId, regionId, hubId).then(response => {
                            const locationId = response.body.locationId;
                            console.log(response);

                            apiCalls.addPaymentMethod(bearerToken, organizationId).then(response => {
                                console.log(response);

                                apiCalls.addJobRequest(bearerToken, locationId, userId, location, organizationId, regionId).then(response => {
                                    const quoteId = response.body.jobRequest.id
                                    console.log(response);

                                    apiCalls.assignJob(bearerToken, quoteId).then(response => {
                                        console.log(response);
                                        const jobId = response.body.jobId;
                                        console.log(jobId);
                                        cy.intercept('admin/findjobs').as('findJobs');
                                        cy.visit(Cypress.env('goToJob') + jobId);
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    createAndGoToLmJob() {
        return cy.wait('@findProviders').then(({request}) => {
            const bearerToken = request.headers['authorization'];
            expect(bearerToken).to.not.be.null;

            this.createUser().then(response => {
                const organizationId = response.body.organizationId;
                const userId = response.body.userId;

                apiCalls.findRegions(bearerToken, organizationId).then(response => {
                    const regionId = response.body.regions[0].id;
                    const hubId = response.body.regions[0].hubs[0].id;
                    console.log(response);

                    apiCalls.addVehicle(bearerToken, vehicle, organizationId, regionId, hubId).then(response => {
                        const vehicleId = response.body.vehicleId;
                        console.log(response);

                        apiCalls.addLocation(bearerToken, location, organizationId, regionId, hubId).then(response => {
                            const locationId = response.body.locationId;
                            console.log(response);

                            apiCalls.addPaymentMethod(bearerToken, organizationId).then(response => {
                                console.log(response);

                                apiCalls.addJobRequest(bearerToken, locationId, userId, location, organizationId, regionId).then(response => {
                                    const quoteId = response.body.jobRequest.id
                                    console.log(response);

                                    apiCalls.updateJobRequest(bearerToken, user, locationId, regionId, hubId, quoteId, organizationId, userId, vehicleId, location)
                                        .then(response => {
                                            console.log(response);

                                            apiCalls.assignJob(bearerToken, quoteId).then(response => {
                                                console.log(response);
                                                const jobId = response.body.jobId;
                                                cy.intercept('admin/findjobs').as('findJobs');
                                                cy.visit(Cypress.env('goToJob') + jobId);
                                            })
                                        })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    createAndGoToJob() {
        if (isLubeMobile()) this.createAndGoToLmJob();
        else this.createAndGoToWrenchJob();
    }

    loadUser() {
        cy.wait('@getUser').then(({request, response}) => {
            const bearerToken = request.headers['authorization'];
            expect(bearerToken).to.not.be.null;

            const organizationId = response.body.organizationId;
            const regionId = response.body.roles[0].organizationDetails.regions.id;
            const hubId = response.body.roles[0].organizationDetails.hubs.id;
            const userId = request.body.id;

            apiCalls.addLocation(bearerToken, location, organizationId, regionId, hubId)
                .then(resp => {
                    console.log(resp)
                });
        })
    }

    addNewDiscount(discountName) {
        cy.wait('@findJobs').then(({request}) => {
            const bearerToken = request.headers['authorization'];
            expect(bearerToken).to.not.be.null;

            apiCalls.addDiscount(bearerToken, discountName);
        })
    }

    createAndGoToTech() {
        return cy.wait('@findProviders').then(({request}) => {
            const bearerToken = request.headers['authorization'];
            expect(bearerToken).to.not.be.null;

            apiCalls.addTech(bearerToken, tech, location).then(response => {
                console.log(response);
                const providerId = response.body.providerId;
                cy.visit('ng/technician/' + providerId + '/profile');
            })
        })
    }
}