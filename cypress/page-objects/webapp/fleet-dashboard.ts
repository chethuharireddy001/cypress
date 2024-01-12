// import { delay } from "cypress/types/bluebird";



export class FleetDashboardPage {

    lmMenuButtom() {
        return cy.get('.material-icons').should('be.visible');
    }
    checkAlloptionInMenuButtom() {
        const expectedTexts = [
            'engineering Dashboard',
            'calendar_month Appointments',
            'book_online Request Service',
            'request_quote Manage Requests',
            'toys Vehicles',
            'badge Employees',
            'notifications Notification',
            'approval Approval Limit',
            'person Your Profile',
            'logout Logout'
        ];

        for (let i = 1; i <= 10; i++) {
            cy.get(`.mat-menu-content > :nth-child(${i})`)
                .invoke('text')
                .then((text) => {
                    const cleanedText = text.replace(/\s+/g, ' ').replace(/\n/g, '').trim(); // Replace multiple spaces and remove newlines
                    const expected = expectedTexts[i - 1].replace(/\s+/g, ' ').trim(); // Clean the expected text
                    expect(cleanedText).to.equal(expected);
                    cy.log(`Element ${i} text: ${cleanedText}`);
                });
        }

    }

}