export class JobPage {

    jobsPage() {
        return cy.getDataCy('Jobs');
    }

    addJob() {
        return ('[data-cy="addButton"]');
    }
}