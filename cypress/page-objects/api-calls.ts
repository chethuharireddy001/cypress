import {addHoursToNow, isLubeMobile} from "../support/utils";
import {
    lmJobRequest,
    lmService,
    properties,
    wrenchJobRequest,
    wrenchService,
    wrenchUser
} from "../configuration/properties";

let market = "SEA";
let adminId = properties.wrenchAdminId;
let service = wrenchService;
let providerId = properties.wrenchProviderId;
let jobRequest = wrenchJobRequest;
let vehicleId = properties.vehicleId;
let user = wrenchUser;
if (isLubeMobile()) {
    market = "South Australia";
    adminId = properties.lmAdminId;
    service = lmService;
    jobRequest = lmJobRequest;
    providerId = properties.lmProviderId;
}

export class ApiCalls {

    createProspect(basicAuth, user) {
        return cy.request({
            method: 'POST',
            url: '/user/newprospect',
            headers: {
                authorization: basicAuth,
                type: 'application/json',
                accept: 'application/json, text/plain, */*'
            },
            body: {
                ...user
            }
        })
    }

    createUser(basicAuth, user, prospectId) {
        return cy.request({
            method: 'POST',
            url: '/user/createuser',
            headers: {
                authorization: basicAuth,
                type: 'application/json',
                accept: 'application/json, text/plain, */*'
            },
            body: {
                prospectId: prospectId,
                temporary: true,
                user: user,
            }
        })
    }

    findRegions(bearerToken, organizationId) {
        return cy.request({
            method: 'POST',
            url: '/user/findregions',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json',
                accept: 'application/json, text/plain, */*',
            },
            body: {
                organizationId: organizationId
            }
        })
    }

    addVehicle(bearerToken, vehicle, organizationId, regionId?, hubId?) {
        return cy.request({
            method: 'POST',
            url: '/user/addvehicle',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json',
                accept: 'application/json, text/plain, */*',
            },
            body: {
                ...vehicle,
                organizationId: organizationId,
                regionId: regionId,
                hubId: hubId
            }
        })
    }

    addLocation(bearerToken, location, organizationId, regionId, hubId) {
        return cy.request({
            method: 'POST',
            url: '/user/addlocation',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json',
                accept: 'application/json, text/plain, */*',
            },
            body: {
                ...location,
                hubId: hubId,
                organizationId: organizationId,
                regionId: regionId,
            }
        })
    }

    addPaymentMethod(bearerToken, organizationId) {
        return cy.request({
            method: 'POST',
            url: '/transaction//addpaymentmethod',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json',
                accept: 'application/json, text/plain, */*',
            },
            body: {
                organizationId: organizationId,
                paymentType: 6,
                preferred: true
            }
        })
    }

    addJobRequest(bearerToken, locationId, userId, address, organizationId, regionId) {
        return cy.request({
            method: 'POST',
            url: 'job/addjobrequest',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json',
                accept: 'application/json, text/plain, */*',
            },
            body: {

                approval: {
                    name: user.firstName + ' ' + user.lastName,
                    type: 1
                },
                approvalType: 1,
                approved: true,
                approvedBy: adminId,
                ...jobRequest,
                city: address.city,
                createDate: addHoursToNow(0),
                createdBy: adminId,
                organizationId: organizationId,
                regionId: regionId,
                services: [
                    {
                        createdBy: adminId,
                        ...service,
                    }
                ],
                locationId: locationId,
                market: market,
                preserveStatus: true,
                times: [{
                    endDate: addHoursToNow(24 + 2),
                    locationId: locationId,
                    startDate: addHoursToNow(24)
                }],

                status: 1,
                type: 3,
                userId: userId,
                vehicleId: vehicleId,
                zip: address.zip,
                override: true,
            }
        })
    }

    updateJobRequest(bearerToken, user, locationId, regionId, hubId, quoteId, organizationId, userId, vehicleId, address) {
        return cy.request({
            method: 'POST',
            url: '/job/updatejobrequest',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json;charset=UTF-8',
                accept: 'application/json, text/plain, */*',
            },
            body: {
                approval: {
                    name: user.firstName + ' ' + user.lastName,
                    type: 1
                },
                excludeSurcharge: false,
                jobRequest: {
                    approvalType: 1,
                    approved: true,
                    approvedBy: adminId,
                    jobRequestId: quoteId,
                    ...jobRequest,
                    city: address.city,
                    createDate: addHoursToNow(0),
                    createdBy: adminId,
                    hubId: hubId,
                    id: quoteId,
                    locationId: locationId,
                    market: market,
                    organizationId: organizationId,
                    regionId: regionId,
                    status: 1,
                    services: [
                        {
                            createdBy: adminId,
                            ...service,
                            jobRequestId: quoteId
                        }
                    ],
                    times: [{
                        endDate: addHoursToNow(24 + 2),
                        locationId: locationId,
                        startDate: addHoursToNow(24)
                    }],
                    vehicleId: vehicleId,

                    updatedBy: adminId,

                    userId: userId,
                },
                override: true,
                preserveStatus: false
            }
        })
    }

    assignJob(bearerToken, jobRequestId) {
        return cy.request({
            method: 'POST',
            url: '/admin/assignjob',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json',
                accept: 'application/json, text/plain, */*',
            },
            body: {
                jobRequestId: jobRequestId,
                override: true,
                providerId: providerId,
                reviewRequired: false
            }
        })
    }

    addDiscount(bearerToken, discountName) {
        return cy.request({
            method: 'POST',
            url: '/admin/newdiscount',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json',
                accept: 'application/json, text/plain, */*',
            },
            body: {
                code: discountName,
                description: "Woohoo",
                explanation: "Yeehuu",
                percentage: 10,
                status: 1,
                type: 5
            }
        })
    }

    addTech(bearerToken, tech, location) {
        return cy.request({
            method: 'POST',
            url: '/provider/createprovider',
            headers: {
                authorization: bearerToken,
                cognito_sso: true,
                type: 'application/json',
                accept: 'application/json, text/plain, */*',
            },
            body: {
                activateDate: '2023-10-27T05:00:00.000Z',
                address: location.address,
                altPhone: null,
                city: location.city,
                contractor: false,
                defaultServiceAreaId: null,
                email: tech.email,
                employeeId: tech.employeeId,
                employmentType: 2,
                firstName: tech.firstName,
                lastName: tech.lastName,
                market: market,
                password: tech.password,
                phone: tech.phone,
                profileUrl: tech.profileUrl,
                state: location.state,
                status: 1,
                type: 1,
                zip: location.zip,
                yourMechanicTech: false
            }
        })
    }
}